import axios from "axios";

export const url = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRequest = async <T>(apiRoute: string, params?: object) => {
  const response = params
    ? await api.get<T>(apiRoute, { params })
    : await api.get<T>(apiRoute);

  return response;
};

export const patchRequest = async <T>(apiRoute: string) => {
  const response = await api.patch<T>(apiRoute);
  return response;
};

export const putRequest = async <T>(apiRoute: string) => {
  const response = await api.put<T>(apiRoute);
  return response;
};
