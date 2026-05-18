import { rankedButtonColor } from '@/constants/recommendation-constant';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const RecommendationRankedButton = ({
  rank,
  label,
  onClick,
  isActive,
}: {
  rank: number;
  label?: string;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <Button
      size={'lg'}
      onClick={onClick}
      variant={'outline'}
      className={cn(
        'relative flex min-h-20 flex-col items-center justify-center gap-1 font-semibold text-lg md:text-2xl transition-all py-5 md:py-6 px-5 md:px-7',
        rankedButtonColor[rank - 1],
        isActive && 'bg-background dark:bg-background dark:text-white'
      )}
    >
      <span>#{rank}</span>
      {label ? (
        <span className="text-xs font-medium opacity-70">{label}</span>
      ) : null}
    </Button>
  );
};

export default RecommendationRankedButton;
