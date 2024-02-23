import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRequest, url } from "../../config/api";

export const useProductsQuery = (params: object) => {
  return useQuery({
    queryFn: () => getRequest(`${url}/products`, params),
    queryKey: ["products", { params }],
    placeholderData: keepPreviousData,
  });
};
