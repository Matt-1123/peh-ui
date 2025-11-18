export type Cleanup = {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  user_id: string;
  location: string;
  group_size: number;
  duration: number;
  env_type: string;
  total_items: number;
  total_bags: number;
  updatedAt: string;
};

export type DietActionMeal = {
  id: string;
  mealName: string;
  date: string;
  description: string;
  foodsAvoided: object;
  totalCO2Avoided: number;
}

export type User = {
  username: string;
  email: string;
  password: string;
}