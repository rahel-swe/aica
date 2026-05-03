import { createPathwayAssessmentProfile } from '@/services/pathway-assessment-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useQuery } from '@tanstack/react-query';
import { getPathwayAssessmentStatus } from '@/services/pathway-assessment-service';

export const usePathwayAssessmentCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPathwayAssessmentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pathway-assesment-status'],
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
