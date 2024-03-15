import { useInfiniteQuery } from "@tanstack/react-query";
import { getRequest, url } from "../../config/api";
import { Purchase } from "../../types";
import { AxiosResponse } from "axios";

export interface PurchaseResponseType {
  nextPage: number;
  totalPages: number;
  purchases: Purchase[];
}

export const usePurchases = (userId: string) => {
  return useInfiniteQuery<AxiosResponse<PurchaseResponseType>>({
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return getRequest<PurchaseResponseType>(
        `${url}/purchases/${userId}?page=${pageParam}`
      );
    },

    queryKey: [["purchases", userId]],

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextPage;
    },
  });
};
