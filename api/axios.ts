import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_BASEURL,
  withCredentials: true,
});

export { axiosInstance };
