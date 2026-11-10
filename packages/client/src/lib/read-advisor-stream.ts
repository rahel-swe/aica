import type {
  AdvisorContextSource,
  SearchResult,
} from '@contracts/shared/types/advisor-types';
import { advisorStreamEventSchema } from '@contracts/shared/schemas/advisor-schema';

const MAX_EVENT_LENGTH = 256 * 1024;

export type AdvisorStreamMetadata = {
  actions: string[];
  followUps: string[];
  cautions: string[];
  contextUsed: AdvisorContextSource[];
};

export type AdvisorStreamHandlers = {
  onStart: (conversationId: string, messageId: string) => void;
  onSearching: (query: string) => void;
  onDelta: (content: string) => void;
  onResources: (items: SearchResult[]) => void;
  onMetadata: (meta: AdvisorStreamMetadata) => void;
  onDone: () => void;
  onError: (message: string) => void;
};

export async function readAdvisorStream(
  body: ReadableStream<Uint8Array>,
  handlers: AdvisorStreamHandlers,
  signal?: AbortSignal
): Promise<void> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  const onAbort = () => {
    void reader.cancel().catch(() => {});
  };
  signal?.addEventListener('abort', onAbort, { once: true });

  try {
    while (true) {
      signal?.throwIfAborted();
      const { done, value } = await reader.read();
      signal?.throwIfAborted();
      if (done) throw new Error('Advisor connection closed before completion.');

      buffer = (buffer + decoder.decode(value, { stream: true })).replace(
        /\r\n/g,
        '\n'
      );
      const parts = buffer.split('\n\n');
      buffer = parts.pop() ?? '';
      if (buffer.length > MAX_EVENT_LENGTH)
        throw new Error('Advisor event exceeded its size limit.');

      for (const part of parts) {
        signal?.throwIfAborted();
        if (part.length > MAX_EVENT_LENGTH)
          throw new Error('Advisor event exceeded its size limit.');
        const data = part
          .split('\n')
          .filter((line) => line.startsWith('data:'))
          .map((line) => line.slice(5).trimStart())
          .join('\n');
        if (!data) continue;

        const parsed = advisorStreamEventSchema.safeParse(JSON.parse(data));
        if (!parsed.success) throw new Error('Invalid Advisor stream event.');
        const event = parsed.data;
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
            return;
          case 'error':
            handlers.onError(event.message);
            return;
        }
      }
    }
  } finally {
    signal?.removeEventListener('abort', onAbort);
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
