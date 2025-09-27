import { toast } from "react-toastify";
import supabase from "./supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchReviewsList = async (id) => {
  const { data, error } = await supabase
    .from("Reviews")
    .select("*")
    .eq("user_id", id);

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }
  return data;
};

const useReviews = (id) => {
  const queryClient = useQueryClient();
  const { data: reviewsList = [], isLoading } = useQuery({
    queryKey: ["reviewsList", id],
    queryFn: () => fetchReviewsList(id),
    enabled: !!id,
  });
  const addMutation = useMutation({
    mutationFn: async (item) => {
      return toast.promise(
        supabase
          .from("Reviews")
          .insert([item])
          .select()
          .eq("user_id", id)
          .then(({ error, data }) => {
            if (error) throw new Error(error.message);
            return data[0];
          }),
        {
          loading: "Adding...",
          success: "Reviews added",
          error: "Could not add Reviews",
        },
      );
    },

    onSuccess: (newItem) => {
      queryClient.setQueryData(["reviewsList", id], (old = []) => [
        ...old,
        newItem,
      ]);
    },
  });
  return {
    addReviews: addMutation.mutate,
    reviewsList,
    isLoading,
  };
};
export default useReviews;
