/* eslint-disable react-hooks/refs */
import {
  ROADMAP_SETUP_STEPS,
  type RoadmapStep,
} from '@/constants/roadmap-setup-steps';

import { useFormContext, useWatch } from 'react-hook-form';

import { useNavigate, useOutletContext } from 'react-router-dom';

import { Button } from '../ui/button';

import type { RoadmapSetupOutletContext } from '@/layouts/roadmap-setup-assessment-layout';
import { cn } from '@/lib/utils';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { roadmapSetupAssessmentFormSchema } from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import { toKebab } from '@/lib/to-kebab';

type RoadmapSetupStepsNavigationProps = {
  step: RoadmapStep;
};

const RoadmapSetupAssessmentStepsNavigation = ({
  step,
}: RoadmapSetupStepsNavigationProps) => {
  const form = useFormContext<RoadmapSetupAssessmentFormValues>();
  const { currentIndex, isSubmitting, submitRoadmapSetup } =
    useOutletContext<RoadmapSetupOutletContext>();
  const navigate = useNavigate();

  const lastIndex = ROADMAP_SETUP_STEPS.length - 1;
  const previousIndex = useRef(currentIndex);

  const watchedValues = useWatch<RoadmapSetupAssessmentFormValues>();

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
      navigate('/app/dashboard', {
        replace: true,
        viewTransition: true,
      });
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
    <div
      className={cn(
        'flex flex-col-reverse sm:items-center sm:flex-row max-w-xs  mx-auto w-full',
        currentIndex === 0 || currentIndex === lastIndex
          ? 'justify-center'
          : 'gap-3 sm:gap-8 sm:justify-between',
        shouldAnimate && 'transition-all duration-500 animate-in fade-in',
        shouldAnimate &&
          (isGoingBack ? 'slide-in-from-right-6' : 'slide-in-from-left-6')
      )}
    >
      {currentIndex > 0 && currentIndex < lastIndex && (
        <Button
          type="button"
          variant="outline"
          onClick={goBack}
          disabled={isSubmitting}
          className="py-6 sm:px-12"
        >
          <ChevronLeft />
          Back
        </Button>
      )}

      <Button
        type="button"
        onClick={goNext}
        disabled={isSubmitting}
        className="py-6 sm:px-12"
      >
        Continue
        <ChevronRight />
      </Button>
    </div>
  );
};

export default RoadmapSetupAssessmentStepsNavigation;
