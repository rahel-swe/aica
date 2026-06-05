import { motion } from 'motion/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';

import {
  ROADMAP_SETUP_STEPS,
  type RoadmapSetupStep,
} from '@/constants/roadmap-setup-steps';
import {
  containerVariants,
  useAssissmentStepsNavigationAnimation,
} from '@/hooks/use-assissment-steps-navigation-animation';
import type { RoadmapSetupOutletContext } from '@/layouts/roadmap-setup-assessment-layout';
import { getRoadmapNavigationActions } from '@/lib/get-roadmap-navigation-actions';
import { toKebab } from '@/lib/to-kebab';
import { useGenerateRoadmapMutation } from '@/queries/roadmap-query';
import { useRoadmapSetupAssessmentStatusQuery } from '@/queries/roadmap-setup-assessment-queries';
import { roadmapSetupAssessmentFormSchema } from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import AssessmentNavigationButton from './assessment-navigation-button';

type RoadmapSetupStepsNavigationProps = {
  step: RoadmapSetupStep;
};

const RoadmapSetupAssessmentStepsNavigation = ({
  step,
}: RoadmapSetupStepsNavigationProps) => {
  const form = useFormContext<RoadmapSetupAssessmentFormValues>();
  const { currentIndex, isSubmitting, submitRoadmapSetup } =
    useOutletContext<RoadmapSetupOutletContext>();
  const navigate = useNavigate();

  const {
    mutate: generateRoadmap,
    isSuccess: isRoadmapGenerateSuccessed,
    isPending: isRoadmapGenerating,
  } = useGenerateRoadmapMutation();
  const {
    data: roadmapSetupStatusResponse,
    isPending: roadmpaSetupStatusPending,
  } = useRoadmapSetupAssessmentStatusQuery();

  const watchedValues = useWatch<RoadmapSetupAssessmentFormValues>();

  const lastIndex = ROADMAP_SETUP_STEPS.length - 1;

  const animation = useAssissmentStepsNavigationAnimation(
    currentIndex,
    lastIndex
  );

  const actions = getRoadmapNavigationActions(step.id);

  const handleSecondButtonNavigation = () => {
    if (step.id === 'welcome') {
      navigate('/app/dashboard');
      return;
    }

    const prev = ROADMAP_SETUP_STEPS[currentIndex - 1];
    if (prev) navigate(`/roadmap-setup-assessment/${prev.id}`);
  };

  const goNext = async () => {
    if (step.fieldName) {
      const isValid = await form.trigger(step.fieldName);
      if (!isValid) return;
    }

    const result = roadmapSetupAssessmentFormSchema.safeParse(watchedValues);

    if (!result.success) {
      const firstErrorPath = result.error.issues[0].path[0] as string;
      navigate(`/roadmap-setup-assessment/${toKebab(firstErrorPath)}`);
      return;
    }

    if (currentIndex === lastIndex - 1) {
      submitRoadmapSetup();
      return;
    }

    const next = ROADMAP_SETUP_STEPS[currentIndex + 1];

    if (currentIndex === lastIndex) {
      if (roadmpaSetupStatusPending) return;
      generateRoadmap({
        pathwayId: roadmapSetupStatusResponse!.data.pickedPathwayId,
      });

      if (isRoadmapGenerateSuccessed) {
        navigate('/app/roadmap', {
          replace: true,
          viewTransition: true,
        });
      }

      return;
    }

    if (next) {
      navigate(`/roadmap-setup-assessment/${next.id}`, {
        viewTransition: true,
        replace: true,
      });
    }
  };

  return (
    <motion.div
      key={animation.replayKey}
      custom={animation.direction}
      variants={containerVariants}
      initial={animation.shouldAnimate ? 'hidden' : false}
      animate="visible"
      className="flex flex-col-reverse sm:items-center sm:flex-row max-w-xs sm:max-w-full mx-auto w-full
        gap-3 sm:gap-10 sm:justify-center"
    >
      <AssessmentNavigationButton
        type="button"
        variant="outline"
        onClick={handleSecondButtonNavigation}
        disabled={isSubmitting || isRoadmapGenerating}
        className="py-6 sm:px-12"
        label={actions.secondary.label}
        icon={actions.secondary.icon}
        iconPosition="left"
      />

      <AssessmentNavigationButton
        type="button"
        onClick={goNext}
        disabled={isSubmitting || isRoadmapGenerating}
        className="py-6 sm:px-12"
        label={actions.primary.label}
        icon={actions.primary.icon}
        iconPosition="right"
      />
    </motion.div>
  );
};

export default RoadmapSetupAssessmentStepsNavigation;
