import { axiosClient } from "@/libs/axios";
import { DatabaseUser } from "@kiwiforms/types";

// Function to fetch user from database via API
const fetchMe = async (): Promise<DatabaseUser> => {
  const response = await axiosClient.get<DatabaseUser>(`/auth/me`);

  return response.data;
};

const fetchUser = async (userId: string): Promise<DatabaseUser> => {
  const response = await axiosClient.get<DatabaseUser>(`/auth/user/${userId}`);

  return response.data;
};

export const authService = Object.freeze({
  fetchMe,
  fetchUser,
});
