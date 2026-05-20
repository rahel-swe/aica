import type { RoadmapSetupStep } from '@/constants/roadmap-setup-steps';

import MultiSelectField from '../form/multi-select-field';
import SingleSelectField from '../form/single-select-field';

import { cn } from '@/lib/utils';
import { MessageCircleWarning } from 'lucide-react';
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
      {step.helperText && (
        <div className="mx-auto flex justify-center gap-1.5">
          <MessageCircleWarning className="size-5 md:size-5.5" />
          <p className="text-muted-foreground md:text-sm text-center text-xs self-end">
            {step.helperText}
          </p>
        </div>
      )}
    </div>
  );
};

export default RoadmapSetupFieldPanel;
