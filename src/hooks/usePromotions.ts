import { useQuery, useMutation, useQueryClient } from 'react-query';
import { adminApi } from '../services/api';

export const usePromotions = () => {
  const queryClient = useQueryClient();

  const promotionsQuery = useQuery('promotions', () => 
    adminApi.getPromotions().then(res => res.data)
  );

  const createPromotion = useMutation(
    (data: any) => adminApi.createPromotion(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('promotions');
      },
    }
  );

  const updatePromotion = useMutation(
    ({ id, data }: { id: string; data: any }) => 
      adminApi.updatePromotion(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('promotions');
      },
    }
  );

  const deletePromotion = useMutation(
    (id: string) => adminApi.deletePromotion(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('promotions');
      },
    }
  );

  return {
    promotions: promotionsQuery.data,
    isLoading: promotionsQuery.isLoading,
    error: promotionsQuery.error,
    createPromotion,
    updatePromotion,
    deletePromotion,
  };
};