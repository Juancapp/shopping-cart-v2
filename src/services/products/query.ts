import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRequest, url } from "../../config/api";
import { Product } from "../../types";

export const useProductsQuery = (params: object) => {
  return useQuery({
    queryFn: () => getRequest(`${url}/products`, params),
    queryKey: ["products", { params }],
    placeholderData: keepPreviousData,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryFn: async () => await getRequest<Product>(`${url}/products/${id}`),
    queryKey: ["products", id],
  });
};
