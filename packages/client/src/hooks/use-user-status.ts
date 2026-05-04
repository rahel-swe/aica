import { authClient } from '@/lib/auth-client';
import { usePathwayAssessmentStatusQuery } from '@/queries/pathway-assessment-query';

export const useUserStatus = () => {
  const { isPending: isUserDataPending, data: userData } =
    authClient.useSession();

  const {
    data: pathwayAssessmentStatusData,
    isPending: isPathwayAssessmentStatusPending,
    error: pathwayAssessmentStatusError,
  } = usePathwayAssessmentStatusQuery();

  return {
    isPending: isPathwayAssessmentStatusPending || isUserDataPending,
    isPathwayAssessmentCompleted: pathwayAssessmentStatusData?.data.completed,
    error: pathwayAssessmentStatusError,
    userData,
  };
};
