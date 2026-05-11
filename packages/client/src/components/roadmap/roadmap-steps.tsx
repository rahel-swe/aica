import type { RoadmapStep } from '@contracts/shared/types/roadmap-types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import RoadmapStepButton from './roadmap-step-button';
import RoadmapStepCard from './roadmap-step-card';
import { useRoadmapStepsAndPhasesParams } from '@/hooks/roadmap-steps-and-phases-params';
import { cn } from '@/lib/utils';

const RoadmapSteps = ({ steps }: { steps: RoadmapStep[] }) => {
  const [, setRoadmapParams] = useRoadmapStepsAndPhasesParams();
  return (
    <div className="flex flex-wrap items-center justify-evenly gap-20 px-4 sm:gap-25">
      {steps.map((step, idx) => (
        <Popover key={step.id}>
          <PopoverTrigger
            className={cn(steps.length === idx + 1 && 'me-auto ms-12 lg:ms-25')}
          >
            <RoadmapStepButton
              order={idx + 1}
              isInProgress={step.status === 'in_progress'}
              isCompleted={step.status === 'completed'}
              onClick={() =>
                setRoadmapParams({
                  phaseId: step.phaseId,
                  stepId: step.id,
                })
              }
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
