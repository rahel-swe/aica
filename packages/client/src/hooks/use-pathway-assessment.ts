import {
  PATHWAY_ASSESSMENT_STEPS,
  pathwayAssessmentDefaultValues,
} from '@/constants/pathway-assessment-steps';
import { usePathwayAssessmentMutationQuery } from '@/queries/pathway-assessment-query';
import { pathwayAssessmentFormSchema } from '@contracts/shared/schemas/pathway-assessment-schema';
import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const usePathwayAssessment = () => {
  const navigate = useNavigate();
  const { stepId } = useParams();

  const {
    mutateAsync: pathwayAssessmentMutateAsync,
    isPending: isPathwayAssessmentCreating,
    isSuccess: isPathwayAssessmentCreated,
  } = usePathwayAssessmentMutationQuery();

  const form = useForm<PathwayAssessmentFormValues>({
    resolver: zodResolver(pathwayAssessmentFormSchema),
    defaultValues:
      pathwayAssessmentDefaultValues as PathwayAssessmentFormValues,
    mode: 'onChange',
    shouldUnregister: false,
  });

  const currentIndex = useMemo(
    () => PATHWAY_ASSESSMENT_STEPS.findIndex((step) => step.id === stepId),
    [stepId]
  );

  const submitPathwayAssisment = form.handleSubmit(async (payload) => {
    await pathwayAssessmentMutateAsync(payload);
    if (isPathwayAssessmentCreated) navigate('/pathway-recommendations');
  });

  return {
    currentIndex,
    form,
    isPathwayAssessmentCreating,
    isPathwayAssessmentCreated,
    submitPathwayAssisment,
  };
};
