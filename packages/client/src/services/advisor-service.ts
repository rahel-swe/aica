import apiClient, { API_BASE_URL } from '@/lib/api-client';
import type {
  AdvisorChatRequest,
  AdvisorConversation,
  AdvisorConversationSummary,
} from '@contracts/shared/types/advisor-types';
import {
  readAdvisorStream,
  type AdvisorStreamHandlers,
} from '@/lib/read-advisor-stream';
export type { AdvisorStreamMetadata } from '@/lib/read-advisor-stream';

// ─── Streaming chat

export function streamAdvisorChat(
  payload: AdvisorChatRequest,
  handlers: AdvisorStreamHandlers,
  signal: AbortSignal
): void {
  const requestSignal = AbortSignal.any([signal, AbortSignal.timeout(120000)]);
  fetch(`${API_BASE_URL}/api/advisor/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
    signal: requestSignal,
  })
    .then(async (res) => {
      requestSignal.throwIfAborted();
      if (!res.ok || !res.body) {
        handlers.onError('Could not connect to the advisor. Please try again.');

        return;
      }

      await readAdvisorStream(res.body, handlers, requestSignal);
    })
    .catch(() => {
      if (signal.aborted) return;

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
