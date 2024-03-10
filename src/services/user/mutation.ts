import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchRequest, putRequest, url } from "../../config/api";
import { FirstTime, User } from "../../types";
import { AxiosResponse } from "axios";

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
