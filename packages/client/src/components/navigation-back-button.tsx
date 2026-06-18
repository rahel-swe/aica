import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const NavigationBackButton = ({
  title,
  onClick,
  className,
}: {
  title?: string;
  onClick?: () => void;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={'outline'}
      className={cn(className)}
      onClick={() => (onClick ? onClick() : navigate(-1))}
    >
      <ArrowLeft className="rtl:rotate-180" />
      {title}
    </Button>
  );
};

export default NavigationBackButton;
