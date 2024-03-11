import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Purchase } from "../../types";
import { deleteRequest, url } from "../../config/api";
import { ToastType } from "../../zustand/types";
import { useToastStore } from "../../zustand/store";
import { AxiosResponse } from "axios";

export const usePurchaseMutation = () => {
  const queryClient = useQueryClient();
  const { setToast } = useToastStore((state) => state);

  return useMutation<AxiosResponse<Purchase, any>, Error, string>({
    mutationFn: async (variables: string) => {
      const res = await deleteRequest<Purchase>(
        `${url}/purchases/${variables}`
      );
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["purchases"],
      });
      setToast(ToastType.SUCCESS, "Purchase successfully canceled!");
    },
    onError: async (error) => {
      setToast(ToastType.ERROR, error.message);
    },
  });
};
