import {
  ROADMAP_SETUP_STEPS,
  type RoadmapStep,
} from '@/constants/roadmap-setup-steps';

import type { RoadmapFormValues } from '@/constants/roadmap-setup-steps';

import { useFormContext } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../ui/button';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type RoadmapSetupStepsNavigationProps = {
  step: RoadmapStep;
};

const RoadmapSetupStepsNavigation = ({
  step,
}: RoadmapSetupStepsNavigationProps) => {
  const form = useFormContext<RoadmapFormValues>();

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
    <div className="flex items-center justify-center gap-4 mt-10">
      {currentIndex > 0 && (
        <Button type="button" variant="outline" onClick={goBack}>
          <ChevronLeft />
          Back
        </Button>
      )}

      <Button type="button" onClick={goNext}>
        Continue
        <ChevronRight />
      </Button>
    </div>
  );
};

export default RoadmapSetupStepsNavigation;
