import { cn } from '@/lib/utils';
import { Check, FlagTriangleRight } from 'lucide-react';
import { Button } from '../ui/button';
import { roadmapStepTextColors } from './roadmap-view-utils';

const RoadmapStepButton = ({
  order,
  isInProgress,
  isCompleted,
  className,
}: {
  order: number;
  isInProgress: boolean;
  isCompleted: boolean;
  className?: string;
}) => {
  return (
    <Button
      variant={isCompleted ? 'default' : 'outline'}
      className={cn(
        'relative text-2xl px-10 w-min border-dashed border-2 font-heading',
        className
      )}
    >
      {isCompleted ? (
        <Check
          className={cn(
            'size-10 absolute inset-s-6',

            isInProgress && 'animate-pulse'
          )}
        />
      ) : (
        <FlagTriangleRight
          fill="currentColor"
          className={cn(
            'size-12 absolute -top-8 inset-s-2',
            roadmapStepTextColors[(order - 1) % roadmapStepTextColors.length],
            isInProgress && 'animate-pulse'
          )}
        />
      )}
      {!isCompleted && order}
    </Button>
  );
};

export default RoadmapStepButton;
