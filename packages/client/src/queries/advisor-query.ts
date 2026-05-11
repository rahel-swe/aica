import { askAdvisor } from '@/services/advisor-service';
import type { AdvisorChatRequest } from '@contracts/shared/types/advisor-types';
import { useMutation } from '@tanstack/react-query';

export const advisorMutationKey = ['advisor', 'chat'] as const;

export const useAdvisorMutation = () => {
  return useMutation({
    mutationKey: advisorMutationKey,
    mutationFn: (payload: AdvisorChatRequest) => askAdvisor(payload),
  });
};
