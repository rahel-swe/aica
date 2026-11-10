import { beforeEach, expect, mock, test } from 'bun:test';
import { readAdvisorStream } from '../src/lib/read-advisor-stream';
import { useAdvisorStore } from '../src/stores/advisor-store';

beforeEach(() => {
  useAdvisorStore.getState().cancelStream();
  useAdvisorStore.setState(useAdvisorStore.getInitialState(), true);
});

test('rejects invalid event fields before they reach the UI', async () => {
  const callbacks = handlers();
  await expect(
    readAdvisorStream(
      stream('data: {"type":"delta","content":{"unexpected":true}}\n\n'),
      callbacks
    )
  ).rejects.toThrow('Invalid Advisor stream event');
  expect(callbacks.onDelta).not.toHaveBeenCalled();
});

test('rejects an oversized unfinished event', async () => {
  await expect(
    readAdvisorStream(
      stream('data: ' + 'x'.repeat(256 * 1024), 300000),
      handlers()
    )
  ).rejects.toThrow('size limit');
});

test('replacing a request aborts its queued events before they can affect the new chat', async () => {
  const store = useAdvisorStore.getState();
  const first = store.beginStream();
  const callbacks = handlers();
  const pending = readAdvisorStream(
    stream('data: {"type":"delta","content":"Old reply"}\n\n'),
    callbacks,
    first.signal
  );
  const next = store.beginStream();
  await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
  expect(first.signal.aborted).toBe(true);
  expect(next.signal.aborted).toBe(false);
  expect(callbacks.onDelta).not.toHaveBeenCalled();
  expect(useAdvisorStore.getState().streaming?.content).toBe('');
});

test('changing conversations cancels the active request', () => {
  const store = useAdvisorStore.getState();
  const first = store.beginStream();
  store.startNewConversation();
  expect(first.signal.aborted).toBe(true);
  expect(useAdvisorStore.getState().streaming).toBeNull();
  const next = store.beginStream();
  store.loadConversation('another-chat', 'Another chat', []);
  expect(next.signal.aborted).toBe(true);
  expect(useAdvisorStore.getState().streaming).toBeNull();
});

function handlers() {
  return {
    onStart: mock(() => {}),
    onSearching: mock(() => {}),
    onDelta: mock(() => {}),
    onResources: mock(() => {}),
    onMetadata: mock(() => {}),
    onDone: mock(() => {}),
    onError: mock(() => {}),
  };
}

function stream(text: string, chunkSize = 7) {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (let index = 0; index < bytes.length; index += chunkSize)
        controller.enqueue(bytes.slice(index, index + chunkSize));
      controller.close();
    },
  });
}

test('reads fragmented UTF-8 events with CRLF line endings', async () => {
  const callbacks = handlers();
  await readAdvisorStream(
    stream(
      'data: {"type":"start","conversationId":"conv","messageId":"msg"}\r\n\r\n' +
        'data: {"type":"delta","content":"سلام"}\r\n\r\n' +
        'data: {"type":"done"}\r\n\r\n'
    ),
    callbacks
  );
  expect(callbacks.onStart).toHaveBeenCalledWith('conv', 'msg');
  expect(callbacks.onDelta).toHaveBeenCalledWith('سلام');
  expect(callbacks.onDone).toHaveBeenCalledTimes(1);
});

test('keeps a server error visible and unlocks the first chat request', async () => {
  const store = useAdvisorStore.getState();
  store.appendUserMessage('Help me choose a career.');
  store.beginStream();
  const callbacks = handlers();
  await readAdvisorStream(
    stream(
      'data: {"type":"error","message":"Advisor unavailable"}\n\ndata: {"type":"done"}\n\n'
    ),
    { ...callbacks, onError: (error) => store.failStream(error) }
  );
  expect(useAdvisorStore.getState().streaming).toBeNull();
  expect(useAdvisorStore.getState().error).toBe('Advisor unavailable');
  expect(useAdvisorStore.getState().messages).toHaveLength(1);
  expect(callbacks.onDone).not.toHaveBeenCalled();
  store.beginStream();
  expect(useAdvisorStore.getState().error).toBeNull();
});

test('reports a stream that closes before done instead of leaving it pending', async () => {
  const callbacks = handlers();
  await expect(
    readAdvisorStream(
      stream('data: {"type":"delta","content":"Partial"}\n\n'),
      callbacks
    )
  ).rejects.toThrow('Advisor connection closed before completion.');
  expect(callbacks.onDone).not.toHaveBeenCalled();
});

test('preserves partial answer text when the connection fails', () => {
  const store = useAdvisorStore.getState();
  store.beginStream();
  store.attachStreamMeta('conv', 'msg');
  store.pushDelta('Partial answer');
  store.failStream('Connection lost');
  expect(useAdvisorStore.getState().streaming).toBeNull();
  expect(useAdvisorStore.getState().messages[0]?.content).toBe(
    'Partial answer'
  );
  expect(useAdvisorStore.getState().error).toBe('Connection lost');
});
