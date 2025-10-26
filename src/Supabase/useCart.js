import toast from 'react-hot-toast';
import supabase from './supabase-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchCartList = async (id) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', id);
  if (error) toast.error(error.message);
  return data;
};

export const useCart = (id) => {
  const queryClient = useQueryClient();
  const { data: cartList = [], isLoading } = useQuery({
    queryKey: ['cartList', id],
    queryFn: () => fetchCartList(id),
    enabled: !!id,
  });

  const addMutation = useMutation({
    mutationFn: async (item) => {
      if (cartList.find((product) => product.product_id === item.product_id)) {
        toast.error('Item already in Cart');
        return;
      }
      if (!id) {
        toast.error("Can't add to cart, please log in");
        throw new Error("Can't add to Cart, please log in");
      }
      return toast.promise(
        supabase
          .from('cart_items')
          .insert([item])
          .select()
          .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            return data[0];
          }),
        {
          loading: 'Adding...',
          success: 'Item added',
          error: 'Could not add item',
        }
      );
    },
    onSuccess: (newItem) => {
      if (!newItem) return;
      queryClient.setQueryData(['cartList', id], (old = []) => [
        ...(old || []),
        newItem,
      ]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (product_id) => {
      return toast.promise(
        supabase
          .from('cart_items')
          .delete()
          .eq('product_id', product_id)
          .eq('user_id', id)
          .then(({ error }) => {
            if (error) throw new Error(error.message);
            return product_id;
          }),
        {
          loading: 'Removing...',
          success: 'Item removed',
          error: 'Could not remove',
        }
      );
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['cartList', id], (old = []) =>
        old.filter((item) => item.product_id !== deletedId)
      );
    },
  });

  const clearData = async () => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', id);

    if (error) {
      toast.error(error.message);
    } else {
      queryClient.invalidateQueries(['cartList', id]);
    }
  };

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ product_id, quantity }) => {
      return toast.promise(
        supabase
          .from('cart_items')
          .update({ quantity })
          .eq('product_id', product_id)
          .eq('user_id', id)
          .select()
          .then(({ error, data }) => {
            if (error) throw new Error(error.message);
            return data?.[0];
          }),
        {
          loading: 'Updating...',
          success: 'Quantity updated',
          error: 'Could not update',
        }
      );
    },
    onSuccess: (updatedItem) => {
      if (!updatedItem) return;
      queryClient.setQueryData(['cartList', id], (old = []) =>
        old.map((item) =>
          item.product_id === updatedItem.product_id ? updatedItem : item
        )
      );
    },
  });

  return {
    cartList,
    isLoading,
    clearData,
    addItem: addMutation.mutate,
    deleteItem: deleteMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
  };
};
