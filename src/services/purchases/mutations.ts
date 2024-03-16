import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Purchase, Status } from "../../types";

import { deleteRequest, patchRequest, url } from "../../config/api";
import { ToastType } from "../../zustand/types";
import { useToastStore } from "../../zustand/store";
import { AxiosResponse } from "axios";

export const usePurchaseMutation = (userId: string | null) => {
  const queryClient = useQueryClient();
  const { setToast } = useToastStore((state) => state);

  return useMutation<
    AxiosResponse<Purchase, any>,
    Error,
    { id: string; reqType: "delete" | "put" }
  >({
    mutationFn: async (variables: {
      id: string;
      reqType: "delete" | "put";
    }) => {
      const res =
        variables.reqType === "delete"
          ? await deleteRequest<Purchase>(`${url}/purchases/${variables.id}`)
          : await patchRequest<Purchase>(`${url}/purchases/${variables.id}`, {
              status: Status.SUCCESS,
            });
      return res;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [["purchases", userId]],
      });

      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setToast(
        ToastType.SUCCESS,
        `Purchase successfully ${
          variables.reqType === "delete" ? "canceled!" : "forced"
        }`
      );
    },
    onError: async (error) => {
      setToast(ToastType.ERROR, error.message);
    },
  });
};
