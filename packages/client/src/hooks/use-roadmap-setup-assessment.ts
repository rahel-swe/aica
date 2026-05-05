import {
  ROADMAP_SETUP_STEPS,
  roadmapSetupDefaultValues,
} from '@/constants/roadmap-setup-steps';

import {
  useRoadmapSetupAssessmentStatusQuery,
  useRoadmapSetupAssessmentSubmitMutation,
  useRoadmapSetupAssessmentUpdateMutation,
} from '@/queries/roadmap-setup-assessment-queries';

import { roadmapSetupAssessmentFormSchema } from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const useRoadmapSetup = () => {
  const navigate = useNavigate();
  const { stepId } = useParams();

  // 📡 STATUS (like Pathway create query)
  const { data } = useRoadmapSetupAssessmentStatusQuery();

  // 🚀 CREATE MUTATION
  const {
    mutateAsync: roadmapSetupMutateAsync,
    isPending: isRoadmapSetupCreating,
  } = useRoadmapSetupAssessmentSubmitMutation();

  // ✏️ UPDATE MUTATION (optional but same pattern as pro apps)
  const {
    mutateAsync: roadmapSetupUpdateMutateAsync,
    isPending: isRoadmapSetupUpdating,
  } = useRoadmapSetupAssessmentUpdateMutation();

  // 🧠 FORM
  const form = useForm<RoadmapSetupAssessmentFormValues>({
    resolver: zodResolver(roadmapSetupAssessmentFormSchema),

    defaultValues:
      roadmapSetupDefaultValues as RoadmapSetupAssessmentFormValues,

    mode: 'onChange',
    shouldUnregister: false,
  });

  // 📊 STEP INDEX (URL-based like Pathway)
  const currentIndex = useMemo(
    () => ROADMAP_SETUP_STEPS.findIndex((step) => step.id === stepId),
    [stepId]
  );

  // 📡 STEP INDEX FROM API (optional fallback)
  const apiIndex = data?.data?.stepsComleted ?? -1;

  // 🚀 SUBMIT (CREATE)
  const submitRoadmapSetup = form.handleSubmit(async (payload) => {
    await roadmapSetupMutateAsync(payload, {
      onSuccess: (result) => {
        if (result?.success) {
          navigate('/app/dashboard');
        }
      },
    });
  });

  // ✏️ UPDATE (if user already exists)
  const updateRoadmapSetup = form.handleSubmit(async (payload) => {
    await roadmapSetupUpdateMutateAsync(payload);
  });

  return {
    currentIndex,
    apiIndex,
    form,
    isRoadmapSetupCreating,
    isRoadmapSetupUpdating,
    submitRoadmapSetup,
    updateRoadmapSetup,
  };
};
