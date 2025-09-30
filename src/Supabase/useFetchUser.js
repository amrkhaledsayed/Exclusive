'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import supabase from './supabase-client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const useAuthQuery = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();

      return data.user;
    },
    staleTime: 1000 * 60 * 60,
  });
  const getUserAndSaveToDB = async () => {
    const { data } = await supabase.auth.getUser();

    const { data: profiles } = await supabase.from('profiles').select('id');
    if (data?.user?.id?.includes(profiles) === false) {
      const { error } = await supabase.from('profiles').upsert({
        id: data?.user?.id,
        email: data?.user?.email,
        first_name: data?.user?.user_metadata?.full_name?.split(' ')[0],
        last_name: data?.user?.user_metadata?.full_name?.split(' ')[1],
      });
      if (error) throw new Error(error.message);
    }
  };
  useEffect(() => {
    getUserAndSaveToDB();
  }, [user]);
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        queryClient.setQueryData(['currentUser'], session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [queryClient]);

  const signIn = useMutation({
    mutationFn: async ({ email, password }) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        if (error.message.toLowerCase().includes('password')) {
          toast.error('Invalid password');
          throw new Error('Invalid password ');
        } else if (error.message.toLowerCase().includes('email')) {
          toast.error('Invalid email address');
          throw new Error('Invalid email address');
        } else {
          toast.error('Invalid password or email address');
          throw new Error('Invalid password or email address');
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success(`Welcome ${data?.first_name || 'back'}`);
      navigate('/');
    },
    onError: (err) => toast.error(err.message || 'Login failed'),
  });

  const signUp = useMutation({
    mutationFn: async ({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName },
        },
      });
      if (error) throw error;

      await supabase.from('profiles').insert([
        {
          id: data.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          password,

          phoneNumber,
        },
      ]);
    },
    onSuccess: () => {
      toast.success('Account created !');
      navigate('/');
    },
    onError: (err) => toast.error(err.message || 'Sign up failed'),
  });

  const logOut = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.setQueryData({ queryKey: ['currentUser'], data: null });
      toast.success('Logged out!');
      navigate('/');
    },
    onError: (err) => toast.error(err.message || 'Logout failed'),
  });

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const updateEmail = useMutation({
    mutationFn: async ({ email, oldEmail }) => {
      const { error } = await supabase.auth.updateUser({
        email,
      });

      if (error) {
        if (
          error.message.includes(
            'A user with this email address has already been registered'
          )
        )
          toast.error(
            'A user with this email address has already been registered'
          );
        return { success: false, error: error.message };
      }
      navigate('/Account/CheckEmail', { state: { oldEmail } });
      return { success: true, email };
    },

    onSuccess: async (data) => {
      const email = data.email;

      const { error } = await supabase
        .from('profiles')
        .update({ email })
        .eq('id', user?.id);

      error && console.log(error.message);
      queryClient.invalidateQueries(['currentUser']);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update user');
    },
  });
  const updateName = useMutation({
    mutationFn: async ({ firstName, lastName, phone }) => {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      });

      if (error) {
        console.error('Error requesting email change:', error.message);
        return { success: false, error: error.message };
      }
      const { error: errorUp } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          phoneNumber: phone,
        })
        .eq('id', user?.id);
      if (errorUp) console.log(errorUp.message);
      return { success: true };
    },

    onSuccess: () => {
      toast.success('User updated successfully!');
      queryClient.invalidateQueries(['currentUser']);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update user');
    },
  });
  const dataPublic = async () => {
    if (!user?.id) return null;

    const { data: dataUser, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id);
    if (error) {
      console.error('Error fetching character:', error);
      return null;
    }
    setData(dataUser[0]);
    return data;
  };
  useEffect(() => {
    if (user?.id) {
      dataPublic();
    }
  }, [user]);
  return {
    user,
    data,
    isLoading,
    handleGoogleSignIn,
    updateEmail: updateEmail.mutate,
    updateName: updateName.mutate,
    SignIn: signIn,
    SignUp: signUp.mutate,
    logOut: logOut,
  };
};
