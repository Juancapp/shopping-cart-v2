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

export const postRequest = async <T>(apiRoute: string, body: T) => {
  try {
    const response = await api.post<T>(apiRoute, body);
    return response;
  } catch (error) {
    throw error;
  }
};

export const patchRequest = async <T>(apiRoute: string, body: T) => {
  const response = await api.patch<T>(apiRoute, body);
  return response;
};

export const putRequest = async <T>(apiRoute: string, body: object) => {
  const response = await api.put<T>(apiRoute, body);
  return response;
};

export const deleteRequest = async <T>(apiRoute: string) => {
  const response = await api.delete<T>(apiRoute);
  return response;
};
