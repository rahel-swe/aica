import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '@/components/ui/button';
import { MessageCircleX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { m } from '../../paraglide/messages';

const CloseAdvisor = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  const isMobile = useIsMobile(768);
  const navigate = useNavigate();

  if (!isMobile) return null;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size={'sm'}
            className={cn(
              'text-muted-foreground hover:text-foreground py-4',
              className
            )}
            onClick={() => navigate('/app/roadmap')}
          >
            <MessageCircleX className="" />
            {title}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {m.advisor_close_chat()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CloseAdvisor;
