import {
  ROADMAP_SETUP_STEPS,
  type RoadmapStep,
} from '@/constants/roadmap-setup-steps';

import { useFormContext } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../ui/button';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import { cn } from '@/lib/utils';

type RoadmapSetupStepsNavigationProps = {
  step: RoadmapStep;
};

const RoadmapSetupAssessmentStepsNavigation = ({
  step,
}: RoadmapSetupStepsNavigationProps) => {
  const form = useFormContext<RoadmapSetupAssessmentFormValues>();

  const navigate = useNavigate();

  const { stepId } = useParams();

  const currentIndex = ROADMAP_SETUP_STEPS.findIndex(
    (item) => item.id === stepId
  );
  const goBack = () => {
    const prev = ROADMAP_SETUP_STEPS[currentIndex - 1];

    if (prev) {
      navigate(`/roadmap-setup-assessment/${prev.id}`);
    }
  };

  const goNext = async () => {
    if (step.fieldName) {
      const isValid = await form.trigger(step.fieldName);
      if (!isValid) return;
    }

    const next = ROADMAP_SETUP_STEPS[currentIndex + 1];

    if (next) {
      navigate(`/roadmap-setup-assessment/${next.id}`);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:items-center justify-center sm:flex-row max-w-xs  mx-auto w-full',
        currentIndex !== 0 && 'gap-3 sm:gap-8 sm:justify-between'
      )}
    >
      {currentIndex > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={goBack}
          className="py-6 sm:px-12"
        >
          <ChevronLeft />
          Back
        </Button>
      )}

      <Button type="button" onClick={goNext} className="py-6 sm:px-12">
        Continue
        <ChevronRight />
      </Button>
    </div>
  );
};

export default RoadmapSetupAssessmentStepsNavigation;
