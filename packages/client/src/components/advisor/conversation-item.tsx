import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { AdvisorConversationSummary } from '@contracts/shared/types/advisor-types';
import { Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { relativeTime } from '@/lib/relative-time';

type ConversationItemProps = {
  conversation: AdvisorConversationSummary;
  isActive: boolean;
  onSelect: () => void;
  onDeleteRequest: (id: string) => void;
};

const ConversationItem = ({
  conversation,
  isActive,
  onSelect,
  onDeleteRequest,
}: ConversationItemProps) => {
  const isTextLong = (text: string) => text.length > 26;
  const { title, lastMessage, _id: conversationId, updatedAt } = conversation;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className={cn(
        'group relative flex items-center gap-4 rounded-xl px-3 py-2.5 cursor-pointer',
        'transition-colors text-left',
        isActive
          ? 'bg-muted text-foreground'
          : 'hover:bg-muted/60 text-foreground/80 hover:text-foreground'
      )}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between gap-0">
          <p className="text-[13px] font-medium leading-tight flex-1">
            {title.slice(0, 26)}
            {isTextLong(title) && '...'}
          </p>
          <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
            {relativeTime(updatedAt)}
          </span>
        </div>

        {lastMessage && (
          <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1 pr-6">
            {lastMessage.slice(0, 26)}
            {isTextLong(lastMessage) && '...'}
          </p>
        )}
      </div>

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className={cn('shrink')}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteRequest(conversationId);
              }}
            >
              <Trash2 className="size-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            Delete
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ConversationItem;
