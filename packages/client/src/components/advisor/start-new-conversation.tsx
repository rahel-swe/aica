import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '@/components/ui/button';
import { MessageCirclePlus } from 'lucide-react';
import { useAdvisorStore } from '@/stores/advisor-store';
import { cn } from '@/lib/utils';

const StartNewConversation = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  const { startNewConversation, activeConversationId } = useAdvisorStore();

  if (!activeConversationId) return null;

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
            onClick={startNewConversation}
          >
            <MessageCirclePlus className="" />
            {title}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          New Chat
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StartNewConversation;
