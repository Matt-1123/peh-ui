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