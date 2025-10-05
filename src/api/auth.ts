import api from "@/lib/axios";
import type { User } from "@/types";

export const registerUser = async (newUser: {
  username: string;
  email: string;
  password: string; 
}): Promise<User> => { 
  const res = await api.post('/auth/signup', newUser)
  return res.data; // returns user and access token
}

export const loginUser = async (returningUser: {
  email: string;
  password: string; 
}): Promise<User> => { 
  const res = await api.post('/auth/login', returningUser)
  return res.data; // returns user and access token
}

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout')
  } catch (err: any) {
    const message = err.response?.data?.message || 'Failed to logout';
    throw new Error(message);
  }
}

export const refreshAccessToken = async () => {
  try {
    const res = await api.post('/auth/refresh')
    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.message || 'Failed to refresh access token';
    throw new Error(message);
  }
}