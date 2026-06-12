import { useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { streamAdvisorChat } from '@/services/advisor-service';
import { useAdvisorStore } from '@/stores/advisor-store';
import { advisorKeys } from '@/queries/advisor-query';
import type { AdvisorChatRequest } from '@contracts/shared/types/advisor-types';

export function useAdvisorStream() {
  const abortControllerRef = useRef<AbortController | null>(null);
  const queryClient = useQueryClient();

  const send = useCallback(
    (message: string, roadmapStep?: AdvisorChatRequest['roadmapStep']) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        useAdvisorStore.getState().cancelStream();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const store = useAdvisorStore.getState();
      store.appendUserMessage(message);
      store.beginStream();

      const request: AdvisorChatRequest = {
        message,
        conversationId: store.activeConversationId ?? undefined,
        responseMode: store.responseMode, // ← pass selected mode
        ...(roadmapStep ? { roadmapStep } : {}),
      };

      streamAdvisorChat(
        request,
        {
          onStart: (conversationId) => {
            useAdvisorStore.getState().confirmConversationId(conversationId);
          },
          // ← surface "searching" state to the streaming bubble
          onSearching: (query) => {
            useAdvisorStore.getState().setSearchingQuery(query);
          },
          onDelta: (content) => {
            useAdvisorStore.getState().pushDelta(content);
          },
          // commit resources before metadata
          onResources: (items) => {
            useAdvisorStore.getState().applyResources(items);
          },
          onMetadata: (meta) => {
            useAdvisorStore.getState().applyMetadata(meta);
          },
          onDone: () => {
            useAdvisorStore.getState().commitStream();
            queryClient.invalidateQueries({
              queryKey: advisorKeys.conversations(),
            });
          },
          onError: (errorMessage) => {
            useAdvisorStore.getState().failStream(errorMessage);
          },
        },
        controller.signal
      );
    },
    [queryClient]
  );

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    useAdvisorStore.getState().cancelStream();
  }, []);

  const isStreaming = useAdvisorStore((s) => s.streaming !== null);

  return { send, abort, isStreaming };
}
