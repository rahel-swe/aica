import { cn } from '@/lib/utils';
import type { OnboardingOption } from '@/constants/onboarding-steps';

type OnboardingOptionCardProps = {
  option: OnboardingOption;
  selected: boolean;
  onClick: () => void;
};

const OnboardingOptionCard = ({
  option,
  selected,
  onClick,
}: OnboardingOptionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-full w-full flex-col items-start gap-2 rounded-2xl border px-4 py-4 text-left transition-colors',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-border bg-card hover:bg-accent'
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{option.emoji}</span>
        <span className="font-medium">{option.label}</span>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">
        {option.description}
      </p>
    </button>
  );
};

export default OnboardingOptionCard;
