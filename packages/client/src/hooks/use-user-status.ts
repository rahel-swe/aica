import {
  PATHWAY_ASSESSMENT_STEPS,
  pathwayAssessmentDefaultValues,
} from '@/constants/pathway-assessment-steps';
import { authClient } from '@/lib/auth-client';
import {
  usePathwayAssessmentCreateQuery,
  usePathwayAssessmentStatusQuery,
} from '@/queries/pathway-assessment-query';
import { pathwayAssessmentFormSchema } from '@contracts/shared/schemas/pathway-assessment-schema';
import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const useUserStatus = () => {
  const { isPending: isUserDataPending, data: userData } =
    authClient.useSession();
  const {
    data: pathwayAssessmentStatusData,
    isPending: isPathwayAssessmentStatusPending,
    error: pathwayAssessmentStatusError,
  } = usePathwayAssessmentStatusQuery();

  const navigate = useNavigate();
  const { stepId } = useParams();

  const {
    mutateAsync: pathwayAssessmentMutateAsync,
    isPending: isPathwayAssessmentCreating,
  } = usePathwayAssessmentCreateQuery();

  const currentIndex = useMemo(
    () => PATHWAY_ASSESSMENT_STEPS.findIndex((step) => step.id === stepId),
    [stepId]
  );

  const form = useForm<PathwayAssessmentFormValues>({
    resolver: zodResolver(pathwayAssessmentFormSchema),
    defaultValues:
      pathwayAssessmentDefaultValues as PathwayAssessmentFormValues,
    mode: 'onChange',
    shouldUnregister: false,
  });

  const submitPathwayAssisment = form.handleSubmit(async (payload) => {
    await pathwayAssessmentMutateAsync(payload, {
      onSuccess: (result) => {
        if (result?.success) navigate('/pathway-recommendations');
      },
    });
  });

  return {
    isPending: isPathwayAssessmentStatusPending || isUserDataPending,
    isPathwayAssessmentCreating,
    isPathwayAssessmentCompleted: pathwayAssessmentStatusData?.data.completed,
    submitPathwayAssisment,
    form,
    currentIndex,
    error: pathwayAssessmentStatusError,
    userData,
  };
};
