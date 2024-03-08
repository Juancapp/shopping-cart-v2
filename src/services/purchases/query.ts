import { useQuery } from "@tanstack/react-query";
import { getRequest, url } from "../../config/api";
import { Purchase } from "../../types";

export const usePurchases = (userId: string) => {
  return useQuery({
    queryFn: () => getRequest<Purchase[]>(`${url}/purchases/${userId}`),
    queryKey: ["purchases"],
    staleTime: 0,
  });
};
