import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from './supabase-client';
import toast from 'react-hot-toast';

const fetchWishlist = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);
  if (error) throw new Error(error.message);
  return data;
};

export const useWishlist = (userId) => {
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: () => fetchWishlist(userId),
    enabled: !!userId,
  });

  const addMutation = useMutation({
    mutationFn: async (item) => {
      if (!userId) {
        toast.error('Please log in to add to favorites');
        throw new Error('User not logged in');
      }

      const { data, error } = await supabase
        .from('favorites')
        .insert([item])
        .select();

      if (error) throw new Error(error.message);
      return data[0];
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(['wishlist', userId], (old = []) => [
        ...old,
        newItem,
      ]);
      toast.success('Added to favorites ❤️');
    },
    onError: () => {
      toast.error('Could not add to favorites');
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (product_id) => {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('product_id', product_id)
        .eq('user_id', userId);

      if (error) throw new Error(error.message);
      return product_id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['wishlist', userId], (old = []) =>
        old.filter((i) => i.product_id !== deletedId)
      );
      toast.success('Removed from favorites');
    },
    onError: () => {
      toast.error('Could not remove from favorites');
    },
  });

  return {
    wishlist,
    isLoading,
    addToFavorites: addMutation.mutate,
    removeFromFavorites: removeMutation.mutate,
  };
};
