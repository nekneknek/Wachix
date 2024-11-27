import { useQuery, useMutation, useQueryClient } from 'react-query';
import { adminApi } from '../services/api';

export const useMessages = () => {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery('messages', () => 
    adminApi.getMessages().then(res => res.data),
    {
      refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
    }
  );

  const replyToMessage = useMutation(
    ({ id, content }: { id: string; content: string }) =>
      adminApi.replyToMessage(id, content),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('messages');
      },
    }
  );

  const markAsRead = useMutation(
    (id: string) => adminApi.markMessageAsRead(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('messages');
      },
    }
  );

  return {
    messages: messagesQuery.data,
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
    replyToMessage,
    markAsRead,
  };
};