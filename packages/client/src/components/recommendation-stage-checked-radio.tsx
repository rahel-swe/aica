import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const RecommendationStageCheckedRadio = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <RadioGroup>
      <RadioGroupItem
        value="first"
        className={cn('inset-s-6 absolute top-3 z-20 size-4.5', className)}
        checked
      />
    </RadioGroup>
  );
};

export default RecommendationStageCheckedRadio;
