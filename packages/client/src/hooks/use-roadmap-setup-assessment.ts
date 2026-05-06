import { ROADMAP_SETUP_STEPS } from '@/constants/roadmap-setup-steps';
import { roadmapSetupDefaultValues } from '@/constants/roadmap-setup-steps';

import { useRoadmapSetupAssessmentSubmitMutation } from '@/queries/roadmap-setup-assessment-queries';

import { roadmapSetupAssessmentFormSchema } from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const useRoadmapSetupAssessment = () => {
  const navigate = useNavigate();
  const { stepId } = useParams();

  // CREATE MUTATION
  const {
    mutateAsync: roadmapSetupMutateAsync,
    isPending: isRoadmapSetupCreating,
  } = useRoadmapSetupAssessmentSubmitMutation();

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
    await roadmapSetupMutateAsync(payload, {
      onSuccess: (result) => {
        if (result?.success) {
          navigate('/roadmap-setup-assessment/finish');
        }
      },
    });
  });

  return {
    currentIndex,
    form,
    isRoadmapSetupCreating,
    submitRoadmapSetup,
  };
};
