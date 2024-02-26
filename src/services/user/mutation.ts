import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putRequest, url } from "../../config/api";
import { User } from "../../types";
import { AxiosResponse } from "axios";

export const useAddOneItemMutation = (userId: string, productId: string) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<User, any>, Error>({
    mutationKey: ["updateUser"],
    mutationFn: async () => {
      const response = await putRequest<User>(
        `${url}/user/addOne/${userId}/${productId}`
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
    mutationKey: ["updateUser"],
    mutationFn: async () => {
      const response = await putRequest<User>(
        `${url}/user/removeAll/${userId}/${productId}`
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
