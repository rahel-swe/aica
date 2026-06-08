import { AdvisorSidebar } from '@/components/advisor/advisor-sidebar';
import { AdvisorChatThread } from '@/components/advisor/advisor-chat-thread';
import { AdvisorInput } from '@/components/advisor/advisor-input';
import { AdvisorChatHeader } from '@/components/advisor/advisor-chat-header';
import { useAdvisorStream } from '@/hooks/use-advisor-stream';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AdvisorPage() {
  const { send, abort, isStreaming } = useAdvisorStream();
  const isMobile = useIsMobile(768);

  return (
    <div className="flex h-full overflow-hidden bg-background min-h-0 md:overflow-hidden">
      {/* Desktop sidebar — hidden on mobile */}
      {!isMobile && <AdvisorSidebar className="hidden md:flex" />}

      {/* Chat area */}
      <main className="flex flex-col flex-1 min-w-0 min-h-0 relative">
        {isMobile && <AdvisorChatHeader />}

        <AdvisorChatThread className="flex-1" onSend={send} />

        <AdvisorInput
          onSubmit={send}
          onAbort={abort}
          isStreaming={isStreaming}
        />
      </main>
    </div>
  );
}
