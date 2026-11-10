import { afterAll, afterEach, beforeEach, expect, spyOn, test } from 'bun:test';

process.env.CLOUDFLARE_ACCOUNT_ID ||= 'test-account';
process.env.CLOUDFLARE_API_TOKEN ||= 'test-token';
const { openaiClient } = await import('../src/llm/llm-client');
const { runAdvisorCompletion } =
  await import('../src/llm/advisor-chat-completion');
const search = await import('../src/llm/tavily-client');
const originalSearchKey = process.env.TAVILY_API_KEY;
const create = spyOn(openaiClient.chat.completions, 'create');
const tavilySearch = spyOn(search, 'tavilySearch');
const logError = spyOn(console, 'error');

afterAll(() => {
  create.mockRestore();
  tavilySearch.mockRestore();
  logError.mockRestore();
});

async function* chunks(...deltas: object[]) {
  for (const delta of deltas) yield { choices: [{ delta }] };
}

function metadata(calls: object[] = [], content: string | null = null) {
  return {
    choices: [{ message: { role: 'assistant', content, tool_calls: calls } }],
  };
}

function tool(name: string, input: unknown) {
  return {
    type: 'function',
    id: name,
    function: { name, arguments: JSON.stringify(input) },
  };
}

beforeEach(() => {
  delete process.env.TAVILY_API_KEY;
  create.mockReset();
  tavilySearch.mockReset();
  tavilySearch.mockResolvedValue([]);
  logError.mockImplementation(() => {});
});

afterEach(() => {
  if (originalSearchKey === undefined) delete process.env.TAVILY_API_KEY;
  else process.env.TAVILY_API_KEY = originalSearchKey;
});

test('streams the written reply separately from validated display metadata', async () => {
  create.mockResolvedValueOnce(
    chunks({ content: 'Review ' }, { content: 'your interests.' })
  );
  create.mockResolvedValueOnce(
    metadata([tool('surface_actions', { actions: ['Review your interests'] })])
  );
  let displayedText = '';
  const result = await runAdvisorCompletion(
    'Career guidance',
    [{ role: 'user', content: 'What is my first step?' }],
    'guided',
    {
      onSearching: () => {},
      onDelta: (text) => (displayedText += text),
    }
  );
  expect(displayedText).toBe('Review your interests.');
  expect(result.content).toBe(displayedText);
  expect(result.toolCalls).toEqual([
    { name: 'surface_actions', input: { actions: ['Review your interests'] } },
  ]);
  expect(create.mock.calls[0]![0].tools).toBeUndefined();
  expect(create.mock.calls[0]![0].stream).toBe(true);
  expect(create.mock.calls[1]![0].stream).toBeUndefined();
});

test('does not show the user-reported function JSON, including when split across deltas', async () => {
  const raw =
    '{"type": "function", "name": "flag_caution", "parameters": {"message": "Please verify the local requirements for your pathway"}}';
  create.mockResolvedValueOnce(
    chunks({ content: raw.slice(0, 31) }, { content: raw.slice(31) })
  );
  create.mockResolvedValueOnce(
    chunks({ content: 'Hello! How can I help you today?' })
  );
  create.mockResolvedValueOnce(metadata([], raw));
  let displayedText = '';
  const result = await runAdvisorCompletion(
    'Career guidance',
    [{ role: 'user', content: 'Hello' }],
    'focused',
    {
      onSearching: () => {},
      onDelta: (text) => (displayedText += text),
    }
  );
  expect(displayedText).toBe('Hello! How can I help you today?');
  expect(result.content).toBe(displayedText);
  expect(result.toolCalls).toEqual([]);
  expect(displayedText).not.toContain('flag_caution');
  expect(create).toHaveBeenCalledTimes(3);
});

test('ignores malformed metadata and tools unavailable in the selected mode', async () => {
  create.mockResolvedValueOnce(chunks({ content: 'Hello! How can I help?' }));
  create.mockResolvedValueOnce(
    metadata([
      tool('surface_actions', { actions: ['Do something'] }),
      tool('flag_caution', { message: ['invalid'] }),
      { type: 'function', function: { name: 'flag_caution', arguments: '{' } },
    ])
  );
  const result = await runAdvisorCompletion('Career guidance', [], 'focused', {
    onSearching: () => {},
    onDelta: () => {},
  });
  expect(result.toolCalls).toEqual([]);
});

test('keeps a successful answer when optional metadata fails', async () => {
  create.mockResolvedValueOnce(
    chunks({ content: 'Start with your interests.' })
  );
  create.mockRejectedValueOnce(new Error('Metadata unavailable'));
  const result = await runAdvisorCompletion('Career guidance', [], 'focused', {
    onSearching: () => {},
    onDelta: () => {},
  });
  expect(result.content).toBe('Start with your interests.');
  expect(result.toolCalls).toEqual([]);
});

