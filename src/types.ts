export type Cleanup = {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  user: string;
  location: string;
  group_size: number;
  env_type: string;
  total_items: number;
  total_bags: number;
  updatedAt: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
}