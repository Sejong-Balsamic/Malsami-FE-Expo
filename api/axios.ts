import { storageKeys } from "@/constants";
import { getSecureStore } from "@/utils";
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_BASEURL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// axiosInstance.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     const token = await getSecureStore(storageKeys.ACCESS_TOKEN);
//     if (token) {
//       config.headers = config.headers ?? {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export { axiosInstance };
