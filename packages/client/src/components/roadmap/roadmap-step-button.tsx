import { cn } from '@/lib/utils';
import { Check, FlagTriangleRight } from 'lucide-react';
import { Button } from '../ui/button';
import { roadmapStepFlagColors } from '../../lib/roadmap-view-utils';

const RoadmapStepButton = ({
  order,
  isInProgress,
  isCompleted,
  onClick,
  className,
}: {
  order: number;
  isInProgress: boolean;
  isCompleted: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <Button
      variant={isCompleted ? 'default' : 'outline'}
      className={cn(
        'relative text-2xl sm:text-3xl px-10 sm:py-6  w-min border-dashed border-2 font-heading',
        className
      )}
      onClick={onClick}
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
            roadmapStepFlagColors[(order - 1) % roadmapStepFlagColors.length],
            isInProgress && 'animate-bounce inset-s-1/2'
          )}
        />
      )}
      {!isCompleted && order}
    </Button>
  );
};

export default RoadmapStepButton;
