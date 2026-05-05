import type { RoadmapStep } from '@/constants/roadmap-setup-steps';

import MultiSelectField from '../form/multi-select-field';
import SingleSelectField from '../form/single-select-field';

import { cn } from '@/lib/utils';

type RoadmapSetupFieldPanelProps = {
  step: RoadmapStep;
  currentIndex: number;
  direction: 'forward' | 'backward';
};

const RoadmapSetupFieldPanel = ({
  step,
  direction,
}: RoadmapSetupFieldPanelProps) => {
  if (!step.fieldName || !step.options) return null;

  return (
    <div
      key={step.id}
      className={cn(
        'space-y-4 transition-all duration-500',
        'animate-in fade-in',
        direction === 'forward'
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
    </div>
  );
};

export default RoadmapSetupFieldPanel;
