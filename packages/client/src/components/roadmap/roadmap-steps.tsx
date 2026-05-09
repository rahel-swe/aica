import type { RoadmapStep } from '@contracts/shared/types/roadmap-types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import RoadmapStepButton from './roadmap-step-button';
import RoadmapStepCard from './roadmap-step-card';

const RoadmapSteps = ({ steps }: { steps: RoadmapStep[] }) => {
  return (
    <div className="flex flex-wrap items-center justify-evenly gap-20 px-4 sm:gap-25">
      {steps.map((step, idx) => (
        <Popover>
          <PopoverTrigger>
            <RoadmapStepButton
              order={idx + 1}
              isInProgress={step.status === 'in_progress'}
              isCompleted={step.status === 'completed'}
            />
          </PopoverTrigger>
          <PopoverContent side="right">
            <RoadmapStepCard step={step} />
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default RoadmapSteps;
