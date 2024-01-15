import axios from "axios";
import { IApiResponse } from "../models/api/api-response.api.interface";
import { IUser } from "../models/api/user.api.interface";

const baseUrl = import.meta.env.VITE_USER_BASE_URL;

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const requestUrl = `${baseUrl}/login`;

  const { data }: { data: IApiResponse<IUser> } = await axios.post(
    requestUrl,
    { email, password },
    { withCredentials: true }
  );
  return data.body;
};

const logout = async ({ userId }: { userId: string }) => {
  const requestUrl = `${baseUrl}/logout`;

  const { data }: { data: IApiResponse<IUser> } = await axios.post(
    requestUrl,
    { userId },
    { withCredentials: true }
  );

  return data.body;
};

const verifyCookie = async () => {
  const requestUrl = `${baseUrl}/verify`;

  const { data }: { data: IApiResponse<IUser> } = await axios.get(requestUrl, {
    withCredentials: true,
  });

  return data.body;
};

const register = async ({
  username,
  email,
  password,
  reconfirmPassword,
}: {
  username: string;
  email: string;
  password: string;
  reconfirmPassword: string;
}) => {
  const requestUrl = `${baseUrl}/register`;

  const { data }: { data: IApiResponse<IUser> } = await axios.post(requestUrl, {
    username,
    email,
    password,
    reconfirmPassword,
  });

  return data.body;
};

export default { login, logout, verifyCookie, register };
