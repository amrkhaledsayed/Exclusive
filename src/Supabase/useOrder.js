import toast from "react-hot-toast";
import supabase from "./supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchOrderList = async (id) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", id);

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }
  return data;
};

export const useOrder = (id) => {
  const queryClient = useQueryClient();

  const { data: orderList = [], isLoading } = useQuery({
    queryKey: ["orderList", id],
    queryFn: () => fetchOrderList(id),
    enabled: !!id,
  });

  const addMutation = useMutation({
    mutationFn: async (item) => {
      return toast.promise(
        supabase
          .from("orders")
          .insert(item)
          .select()
          .then(({ error, data }) => {
            if (error) throw new Error(error.message);

            return data[0];
          }),
        {
          loading: "Adding...",
          success: "Order added",
          error: "Could not add order",
        },
      );
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(["orderList", id], (old = []) => [
        ...old,
        newItem,
      ]);
    },
  });

  const updateOrderState = useMutation({
    mutationFn: async ({ orderId, state }) => {
      const { data, error } = await supabase
        .from("orders")
        .update({ state: state })
        .eq("id", orderId)
        .select();

      if (error) throw new Error(error.message);

      return data[0];
    },
    onSuccess: (updatedOrder) => {
      if (!updatedOrder) return;

      queryClient.setQueryData(
        ["orderList", updatedOrder.user_id],
        (old = []) =>
          old.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order,
          ),
      );
    },
    onError: (err) => {
      toast.error(err.message || "Could not update order");
    },
  });

  return {
    orderList,
    isLoading,
    addOrder: addMutation.mutate,
    updateOrderState: updateOrderState.mutate,
  };
};
