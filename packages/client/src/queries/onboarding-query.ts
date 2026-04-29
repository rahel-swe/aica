import { createOnboardingProfile } from '@/services/assessment-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useQuery } from '@tanstack/react-query';
import { getOnboardingStatus } from '@/services/assessment-service';

export const useOnboardingCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOnboardingProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });
};

export const useOnboardingStatusQuery = () => {
  return useQuery({
    queryKey: ['onboarding-status'],

    queryFn: getOnboardingStatus,
  });
};
