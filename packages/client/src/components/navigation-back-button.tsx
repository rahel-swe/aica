import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const NavigationBackButton = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={'outline'}
      className={cn(className)}
      onClick={() => {
        navigate(-1);
      }}
    >
      <ArrowLeft />
      {title}
    </Button>
  );
};

export default NavigationBackButton;
