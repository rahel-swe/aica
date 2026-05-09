import { cn } from '@/lib/utils';
import { Check, FlagTriangleRight } from 'lucide-react';
import { Button } from '../ui/button';

const roadmapStepTextColors = [
  'text-emerald-400',
  'text-sky-300',
  'text-violet-400',
  'text-rose-400',
  'text-amber-300',
  'text-cyan-300',
  'text-fuchsia-400',
  'text-lime-400',
  'text-orange-400',
  'text-teal-400',
  'text-indigo-400',
  'text-pink-400',
  'text-green-400',
  'text-purple-400',
  'text-yellow-300',
];

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
