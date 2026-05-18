import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';

const GetStartedButton = ({
  onButtonClicked,
  shouldDisable,
  className,
}: {
  onButtonClicked: () => void;
  shouldDisable: boolean;
  className?: string;
}) => {
  return (
    <Button
      size="lg"
      className={cn('group py-7 px-7', className)}
      disabled={shouldDisable}
      onClick={onButtonClicked}
    >
      Get Started
      <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
    </Button>
  );
};

export default GetStartedButton;
