import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "./supabase-client";

const fetchPaymentCards = async (id) => {
  const { data, error } = await supabase
    .from("Payment_Cards")
    .select("*")
    .eq("user_id", id);
  if (error) throw new Error(error.message);
  return data;
};

export const usePayment = (id) => {
  const queryClient = useQueryClient();
  const {
    data: CardsList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["PaymentCards", id],
    queryFn: () => fetchPaymentCards(id),
    enabled: !!id,
  });
  const addMutation = useMutation({
    mutationFn: async (item) => {
      return toast.promise(
        supabase
          .from("Payment_Cards")
          .insert(item)
          .select()
          .then(({ error, data }) => {
            if (error) throw new Error(error.message);
            console.log(data[0]);

            return data[0];
          }),
        {
          loading: "Adding...",
          success: "Cards added",
          error: "Could not add order",
        },
      );
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(["PaymentCards", id], (old = []) => [
        ...old,
        newItem,
      ]);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  return {
    addCard: addMutation.mutate,
    isLoading,
    error,
    CardsList,
  };
};
