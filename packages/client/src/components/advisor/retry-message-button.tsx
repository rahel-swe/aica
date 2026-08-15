import { Button } from '@/components/ui/button';
import { useAdvisorStream } from '@/hooks/use-advisor-stream';
import { useAdvisorStore } from '@/stores/advisor-store';
import type { AdvisorChatMessage } from '@contracts/shared/types/advisor-types';
import { RefreshCcw } from 'lucide-react';

const RetryMessageButton = ({ message }: { message: AdvisorChatMessage }) => {
  const { send } = useAdvisorStream();
  const { setRequestMode, setMessageId } = useAdvisorStore();

  return (
    <Button
      size="icon-xs"
      variant={'ghost'}
      className="py-0 rounded-sm text-muted-foreground"
      onClick={() => {
        setRequestMode('retry');
        setMessageId(message.id);

        send(message.content);
      }}
    >
      <RefreshCcw />
    </Button>
  );
};

export default RetryMessageButton;
