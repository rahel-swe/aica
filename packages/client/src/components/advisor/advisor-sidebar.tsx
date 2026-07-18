import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  useConversationsQuery,
  useDeleteConversationMutation,
  useLoadConversation,
} from '@/queries/advisor-query';
import { useAdvisorStore } from '@/stores/advisor-store';
import type { AdvisorConversationSummary } from '@contracts/shared/types/advisor-types';
import { Loader, MessageCircleOff } from 'lucide-react';
import { useState } from 'react';
import ConversationDeleteDialog from './conversation-delete-dialog';
import ConversationItem from './conversation-item';
import StartNewConversation from './start-new-conversation';
import { m } from '../../paraglide/messages';

type AdvisorSidebarProps = {
  className?: string;
};

export function AdvisorSidebar({ className }: AdvisorSidebarProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const { data: conversations = [], isLoading } = useConversationsQuery();
  const { mutate: deleteConv, isPending: isDeleting } =
    useDeleteConversationMutation();

  const loadConversation = useLoadConversation();

  const { activeConversationId, streaming } = useAdvisorStore();

  const handleSelect = (conv: AdvisorConversationSummary) => {
    if (conv._id === activeConversationId) return;
    loadConversation(conv._id, conv.title);
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    deleteConv(pendingDeleteId, { onSettled: () => setPendingDeleteId(null) });
  };

  return (
    <aside className={cn('h-full md:py-2 md:pt-4', className)}>
      <div
        className={cn(
          'flex flex-col md:w-xs shrink-0 md:border md:rounded-4xl md:bg-card h-full min-h-0 md:overflow-hidden'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4">
          <p className="ltr:font-heading text-base font-medium py-4">
            {m.advisor_conversations()}
          </p>
          <StartNewConversation
            title={m.advisor_new_chat()}
            className="hidden md:flex"
          />
        </div>

        <Separator />

        {/* Conversation list */}
        <ScrollArea className="h-full overflow-auto w-full" scrollFade>
          <div className="px-2 py-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="size-4 animate-spin text-muted-foreground" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center w-full flex-1">
                <MessageCircleOff className="size-5 text-muted-foreground/50" />
                <p className="text-xs text-muted-foreground">
                  {m.advisor_no_conversations_yet()}
                </p>
              </div>
            ) : (
              <div className="space-y-0.5">
                {conversations.map((conv) => (
                  <ConversationItem
                    key={conv._id}
                    conversation={conv}
                    isActive={conv._id === activeConversationId}
                    isStreaming={Boolean(
                      conv._id === streaming?.conversationId
                    )}
                    activeConversationId={activeConversationId}
                    onSelect={() => handleSelect(conv)}
                    onDeleteRequest={setPendingDeleteId}
                  />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Delete dialog */}
        <ConversationDeleteDialog
          open={!!pendingDeleteId}
          onOpenChange={(open) => !open && setPendingDeleteId(null)}
          onConfirm={handleConfirmDelete}
          isPending={isDeleting}
        />
      </div>
    </aside>
  );
}
