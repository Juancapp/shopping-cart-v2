import { useQuery } from "@tanstack/react-query";
import { getRequest, url } from "../../config/api";
import { User } from "../../types";

export const useUser = () => {
  const name = localStorage.getItem("name");

  if (name) {
    return useQuery({
      queryFn: async () => await getRequest<User>(`${url}/user/${name}`),
      queryKey: ["user"],
      staleTime: 5 * 60 * 1000,
    });
  }
};
