import type { RoadmapSetupStep } from '@/constants/roadmap-setup-steps';

import MultiSelectField from '../form/multi-select-field';
import SingleSelectField from '../form/single-select-field';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

type RoadmapSetupFieldPanelProps = {
  step: RoadmapSetupStep;
  currentIndex: number;
};

const RoadmapSetupFieldPanel = ({
  step,
  currentIndex,
}: RoadmapSetupFieldPanelProps) => {
  const previouseIndex = useRef(0);

  useEffect(() => {
    previouseIndex.current = currentIndex;
  }, [currentIndex]);

  if (!step.fieldName || !step.options) return null;

  return (
    <div
      key={step.id}
      className={cn(
        'space-y-4 transition-all duration-500',
        'animate-in fade-in',
        // eslint-disable-next-line react-hooks/refs
        currentIndex > previouseIndex.current
          ? 'slide-in-from-right-6'
          : 'slide-in-from-left-6'
      )}
    >
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight mb-10 mx-auto text-center">
        {step.title}
      </h1>

      {step.description ? (
        <p className="mx-auto -mt-6 mb-8 max-w-2xl text-center text-sm leading-6 text-muted-foreground md:text-base">
          {step.description}
        </p>
      ) : null}

      {step.helperText ? (
        <p className="mx-auto -mt-4 mb-8 max-w-xl text-center text-xs leading-5 text-muted-foreground/90 md:text-sm">
          {step.helperText}
        </p>
      ) : null}

      {step.type === 'multi-select' ? (
        <MultiSelectField
          name={step.fieldName}
          label={step.title}
          options={step.options}
        />
      ) : (
        <SingleSelectField
          name={step.fieldName}
          label={step.title}
          options={step.options}
        />
      )}
    </div>
  );
};

export default RoadmapSetupFieldPanel;
