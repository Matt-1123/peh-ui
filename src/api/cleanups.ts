import api from "@/lib/axios";
import type { Cleanup } from "@/types";

export const fetchCleanups = async (): Promise<Cleanup[]> => {
  const res = await api.get('/cleanups');

  return res.data;
}

export const fetchCleanup = async (cleanupId: string): Promise<Cleanup> => {
  const res = await api.get(`/cleanups/${cleanupId}`);

  return res.data;
}

export const createCleanup = async (newCleanup: {
  title: string;
  date: string;
  description?: string; 
  location: string;
  groupSize: number;
  environmentType: string;
  totalItemsCollected?: number | null;
  totalBagsCollected?: number | null;
}): Promise<Cleanup> => {
  const res = await api.post('/cleanups', {
    ...newCleanup,
    createdAt: new Date().toISOString(),
  }); 

  return res.data;
}

export const deleteCleanup = async (cleanupId: string): Promise<void> => {
  await api.delete(`/cleanups/${cleanupId}`);
};

export const updateCleanup = async (
  cleanupId: string,
  updatedData: {
    title: string;
    date: string;
    description?: string; 
    location: string;
    groupSize: number;
    environmentType: string;
    totalItemsCollected?: number | null;
    totalBagsCollected?: number | null;
  }
): Promise<Cleanup> => {
  const res = await api.put(`/cleanups/${cleanupId}`, {
    ...updatedData,
    updatedAt: new Date().toISOString(),
  });
  return res.data;
};