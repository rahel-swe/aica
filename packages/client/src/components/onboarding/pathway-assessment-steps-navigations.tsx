/* eslint-disable react-hooks/refs */
import {
  PATHWAY_ASSESSMENT_STEPS,
  type PathwayAssessmentStep,
} from '@/constants/pathway-assessment-steps';
import type { PathwayAssessmentOutletContext } from '@/layouts/pathway-assessment-layout';
import { toKebab } from '@/lib/to-kebab';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Pencil, Send } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '../ui/button';
import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import { pathwayAssessmentFormSchema } from '@contracts/shared/schemas/pathway-assessment-schema';
import { useEffect, useRef, useState } from 'react';

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
  const previousIndex = useRef(currentIndex);

  const [shouldAnimate, setShouldAnimate] = useState(false);

  // edge + near-edge steps
  const isEdgeZone =
    currentIndex === 0 ||
    (currentIndex === 1 && previousIndex.current === 0) ||
    currentIndex === lastIndex ||
    (currentIndex === lastIndex - 1 && previousIndex.current === lastIndex);

  const isGoingBack =
    previousIndex.current !== null && previousIndex.current > currentIndex;

  useEffect(() => {
    if (isEdgeZone) {
      // reset animation so it can replay
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldAnimate(false);

      requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
    }

    previousIndex.current = currentIndex;
  }, [currentIndex, isEdgeZone]);

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
    <div
      className={cn(
        'flex flex-col-reverse sm:items-center justify-center sm:flex-row max-w-xs  mx-auto w-full',
        currentIndex !== 0 && 'gap-3 sm:gap-8 sm:justify-between',
        shouldAnimate && 'transition-all duration-500 animate-in fade-in',
        shouldAnimate &&
          (isGoingBack ? 'slide-in-from-right-6' : 'slide-in-from-left-6')
      )}
    >
      {!(currentIndex === 0) && (
        <Button
          variant="outline"
          onClick={goBack}
          className="py-6 sm:px-12"
          disabled={isSubmitting}
        >
          {step.type !== 'cta' ? <ChevronLeft /> : <Pencil />}
          {step.type === 'cta' ? 'Edit' : 'Back'}
        </Button>
      )}

      <Button
        type="button"
        onClick={goNext}
        className="py-6.5 sm:px-12"
        disabled={disableNext || isSubmitting}
      >
        {isSubmitting
          ? 'Saving...'
          : step.type === 'cta'
            ? 'Submit'
            : 'Continue'}
        {step.type === 'cta' ? <Send /> : <ChevronRight />}
      </Button>
    </div>
  );
};

export default PathwayAssessmentStepsNavigations;
