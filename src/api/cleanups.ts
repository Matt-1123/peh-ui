import api from "@/lib/axios";
import type { Cleanup } from "@/types";

export const fetchCleanups = async (limit?:number): Promise<Cleanup[]> => {
  const res = await api.get('/cleanups', {
    params: limit ? { _limit: limit } : {}
  });
  return res.data;
}

export const fetchCleanup = async (cleanupId: string): Promise<Cleanup> => {
  const res = await api.get(`/cleanups/${cleanupId}`);
  console.log('fetch cleanup ', cleanupId, JSON.stringify(res.data))
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
  let jsDate = new Date(); // Current date and time
  let isoString = jsDate.toISOString(); 
  let mysqlDateTime = isoString.replace('T', ' ').slice(0, 19);
  
  const res = await api.post('/cleanups', {
    ...newCleanup,
    createdAt: mysqlDateTime
  }); 

  console.log('cleanup: ', res.data)
  console.log('post request to /cleanups complete')

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
  });
  return res.data;
};