test('rejects an invented caution that is absent from a greeting answer', async () => {
  create.mockResolvedValueOnce(
    chunks({ content: 'Hello! How can I help you today?' })
  );
  create.mockResolvedValueOnce(
    metadata([
      tool('flag_caution', {
        message: 'Please verify the local requirements for your pathway',
      }),
    ])
  );
  const result = await runAdvisorCompletion(
    'Career guidance',
    [{ role: 'user', content: 'Hello' }],
    'focused',
    { onSearching: () => {}, onDelta: () => {} }
  );
  expect(result.toolCalls).toEqual([]);
});

test('does not feed previously leaked assistant commands back into generation', async () => {
  create.mockResolvedValueOnce(chunks({ content: 'Hello! How can I help?' }));
  create.mockResolvedValueOnce(metadata());
  await runAdvisorCompletion(
    'Career guidance',
    [
      {
        role: 'assistant',
        content:
          '{"type":"function","name":"flag_caution","parameters":{"message":"Verify requirements"}}',
      },
      { role: 'user', content: 'Hello' },
    ],
    'focused',
    { onSearching: () => {}, onDelta: () => {} }
  );
  expect(create.mock.calls[0]![0].messages).not.toContainEqual(
    expect.objectContaining({ role: 'assistant' })
  );
});

test('passes retrieved search sources to the tool-free answer request', async () => {
  process.env.TAVILY_API_KEY = 'test-search';
  create.mockResolvedValueOnce(
    metadata([
      tool('web_search', { query: 'university application deadlines' }),
    ])
  );
  tavilySearch.mockResolvedValueOnce([
    {
      title: 'Admissions',
      url: 'https://example.com/admissions',
      content: 'Applications close in June.',
      source: 'example.com',
      score: 1,
      favicon: '',
    },
  ]);
  create.mockResolvedValueOnce(
    chunks({
      content: 'According to the admissions page, applications close in June.',
    })
  );
  create.mockResolvedValueOnce(metadata());
  const queries: string[] = [];
  const result = await runAdvisorCompletion('Career guidance', [], 'focused', {
    onSearching: (query) => queries.push(query),
    onDelta: () => {},
  });
  expect(queries).toEqual(['university application deadlines']);
  expect(result.searchResults).toHaveLength(1);
  const request = create.mock.calls[1]![0];
  expect(request.tools).toBeUndefined();
  expect(JSON.stringify(request.messages)).toContain(
    'https://example.com/admissions'
  );
});

test('rejects repeated empty answers instead of reporting a successful chat', async () => {
  create.mockResolvedValueOnce(chunks({}));
  create.mockResolvedValueOnce(chunks({}));
  await expect(
    runAdvisorCompletion('Career guidance', [], 'focused', {
      onSearching: () => {},
      onDelta: () => {},
    })
  ).rejects.toThrow('Advisor returned no answer text.');
  expect(create).toHaveBeenCalledTimes(2);
});

test('does not start a provider request after cancellation', async () => {
  const controller = new AbortController();
  controller.abort();
  await expect(
    runAdvisorCompletion(
      'Career guidance',
      [],
      'focused',
      {
        onSearching: () => {},
        onDelta: () => {},
      },
      { signal: controller.signal }
    )
  ).rejects.toMatchObject({ name: 'AbortError' });
  expect(create).not.toHaveBeenCalled();
});

test('stops streaming and skips metadata when the client cancels', async () => {
  const controller = new AbortController();
  create.mockResolvedValueOnce(
    chunks({ content: 'First sentence.' }, { content: 'Must not be sent.' })
  );
  let displayed = '';
  await expect(
    runAdvisorCompletion(
      'Career guidance',
      [],
      'focused',
      {
        onSearching: () => {},
        onDelta: (text) => {
          displayed += text;
          controller.abort();
        },
      },
      { signal: controller.signal }
    )
  ).rejects.toMatchObject({ name: 'AbortError' });
  expect(displayed).toBe('First sentence.');
  expect(create).toHaveBeenCalledTimes(1);
  expect(create.mock.calls[0]![1]?.signal).toBeInstanceOf(AbortSignal);
});

test('reports token-limit interruptions instead of accepting a partial answer', async () => {
  async function* truncated() {
    yield { choices: [{ delta: { content: 'Partial' } }] };
    yield { choices: [{ delta: {}, finish_reason: 'length' }] };
  }
  create.mockResolvedValueOnce(truncated());
  await expect(
    runAdvisorCompletion('Career guidance', [], 'focused', {
      onSearching: () => {},
      onDelta: () => {},
    })
  ).rejects.toThrow('output limit');
  expect(create).toHaveBeenCalledTimes(1);
});
