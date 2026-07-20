import { Button } from '@/components/ui/button';
import { useAdvisorStream } from '@/hooks/use-advisor-stream';
import type { AdvisorChatMessage } from '@contracts/shared/types/advisor-types';
import { RefreshCcw } from 'lucide-react';

const RegenerateMessageButton = ({
  message,
}: {
  message: AdvisorChatMessage;
}) => {
  const { send } = useAdvisorStream();

  return (
    <Button
      size="icon-xs"
      variant={'ghost'}
      className="py-0 rounded-sm text-muted-foreground"
      onClick={() => send(message.content)}
    >
      <RefreshCcw />
    </Button>
  );
};

export default RegenerateMessageButton;
