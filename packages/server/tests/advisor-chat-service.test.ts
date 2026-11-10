import { afterAll, beforeEach, expect, spyOn, test } from 'bun:test';
import { EventEmitter } from 'node:events';
import type { Response } from 'express';
import type {
  AdvisorChatRequest,
  AdvisorStreamEvent,
} from '@contracts/shared/types/advisor-types';

process.env.CLOUDFLARE_ACCOUNT_ID ||= 'test-account';
process.env.CLOUDFLARE_API_TOKEN ||= 'test-token';
const completion = await import('../src/llm/advisor-chat-completion');
const { advisorConversationRepository: repository } =
  await import('../src/repositories/advisor-conversation-repository');
const { advisorService } =
  await import('../src/services/advisor/advisor-chat-service');
const generate = spyOn(completion, 'runAdvisorCompletion');
const find = spyOn(repository, 'findByIdAndUserId');
const append = spyOn(repository, 'appendMessage');
const log = spyOn(console, 'error');
afterAll(() => {
  generate.mockRestore();
  find.mockRestore();
  append.mockRestore();
  log.mockRestore();
});

class ChatResponse extends EventEmitter {
  events: AdvisorStreamEvent[] = [];
  writableEnded = false;
  destroyed = false;
  write(data: string) {
    this.events.push(JSON.parse(data.slice(6)));
  }
  end() {
    this.writableEnded = true;
    this.emit('close');
  }
}

const request: AdvisorChatRequest = {
  conversationId: 'conv',
  message: 'Hello',
  requestMode: 'new',
  responseMode: 'focused',
  messageId: null,
};

beforeEach(() => {
  generate.mockReset();
  find.mockReset();
  append.mockReset();
  log.mockImplementation(() => {});
  find.mockResolvedValue({
    _id: 'conv',
    messages: [{ role: 'user', content: 'Hello' }],
    contextSnapshot: {},
  });
  append.mockResolvedValue({});
  generate.mockImplementation(async (_prompt, _history, _mode, callbacks) => {
    callbacks.onDelta('Hello! How can I help?');
    return {
      content: 'Hello! How can I help?',
      toolCalls: [],
      searchResults: [],
    };
  });
});

test('saves the streamed message ID before telling the client it is done', async () => {
  const response = new ChatResponse();
  append.mockImplementation(async (_id, message) => {
    if (message.role === 'assistant')
      expect(response.events.some((event) => event.type === 'done')).toBe(
        false
      );
    return {};
  });
  await advisorService.chat('user', request, response as unknown as Response);
  const start = response.events.find((event) => event.type === 'start');
  const saved = append.mock.calls.find(
    ([, message]) => message.role === 'assistant'
  )?.[1];
  expect(start?.type).toBe('start');
  expect(saved?.id).toBe(start?.messageId);
  expect(saved?.content).toBe('Hello! How can I help?');
  expect(response.events.at(-1)?.type).toBe('done');
  expect(response.writableEnded).toBe(true);
  expect(response.listenerCount('close')).toBe(0);
});

test('aborts the provider when the browser disconnects', async () => {
  const response = new ChatResponse();
  generate.mockImplementation(
    async (_prompt, _history, _mode, _callbacks, options) => {
      response.destroyed = true;
      response.emit('close');
      expect(options?.signal?.aborted).toBe(true);
      throw new DOMException('Cancelled', 'AbortError');
    }
  );
  await advisorService.chat('user', request, response as unknown as Response);
  expect(
    append.mock.calls.some(([, message]) => message.role === 'assistant')
  ).toBe(false);
  expect(response.events.some((event) => event.type === 'error')).toBe(false);
  expect(response.listenerCount('close')).toBe(0);
});

test('reports interrupted output instead of saving a partial reply as complete', async () => {
  const response = new ChatResponse();
  generate.mockImplementation(async (_prompt, _history, _mode, callbacks) => {
    callbacks.onDelta('An unfinished reply');
    throw new Error('Connection lost');
  });
  await advisorService.chat('user', request, response as unknown as Response);
  expect(response.events).toContainEqual({
    type: 'error',
    message:
      'The reply was interrupted. Please try again for a complete answer.',
  });
  expect(
    append.mock.calls.some(([, message]) => message.role === 'assistant')
  ).toBe(false);
  expect(response.writableEnded).toBe(true);
});

test('does not report successful metadata when persistence fails', async () => {
  const response = new ChatResponse();
  append.mockImplementation(async (_id, message) => {
    if (message.role === 'assistant') throw new Error('Database unavailable');
    return {};
  });
  await advisorService.chat('user', request, response as unknown as Response);
  expect(response.events.some((event) => event.type === 'error')).toBe(true);
  expect(response.events.some((event) => event.type === 'metadata')).toBe(
    false
  );
  expect(response.writableEnded).toBe(true);
});
