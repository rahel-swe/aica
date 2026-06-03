import {
  askAdvisor,
  deleteConversationById,
  getAdvisorHistory,
} from '@/services/advisor-service';
import type { AdvisorChatRequest } from '@contracts/shared/types/advisor-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const advisorKeys = {
  all: ['advisor'] as const,
  chat: () => [...advisorKeys.all, 'chat'] as const,
  history: () => [...advisorKeys.all, 'history'] as const,
};

export const useAdvisorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: advisorKeys.chat(),
    mutationFn: (payload: AdvisorChatRequest) => askAdvisor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: advisorKeys.history() });
    },
  });
};

export const useAdvisorHistoryQuery = () => {
  return useQuery({
    queryKey: advisorKeys.history(),
    queryFn: getAdvisorHistory,
  });
};

export const useDeleteConversationByIdQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: advisorKeys.history(),
    mutationFn: deleteConversationById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: advisorKeys.history() });
    },
  });
};
