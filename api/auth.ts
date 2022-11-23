import { privateAxios, publicAxios } from "../config/configAxios";

export type ChangeProfile = {
  email: string;
  fullName: string;
  phone: string;
};

export type Login = {
  email: string;
  password: string;
};

export const changeProfile = (body: ChangeProfile): Promise<any> =>
  privateAxios().patch("auth/change-profile", body);

export const login = (body: Login): Promise<any> =>
  publicAxios().post("auth/login", body);

export const refreshToken = (): Promise<any> =>
  publicAxios().patch("auth/refresh");
