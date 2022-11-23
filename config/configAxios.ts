import axios from "axios";
import { BASE_URL, MSG_SUCCESS } from "../utils/constants";
import jwtDecode from "jwt-decode";
import { refreshToken } from "../apis/auth";

export const publicAxios = () => {
  const instance = axios.create({ withCredentials: true, baseURL: BASE_URL });

  instance.interceptors.response.use((res) => res.data);

  return instance;
};

export const privateAxios = () => {
  const instance = axios.create({ withCredentials: true, baseURL: BASE_URL });

  instance.interceptors.response.use((res) => res.data);

  instance.interceptors.request.use(
    async (config) => {
      if (config.headers) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const decoded: any = jwtDecode(accessToken);
          if (decoded.exp * 1000 < new Date().getTime()) {
            const res = await refreshToken();
            const { message, data } = res;
            if (message === MSG_SUCCESS) {
              const { accessToken: newAccessToken } = data;
              config.headers.authorization = `Bearer ${newAccessToken}`;
            }
          } else {
            config.headers.authorization = `Bearer ${accessToken}`;
          }
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  return instance;
};
