import toast from "react-hot-toast";
import supabase from "./supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchAddressList = async (id) => {
  const { data, error } = await supabase
    .from("Address")
    .select("*")
    .eq("user_id", id);

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }
  return data;
};

export const useAddress = (id) => {
  const queryClient = useQueryClient();
  const { data: addressList = [], isLoading } = useQuery({
    queryKey: ["addressList", id],
    queryFn: () => fetchAddressList(id),
    enabled: !!id,
  });
  const addMutation = useMutation({
    mutationFn: async (item) => {
      return toast.promise(
        supabase
          .from("Address")
          .insert({ ...item, isDefault: false })
          .select()
          .eq("user_id")

          .then(({ error, data }) => {
            if (error) throw new Error(error.message);
            return data[0];
          }),
        {
          loading: "Adding...",
          success: "Address added",
          error: "Could not add Address",
        },
      );
    },

    onSuccess: (newItem) => {
      queryClient.setQueryData(["addressList", id], (old = []) => [
        ...old,
        newItem,
      ]);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (addressId) => {
      return toast.promise(
        supabase
          .from("Address")
          .delete()
          .eq("id", addressId)
          .eq("user_id", id)
          .select()
          .then(({ error, data }) => {
            if (error) throw new Error(error.message);
            return data?.[0] ?? { id: addressId };
          }),
        {
          loading: "Deleting...",
          success: "Address Deleted",
          error: "Could not Delete Address",
        },
      );
    },

    onSuccess: (deletedItem) => {
      queryClient.setQueryData(["addressList", id], (old = []) =>
        old.filter((item) => item.id !== deletedItem.id),
      );
    },
  });

  const updateDefault = useMutation({
    mutationFn: async (addressId) => {
      try {
        const { error } = await supabase
          .from("Address")
          .update({ isDefault: false })
          .eq("user_id", id);
        if (error) throw error;

        const { error: errorAddress } = await supabase
          .from("Address")
          .update({ isDefault: true })
          .eq("id", addressId)
          .eq("user_id", id);
        if (errorAddress) throw errorAddress;
      } catch (err) {
        console.error("Error setting default address:", err.message);
      }
    },
    onSuccess: (addressId) => {
      queryClient.setQueryData(["addressList", id], (old = []) =>
        old.map((item) =>
          item.id === addressId
            ? { ...item, isDefault: true }
            : { ...item, isDefault: false },
        ),
      );
    },
  });
  const updateData = useMutation({
    mutationFn: async ({
      addressId,
      city,
      phoneNumber,
      Street_Address,
      nameContact,
      type,
    }) => {
      return toast.promise(
        supabase
          .from("Address")
          .update({ city, phoneNumber, Street_Address, nameContact, type })
          .eq("id", addressId)

          .eq("user_id", id)
          .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            return data;
          }),
        {
          loading: "Editing...",
          success: "Address Edited",
          error: "Could not Edited Address",
        },
      );
    },
    onSuccess: (data, variables) => {
      const {
        addressId,
        city,
        phoneNumber,
        Street_Address,
        nameContact,
        type,
      } = variables;

      queryClient.setQueryData(["addressList", id], (old = []) =>
        old.map((item) =>
          item.id === addressId
            ? { ...item, city, phoneNumber, Street_Address, nameContact, type }
            : item,
        ),
      );
    },
  });

  return {
    addAddress: addMutation.mutate,
    deleteAddress: deleteMutation.mutate,
    editAddress: updateData.mutate,
    addressList,
    isLoading,
    handelDefault: updateDefault.mutate,
  };
};
