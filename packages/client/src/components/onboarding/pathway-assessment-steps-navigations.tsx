import {
  PATHWAY_ASSESSMENT_STEPS,
  type PathwayAssessmentStep,
} from '@/constants/pathway-assessment-steps-data';
import {
  containerVariants,
  useAssissmentStepsNavigationAnimation,
} from '@/hooks/use-assissment-steps-navigation-animation';
import type { PathwayAssessmentOutletContext } from '@/layouts/pathway-assessment-layout';
import { getPathwayAssessmentNavigationActions } from '@/lib/get-pathway-assessment-navigation-actions';
import { toKebab } from '@/lib/to-kebab';
import { pathwayAssessmentFormSchema } from '@contracts/shared/schemas/pathway-assessment-schema';
import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import { motion } from 'motion/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AssessmentNavigationButton from '../roadmap/assessment-navigation-button';

const PathwayAssessmentStepsNavigations = ({
  step,
  disableNext,
}: {
  step: PathwayAssessmentStep;
  disableNext: boolean;
}) => {
  const form = useFormContext<PathwayAssessmentFormValues>();
  const navigate = useNavigate();

  const watchedValues = useWatch<PathwayAssessmentFormValues>();

  const { currentIndex, isSubmitting, submitPathwayAssisment } =
    useOutletContext<PathwayAssessmentOutletContext>();
  const lastIndex = PATHWAY_ASSESSMENT_STEPS.length - 1;

  const animation = useAssissmentStepsNavigationAnimation(
    currentIndex,
    lastIndex
  );
  const navigationActions = getPathwayAssessmentNavigationActions(
    step.type,
    isSubmitting
  );

  const goBack = () => {
    const prev = PATHWAY_ASSESSMENT_STEPS[currentIndex - 1];
    if (prev) navigate(`/pathway-assessment/${prev.id}`);
  };

  const goNext = async () => {
    if (step.type !== 'intro' && step.fieldName) {
      const isValid = await form.trigger(step.fieldName);
      if (!isValid) return;
    }

    const result = pathwayAssessmentFormSchema.safeParse(watchedValues);

    if (!result.success) {
      const firstErrorPath = result.error.issues[0].path[0] as string;

      navigate(`/pathway-assessment/${toKebab(firstErrorPath)}`);
      return;
    }

    if (step.type === 'cta') {
      await submitPathwayAssisment();
      return;
    }

    const next = PATHWAY_ASSESSMENT_STEPS[currentIndex + 1];
    if (next) navigate(`/pathway-assessment/${next.id}`);
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
      {navigationActions.secondary && (
        <AssessmentNavigationButton
          variant="outline"
          onClick={goBack}
          className="py-6 sm:px-12"
          disabled={isSubmitting}
          label={navigationActions.secondary.label}
          icon={navigationActions.secondary.icon}
          iconPosition="left"
        />
      )}

      <AssessmentNavigationButton
        type="button"
        onClick={goNext}
        className="py-6.5 sm:px-12"
        disabled={disableNext || isSubmitting}
        label={navigationActions.primary.label}
        icon={navigationActions.primary.icon}
        iconPosition="right"
      />
    </motion.div>
  );
};

export default PathwayAssessmentStepsNavigations;
