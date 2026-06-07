import { ROADMAP_SETUP_STEPS } from '@/constants/roadmap-setup-assessment-data';
import { roadmapSetupDefaultValues } from '@/constants/roadmap-setup-assessment-data';

import { useRoadmapSetupAssessmentSubmitMutation } from '@/queries/roadmap-setup-assessment-queries';

import { roadmapSetupAssessmentFormSchema } from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const useRoadmapSetupAssessment = () => {
  const navigate = useNavigate();
  const { stepId } = useParams();

  // CREATE MUTATION
  const {
    mutateAsync: roadmapSetupMutateAsync,
    isPending: isRoadmapSetupCreating,
    isSuccess: isRoadmapSetupSucceeded,
  } = useRoadmapSetupAssessmentSubmitMutation();

  useEffect(() => {
    if (isRoadmapSetupSucceeded)
      navigate('/roadmap-setup-assessment/finish', {
        viewTransition: true,
      });
  }, [isRoadmapSetupSucceeded, navigate]);

  // FORM
  const form = useForm<RoadmapSetupAssessmentFormValues>({
    resolver: zodResolver(roadmapSetupAssessmentFormSchema),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: roadmapSetupDefaultValues,
  });

  // 📊 STEP INDEX (URL-based like Pathway)
  const currentIndex = useMemo(
    () => ROADMAP_SETUP_STEPS.findIndex((step) => step.id === stepId),
    [stepId]
  );

  // 🚀 SUBMIT (CREATE)
  const submitRoadmapSetup = form.handleSubmit(async (payload) => {
    await roadmapSetupMutateAsync(payload);
  });

  return {
    currentIndex,
    form,
    isRoadmapSetupCreating,
    submitRoadmapSetup,
  };
};
