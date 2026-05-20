import { motion, type Variants } from 'motion/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';

import {
  ROADMAP_SETUP_STEPS,
  type RoadmapSetupStep,
} from '@/constants/roadmap-setup-steps';
import { useRoadmapSetupStepsNavigationAnimation } from '@/hooks/use-roadmap-steps-navigation-animation';
import type { RoadmapSetupOutletContext } from '@/layouts/roadmap-setup-assessment-layout';
import { getRoadmapNavigationActions } from '@/lib/get-roadmap-navigation-actions';
import { toKebab } from '@/lib/to-kebab';
import { useGenerateRoadmapMutation } from '@/queries/roadmap-query';
import { useRoadmapSetupAssessmentStatusQuery } from '@/queries/roadmap-setup-assessment-queries';
import { roadmapSetupAssessmentFormSchema } from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import RoadmapSetupNavigationButton from './roadmap-setup-navigation-button';

type RoadmapSetupStepsNavigationProps = {
  step: RoadmapSetupStep;
};

type Direction = 'forward' | 'backward';

const containerVariants = {
  hidden: (direction: Direction) => ({
    opacity: 0,
    x: direction === 'backward' ? 16 : -16,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.28,
      ease: 'easeOut',
      when: 'beforeChildren',
    },
  },
} as Variants;

const RoadmapSetupAssessmentStepsNavigation = ({
  step,
}: RoadmapSetupStepsNavigationProps) => {
  const form = useFormContext<RoadmapSetupAssessmentFormValues>();
  const { currentIndex, isSubmitting, submitRoadmapSetup } =
    useOutletContext<RoadmapSetupOutletContext>();
  const navigate = useNavigate();

  const { mutate: generateRoadmap, isSuccess: isRoadmapGenerateSuccessed } =
    useGenerateRoadmapMutation();

  const {
    data: roadmapSetupStatusResponse,
    isPending: roadmpaSetupStatusPending,
  } = useRoadmapSetupAssessmentStatusQuery();

  const watchedValues = useWatch<RoadmapSetupAssessmentFormValues>();
  const lastIndex = ROADMAP_SETUP_STEPS.length - 1;

  const animation = useRoadmapSetupStepsNavigationAnimation(
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
      className="flex flex-col-reverse sm:items-center sm:flex-row max-w-xs  mx-auto w-full
        gap-3 sm:gap-8 sm:justify-between"
    >
      <RoadmapSetupNavigationButton
        type="button"
        variant="outline"
        onClick={handleSecondButtonNavigation}
        disabled={isSubmitting}
        className="py-6 sm:px-12"
        label={actions.secondary.label}
        icon={actions.secondary.icon}
        iconPosition="left"
      />

      <RoadmapSetupNavigationButton
        type="button"
        onClick={goNext}
        disabled={isSubmitting}
        className="py-6 sm:px-12"
        label={actions.primary.label}
        icon={actions.primary.icon}
        iconPosition="right"
      />
    </motion.div>
  );
};

export default RoadmapSetupAssessmentStepsNavigation;
