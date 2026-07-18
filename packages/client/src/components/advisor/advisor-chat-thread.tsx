import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAdvisorStore } from '@/stores/advisor-store';
import {
  AdvisorMessageBubble,
  StreamingBubble,
} from './advisor-message-bubble';
import { AdvisorEmptyState } from './advisor-empty-state';
import { cn } from '@/lib/utils';
import type { AdvisorChatMessage } from '@contracts/shared/types/advisor-types';

type AdvisorChatThreadProps = {
  onSend: (message: string) => void;
  className?: string;
};

export function AdvisorChatThread({
  onSend,
  className,
}: AdvisorChatThreadProps) {
  const { messages, streaming, activeConversationId } = useAdvisorStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const isStreaming = streaming !== null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isStreaming]);

  const isEmpty = messages.length === 0 && !isStreaming;

  return (
    <ScrollArea className={cn('flex-1 min-h-0', className)} scrollFade>
      <div
        className="mx-auto px-4 space-y-6 w-full md:w-[80%] pt-6 pb-27 md:pt-6 md:pb-30"
        dir="ltr"
        lang="en"
      >
        {(isStreaming && !activeConversationId) || isEmpty ? (
          <AdvisorEmptyState />
        ) : (
          <>
            {messages.map((message, i) => (
              <AdvisorMessageBubble
                key={i}
                message={message as AdvisorChatMessage}
                onFollowUp={onSend}
              />
            ))}

            {isStreaming &&
              streaming.conversationId === activeConversationId && (
                <StreamingBubble
                  content={streaming.content}
                  searchingQuery={streaming.searchingQuery}
                  resources={streaming.resources}
                  error={streaming.error}
                />
              )}
          </>
        )}
        <div ref={bottomRef} className="h-1" />
      </div>
    </ScrollArea>
  );
}
