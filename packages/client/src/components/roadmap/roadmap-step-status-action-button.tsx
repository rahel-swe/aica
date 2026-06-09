import { cn } from '@/lib/utils';
import { useRoadmapStepsAndPhasesParams } from '@/params/use-roadmap-steps-and-phases-params';
import { useRoadmapStepStatusMutation } from '@/queries/roadmap-query';
import type {
  RoadmapStep,
  RoadmapStepStatus,
} from '@contracts/shared/types/roadmap-types';
import { Loader, Play, RefreshCcw, type LucideIcon } from 'lucide-react';
import SpinnerBars from '../shadcn-space/spinner/spinner-06';
import { Button } from '../ui/button';

const roadmapStepActionButtonMeta: Record<
  RoadmapStepStatus,
  {
    lable: string;
    icon: LucideIcon;
    className?: string;
  }
> = {
  pending: {
    lable: 'Start',
    icon: Play,
  },
  in_progress: {
    lable: 'Complete',
    icon: Loader,
  },
  completed: {
    lable: 'Reset',
    icon: RefreshCcw,
  },
};

const RoadmapStepStatusActionButton = ({
  roadmapId,
  step,
  className,
}: {
  roadmapId: string;
  step: RoadmapStep;
  className?: string;
}) => {
  const { mutate, isPending, isSuccess } = useRoadmapStepStatusMutation();
  const { icon: Icon, lable } = roadmapStepActionButtonMeta[step.status];
  const [, setRoadmapParams] = useRoadmapStepsAndPhasesParams();

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
        onError(error) {
          console.log(error);
        },
      }
    );
    if (isSuccess)
      setRoadmapParams({
        phaseId: '',
        stepId: '',
      });
  };

  return (
    <Button
      className={cn('px-6 py-6 relative font-heading', className)}
      onClick={handleStepStatusChanges}
      disabled={isPending}
    >
      {lable}
      <Icon />
      {isPending && (
        <SpinnerBars
          className={'my-auto absolute gap-1'}
          barClassName="w-1"
          heights={['3px', '15px', '3px']}
        />
      )}
    </Button>
  );
};

export default RoadmapStepStatusActionButton;
