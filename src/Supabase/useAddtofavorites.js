import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "./supabase-client";
import toast from "react-hot-toast";

const fetchWishlist = async (userId) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};

export const useWishlist = (userId) => {
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => fetchWishlist(userId),
    enabled: !!userId,
  });

  const addMutation = useMutation({
    mutationFn: async (item) => {
      if (wishlist.find((product) => product.product_id === item.product_id)) {
        toast.error("Item already in favorites");
        return;
      }
      if (!userId) {
        toast.error("Can't add to favorites please log in");
        throw new Error("Can't add to favorites, please log in");
      }

      return toast.promise(
        supabase
          .from("favorites")
          .insert([item])
          .select()
          .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            return data[0];
          }),
        {
          loading: "Adding to favorites...",
          success: "Item added to favorites ",
          error: "Could not add ",
        },
      );
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(["wishlist", userId], (old = []) => [
        ...old,
        newItem,
      ]);
    },
  });
  const removeMutation = useMutation({
    mutationFn: async (product_id) => {
      return toast.promise(
        supabase
          .from("favorites")
          .delete()
          .eq("product_id", product_id)
          .eq("user_id", userId)
          .then(({ error }) => {
            if (error) throw new Error(error.message);
            return product_id;
          }),
        {
          loading: "Removing...",
          success: "Item removed ",
          error: "Could not remove ",
        },
      );
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["wishlist", userId], (old = []) =>
        old.filter((i) => i.product_id !== deletedId),
      );
    },
  });

  return {
    wishlist,
    isLoading,
    addToFavorites: addMutation.mutate,
    removeFromFavorites: removeMutation.mutate,
  };
};
