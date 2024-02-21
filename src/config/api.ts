import axios from "axios";

export const url = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: url,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRequest = async (apiRoute: string, params: object) => {
  const response = await api.get(apiRoute, { params });
  return response;
};
