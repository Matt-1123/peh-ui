import api from "@/lib/axios";
import type { DietActionMeal } from "@/types";

export const fetchDietActionMeals = async (limit?:number): Promise<DietActionMeal[]> => {
  const res = await api.get('/diet/meals', {
    params: limit ? { _limit: limit } : {}
  });
  return res.data;
}

export const fetchDietActionMeal = async (mealId: string): Promise<DietActionMeal> => {
  const res = await api.get(`/diet/meals/${mealId}`);
  return res.data;
}

export const fetchUserDietActionMeals = async (userId: string): Promise<DietActionMeal[]> => {
  const res = await api.get(`diet/meals/user/${userId}`);
  return res.data;
}

export const createDietActionMeal = async (newDietActionMeal: {
  mealName: string;
  date: string;
  description?: string;
  foodsAvoided?: Array<any>;
  totalCO2Avoided?: number | null;
}): Promise<DietActionMeal> => {
  let jsDate = new Date(); // Current date and time
  let isoString = jsDate.toISOString(); 
  let mysqlDateTime = isoString.replace('T', ' ').slice(0, 19);
  
  const res = await api.post('/diet/meals', {
    ...newDietActionMeal,
    createdAt: mysqlDateTime
  }); 

  return res.data;
}

export const deleteDietActionMeal = async (mealId: string): Promise<void> => {
  await api.delete(`/diet/meals/${mealId}`);
};

export const updateDietActionMeal = async (
  mealId: string,
  updatedData: {
    mealName: string;
    date: string;
    description?: string;
    foodsAvoided?: object;
    totalCO2Avoided?: number | null;
  }
): Promise<DietActionMeal> => {  
  const res = await api.put(`/diet/meals/${mealId}`, {
    ...updatedData,
  });
  return res.data;
};