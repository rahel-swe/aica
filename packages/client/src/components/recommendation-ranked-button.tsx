import { rankedButtonColor } from '@/constants/recommendation-constant';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const RecommendationRankedButton = ({
  rank,
  onClick,
  isActive,
}: {
  rank: number;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <Button
      size={'lg'}
      onClick={onClick}
      variant={'outline'}
      className={cn(
        'relative font-semibold text-lg md:text-2xl transition-all py-5 md:py-7 px-5 md:px-7',
        rankedButtonColor[rank - 1],
        isActive && 'bg-background dark:bg-background dark:text-white'
      )}
    >
      #{rank}
    </Button>
  );
};

export default RecommendationRankedButton;
