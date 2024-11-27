import { useMutation as useReactMutation, UseMutationOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export function useMutation<TData = unknown, TVariables = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, AxiosError, TVariables>, 'mutationFn'>
) {
  return useReactMutation({
    mutationFn: async (variables: TVariables) => {
      const { data } = await axios.post<TData>(url, variables);
      return data;
    },
    ...options
  });
}