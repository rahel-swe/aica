import apiClient, { API_BASE_URL } from '@/lib/api-client';
import type {
  AdvisorChatRequest,
  AdvisorConversation,
  AdvisorConversationSummary,
  AdvisorContextSource,
  AdvisorStreamEvent,
  SearchResult,
} from '@contracts/shared/types/advisor-types';

// ─── Streaming metadata + resources shapes ─────────────────────────────────────

export type AdvisorStreamMetadata = {
  actions: string[];
  followUps: string[];
  cautions: string[];
  contextUsed: AdvisorContextSource[];
};

type StreamHandlers = {
  onStart: (conversationId: string, messageId: string) => void;
  onSearching: (query: string) => void;
  onDelta: (content: string) => void;
  onResources: (items: SearchResult[]) => void;
  onMetadata: (meta: AdvisorStreamMetadata) => void;
  onDone: () => void;
  onError: (message: string) => void;
};

// ─── Streaming chat

export function streamAdvisorChat(
  payload: AdvisorChatRequest,
  handlers: StreamHandlers,
  signal: AbortSignal
): void {
  fetch(`${API_BASE_URL}/api/advisor/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
    signal,
  })
    .then(async (res) => {
      if (!res.ok || !res.body) {
        handlers.onError('Could not connect to the advisor. Please try again.');

        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';

        for (const part of parts) {
          if (!part.startsWith('data: ')) continue;

          try {
            const event = JSON.parse(part.slice(6)) as AdvisorStreamEvent;
            switch (event.type) {
              case 'start':
                handlers.onStart(event.conversationId, event.messageId);
                break;

              case 'searching':
                handlers.onSearching(event.query);
                break;

              case 'delta':
                handlers.onDelta(event.content);
                break;

              case 'resources':
                handlers.onResources(event.items);
                break;

              case 'metadata':
                handlers.onMetadata({
                  actions: event.actions,
                  followUps: event.followUps,
                  cautions: event.cautions,
                  contextUsed: event.contextUsed,
                });
                break;

              case 'done':
                handlers.onDone();
                break;

              case 'error':
                handlers.onError(event.message);
                break;
            }
          } catch {
            // Malformed chunk — skip silently
          }
        }
      }
    })
    .catch((err) => {
      if (err instanceof DOMException && err.name === 'AbortError') return;

      handlers.onError('Connection lost. Your context is saved — try again.');
    });
}

// ─── REST endpoints

export async function listConversations(): Promise<
  AdvisorConversationSummary[]
> {
  const res = await apiClient.get('/api/advisor/conversations');

  return res.data.data;
}

export async function getConversation(
  id: string
): Promise<AdvisorConversation> {
  const res = await apiClient.get(`/api/advisor/conversations/${id}`);

  return res.data.data;
}

export async function deleteConversation(id: string): Promise<void> {
  await apiClient.delete(`/api/advisor/conversations/${id}`);
}
