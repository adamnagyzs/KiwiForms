import { axiosClient } from "@/libs/axios";
import { DatabaseUser, SignUpDto, SignUpResponse } from "@kiwiforms/types";

import supabase from "@/libs/supabase";

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

const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const authService = Object.freeze({
  fetchMe,
  fetchUser,
  signUp,
  signOut,
});
