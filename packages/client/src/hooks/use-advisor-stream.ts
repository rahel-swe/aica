import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { streamAdvisorChat } from '@/services/advisor-service';
import { useAdvisorStore } from '@/stores/advisor-store';
import { advisorKeys } from '@/queries/advisor-query';
import type { AdvisorChatRequest } from '@contracts/shared/types/advisor-types';

export function useAdvisorStream() {
  const queryClient = useQueryClient();

  const send = useCallback(
    (message: string, roadmapStep?: AdvisorChatRequest['roadmapStep']) => {
      const store = useAdvisorStore.getState();
      const currentMessageId = store.messageId;
      const shouldReplacePastMessages =
        store.requestMode === 'edit' || store.requestMode === 'retry';

      if (shouldReplacePastMessages && currentMessageId) {
        store.removeMessagesAfterCurrentMessage(currentMessageId);
      }

      if (store.requestMode !== 'retry') {
        store.appendUserMessage(message);
      }

      const controller = store.beginStream();

      const request: AdvisorChatRequest = {
        message,
        conversationId: store.activeConversationId ?? undefined,
        requestMode: store.requestMode,
        responseMode: store.responseMode, // ← pass selected mode
        messageId: store.messageId,
        ...(roadmapStep ? { roadmapStep } : {}),
      };

      store.resetRequestState();

      streamAdvisorChat(
        request,
        {
          onStart: (conversationId, messageId) => {
            useAdvisorStore
              .getState()
              .attachStreamMeta(conversationId, messageId);
          },

          // ← surface "searching" state to the streaming bubble
          onSearching: (query) =>
            useAdvisorStore.getState().setSearchingQuery(query),

          onDelta: (content) => useAdvisorStore.getState().pushDelta(content),

          // commit resources before metadata
          onResources: (items) =>
            useAdvisorStore.getState().applyResources(items),

          onMetadata: (meta) => useAdvisorStore.getState().applyMetadata(meta),

          onDone: () => {
            useAdvisorStore.getState().commitStream();
            queryClient.invalidateQueries({
              queryKey: advisorKeys.conversations(),
            });
          },

          onError: (errorMessage) => {
            useAdvisorStore.getState().failStream(errorMessage);
            queryClient.invalidateQueries({
              queryKey: advisorKeys.conversations(),
            });
          },
        },
        controller.signal
      );
    },
    [queryClient]
  );

  const abort = useCallback(() => {
    useAdvisorStore.getState().cancelStream();
  }, []);

  const isStreaming = useAdvisorStore((s) => s.streaming !== null);

  return { send, abort, isStreaming };
}
