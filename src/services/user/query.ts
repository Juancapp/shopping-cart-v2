import { useQuery } from "@tanstack/react-query";
import { getRequest, url } from "../../config/api";
import { User } from "../../types";

export const useUser = (name: string) => {
  return useQuery({
    queryFn: async () => await getRequest<User>(`${url}/user/${name}`),
    queryKey: ["user"],
  });
};
