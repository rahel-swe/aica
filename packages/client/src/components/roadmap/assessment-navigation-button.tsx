import type { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type RoadmapSetupNavigationButtonProps = {
  label: string;
  icon?: LucideIcon;
  shouldRotate: boolean;
  iconPosition?: 'left' | 'right';
} & React.ComponentProps<typeof Button>;

const AssessmentNavigationButton = ({
  label,
  icon: Icon,
  shouldRotate,
  iconPosition = 'left',
  ...props
}: RoadmapSetupNavigationButtonProps) => {
  return (
    <Button {...props}>
      {Icon && iconPosition === 'left' && (
        <Icon className={cn(shouldRotate && 'rtl:rotate-180')} />
      )}

      {label}

      {Icon && iconPosition === 'right' && (
        <Icon className={cn(shouldRotate && 'rtl:rotate-180')} />
      )}
    </Button>
  );
};
export default AssessmentNavigationButton;
