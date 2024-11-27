import { useQuery as useReactQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export function useQuery<T>(
  key: string[],
  url: string,
  options?: Omit<UseQueryOptions<T, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get<T>(url);
      return data;
    },
    ...options
  });
}