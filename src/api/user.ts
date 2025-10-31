import api from "@/lib/axios";
import type { User } from "@/types";

export const fetchUser = async (userId: string): Promise<User> => {
  const res = await api.get(`/user/${userId}`);
  return res.data;
}

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/user/${userId}`);
};

export const updateUser = async (
  userId: string,
  updatedData: {
    username: string;
    email: string;
    password: string; 
  }
): Promise<User> => {  
  const res = await api.put(`/user/${userId}`, {
    ...updatedData,
  });
  return res.data;
};