import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VITE_API_URL,
});

Axios.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
