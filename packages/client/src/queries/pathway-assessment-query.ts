import {
  createPathwayAssessmentProfile,
  deletePathwayAssessmentStatus,
} from '@/services/pathway-assessment-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useQuery } from '@tanstack/react-query';
import { getPathwayAssessmentStatus } from '@/services/pathway-assessment-service';
import { profileKeys } from './profile-query';
import { recommendationsKeys } from './recommendation-query';

export const usePathwayAssessmentMutationQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPathwayAssessmentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pathway-assesment-status'],
      });

      queryClient.invalidateQueries({
        queryKey: profileKeys.me(),
      });
      queryClient.invalidateQueries({
        queryKey: recommendationsKeys.my(),
      });
    },
  });
};

export const usePathwayAssessmentStatusQuery = () => {
  return useQuery({
    queryKey: ['pathway-assessment-status'],
    refetchInterval: 60_000,
    refetchOnWindowFocus: false,
    queryFn: getPathwayAssessmentStatus,
  });
};

export const usePathwayAssessmentDeleteMutationQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePathwayAssessmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pathway-assesment-status'],
      });

      queryClient.invalidateQueries({
        queryKey: profileKeys.me(),
      });
      queryClient.invalidateQueries({
        queryKey: recommendationsKeys.my(),
      });
    },
  });
};
