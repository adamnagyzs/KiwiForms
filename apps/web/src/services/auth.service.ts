import { axiosClient } from "@/libs/axios";
import {
  DatabaseUser,
  SignUpDto,
  SignUpResponse,
  SignInDto,
  SignInResponse,
} from "@kiwiforms/types";

// Function to fetch user from database via API
const fetchMe = async (): Promise<DatabaseUser> => {
  const response = await axiosClient.get<DatabaseUser>(`/auth/me`);

  return response.data;
};

const fetchUser = async (userId: string): Promise<DatabaseUser> => {
  const response = await axiosClient.get<DatabaseUser>(`/auth/user/${userId}`);

  return response.data;
};

const signUp = async (dto: SignUpDto) => {
  const response = await axiosClient.post<SignUpResponse>(`/auth/signup`, dto);

  return response.data;
};

const signIn = async (dto: SignInDto) => {
  const response = await axiosClient.post<SignInResponse>(`/auth/signin`, dto);

  return response.data;
};

export const authService = Object.freeze({
  fetchMe,
  fetchUser,
  signUp,
  signIn,
});
