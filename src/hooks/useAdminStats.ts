import { useQuery } from 'react-query';
import { adminApi } from '../services/api';
import { AdminStats } from '../types/User';

export const useAdminStats = (dateRange: string) => {
  return useQuery<AdminStats>(
    ['adminStats', dateRange],
    () => adminApi.getStats(dateRange).then(res => res.data),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );
};