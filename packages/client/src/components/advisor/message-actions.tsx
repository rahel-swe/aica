import { formatAdvisorMessage } from '@/lib/format-advisor-message';
import type { AdvisorChatMessage } from '@contracts/shared/types/advisor-types';
import { PencilLine } from 'lucide-react';
import CopyTextButton from '../copy-text-button';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import RegenerateMessageButton from './regenerate-message-button';

const MessageActions = ({ message }: { message: AdvisorChatMessage }) => {
  const isMessageUser = message.role === 'user' ? true : false;

  const creationDate = new Date(message.createdAt);

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        isMessageUser && 'flex-row-reverse me-2'
      )}
    >
      <div className="flex items-center">
        <RegenerateMessageButton message={message} />

        {isMessageUser && (
          <Button
            size="icon-xs"
            variant={'ghost'}
            className="py-0 rounded-sm text-muted-foreground"
          >
            <PencilLine />
          </Button>
        )}

        <CopyTextButton text={formatAdvisorMessage(message)} />
      </div>
      <span className="text-[0.65rem] text-muted-foreground">
        {creationDate.toDateString()}
      </span>
    </div>
  );
};

export default MessageActions;
