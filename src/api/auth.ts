import api from "@/lib/axios";
import type { User } from "@/types";

export const registerUser = async (newUser: {
  username: string;
  email: string;
  password: string; 
}): Promise<User> => { 
  const res = await api.post('/signup', newUser)
  return res.data; // returns user and access token
}

export const loginUser = async (returningUser: {
  email: string;
  password: string; 
}): Promise<User> => { 
  const res = await api.post('/login', returningUser)
  return res.data; // returns user and access token
}