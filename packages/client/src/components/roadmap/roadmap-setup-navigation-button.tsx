import type { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

type RoadmapSetupNavigationButtonProps = {
  label: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
} & React.ComponentProps<typeof Button>;

const RoadmapSetupNavigationButton = ({
  label,
  icon: Icon,
  iconPosition = 'left',
  ...props
}: RoadmapSetupNavigationButtonProps) => {
  return (
    <Button {...props}>
      {Icon && iconPosition === 'left' && <Icon />}

      {label}

      {Icon && iconPosition === 'right' && <Icon />}
    </Button>
  );
};
export default RoadmapSetupNavigationButton;
