import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchRequest, putRequest, url } from "../../config/api";
import { FirstTime, PaymentMethodType, User } from "../../types";
import { AxiosError, AxiosResponse } from "axios";
import { useToastStore } from "../../zustand/store";
import { ToastType } from "../../zustand/types";

export const useAddOneItemMutation = (userId: string, productId: string) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<User, any>, Error>({
    mutationKey: ["addOneItem", userId, productId],
    mutationFn: async () => {
      const response = await putRequest<User>(
        `${url}/user/addOne/${userId}/${productId}`,
        {}
      );
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { _id: string; body: { firstTime: FirstTime } }
  >({
    mutationKey: ["editItem"],
    mutationFn: async (variables) => {
      await patchRequest<{ firstTime: FirstTime }>(
        `${url}/user/${variables._id}`,
        variables.body
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useAddPurchaseMethodMutation = () => {
  const queryClient = useQueryClient();
  const { setToast } = useToastStore((state) => state);

  return useMutation<
    AxiosResponse<User, any>,
    Error,
    { _id: string; body: PaymentMethodType }
  >({
    mutationKey: ["addPurchase"],
    mutationFn: async (variables) => {
      try {
        const res = await putRequest<User>(
          `${url}/user/payment/${variables._id}`,
          variables.body
        );
        return res;
      } catch (error) {
        throw new Error("Failed to add payment method");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setToast(ToastType.SUCCESS, "Payment method added successfully");
    },
    onError: async (error) => {
      setToast(ToastType.ERROR, error.message);
    },
  });
};

export const useSetToDefaultPaymentMethodMutation = () => {
  const queryClient = useQueryClient();
  const { setToast } = useToastStore((state) => state);

  return useMutation<
    AxiosResponse<User, any>,
    AxiosError<{ message?: string }>,
    { _id: string; body: { number: string; expiryDate: string } }
  >({
    mutationKey: ["setToDefault"],
    mutationFn: async (variables) => {
      const res = await putRequest<User>(
        `${url}/user/paymentToDefault/${variables._id}`,
        variables.body
      );
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setToast(ToastType.SUCCESS, "Payment method set to default");
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setToast(ToastType.ERROR, error.response?.data?.message!);
    },
  });
};

export const useDeletePaymentMethodMutation = () => {
  const queryClient = useQueryClient();
  const { setToast } = useToastStore((state) => state);

  return useMutation<
    AxiosResponse<User, any>,
    Error,
    { _id: string; body: { number: string } }
  >({
    mutationKey: ["setToDefault"],
    mutationFn: async (variables) => {
      try {
        const res = await putRequest<User>(
          `${url}/user/removePaymentMethod/${variables._id}`,
          variables.body
        );
        return res;
      } catch (error) {
        throw new Error("Failed to add payment method");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setToast(ToastType.SUCCESS, "Payment method deleted");
    },
    onError: async (error) => {
      setToast(ToastType.ERROR, error.message);
    },
  });
};

export const useRemoveOneItemMutation = (userId: string, productId: string) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<User, any>, Error>({
    mutationKey: ["removeOneItem", userId, productId],
    mutationFn: async () => {
      const response = await putRequest<User>(
        `${url}/user/removeOne/${userId}/${productId}`,
        {}
      );
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useRemoveAllItemsMutation = (
  userId: string,
  productId: string
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<User, any>, Error>({
    mutationKey: ["removeAllItems", userId, productId],
    mutationFn: async () => {
      const response = await putRequest<User>(
        `${url}/user/removeAll/${userId}/${productId}`,
        {}
      );
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useEditItemsMutation = (
  userId: string,
  productId: string,
  quantity: number
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<User, any>, Error>({
    mutationKey: ["editItem", userId, productId, quantity],
    mutationFn: async () => {
      const response = await putRequest<User>(
        `${url}/user/edit/${userId}/${productId}/${quantity}`,
        {}
      );
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useBuyItemMutation = (
  userId: string,
  productId: string,
  quantity: number
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<User, any>, Error>({
    mutationKey: ["buyItem", userId, productId, quantity],
    mutationFn: async () => {
      const response = await putRequest<User>(
        `${url}/user/buyItem/${userId}/${productId}/${quantity}`,
        {}
      );
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
