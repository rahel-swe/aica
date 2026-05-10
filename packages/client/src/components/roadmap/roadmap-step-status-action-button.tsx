import { cn } from '@/lib/utils';
import { useRoadmapStepStatusMutation } from '@/queries/roadmap-query';
import type {
  RoadmapStep,
  RoadmapStepStatus,
} from '@contracts/shared/types/roadmap-types';
import { Check, Circle, LoaderCircle, Play } from 'lucide-react';
import { Button } from '../ui/button';

const RoadmapStepStatusActionButton = ({
  roadmapId,
  step,
}: {
  roadmapId: string;
  step: RoadmapStep;
}) => {
  const { mutate, isPending } = useRoadmapStepStatusMutation();

  const handleStepStatusChanges = () => {
    const nextStatus: RoadmapStepStatus =
      step.status === 'pending'
        ? 'in_progress'
        : step.status === 'in_progress'
          ? 'completed'
          : 'pending';
    mutate(
      {
        roadmapId,
        stepId: step.id,
        stepStatus: nextStatus,
      },
      {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: (res) => {
          console.log(res);
        },
      }
    );
  };

  return (
    <Button
      className={cn('px-6 mx-auto')}
      onClick={handleStepStatusChanges}
      disabled={isPending}
    >
      {step.status === 'pending'
        ? 'Start'
        : step.status === 'in_progress'
          ? 'Complete'
          : step.status === 'completed'
            ? 'Completed'
            : ''}
      {step.status === 'pending' ? (
        <Play />
      ) : step.status === 'in_progress' ? (
        <LoaderCircle />
      ) : step.status === 'completed' ? (
        <Check />
      ) : (
        <Circle />
      )}
      {/* {!isPending && <SpinnerBars barClassName="w-1" />} */}
    </Button>
  );
};

export default RoadmapStepStatusActionButton;
