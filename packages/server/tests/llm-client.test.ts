import { afterAll, beforeEach, expect, spyOn, test } from 'bun:test';

process.env.CLOUDFLARE_ACCOUNT_ID ||= 'test-account';
process.env.CLOUDFLARE_API_TOKEN ||= 'test-token';
const { openaiClient, createTextCompletion, LLM_MODEL } =
  await import('../src/llm/llm-client');
const create = spyOn(openaiClient.chat.completions, 'create');
beforeEach(() => create.mockReset());
afterAll(() => create.mockRestore());

test('sends the requested output budget to the Cloudflare model', async () => {
  create.mockResolvedValueOnce({
    choices: [
      {
        finish_reason: 'stop',
        message: { content: 'A complete explanation.' },
      },
    ],
  });
  expect(
    await createTextCompletion('Explain this pathway.', { maxTokens: 300 })
  ).toBe('A complete explanation.');
  expect(create.mock.calls[0]![0]).toMatchObject({
    model: LLM_MODEL,
    max_tokens: 300,
  });
});

test('propagates provider failures to the caller so retry logic can run', async () => {
  const failure = new Error('Provider unavailable');
  create.mockRejectedValueOnce(failure);
  await expect(createTextCompletion('Explain this pathway.')).rejects.toBe(
    failure
  );
});

test('does not accept empty or truncated output as a successful completion', async () => {
  create.mockResolvedValueOnce({
    choices: [{ finish_reason: 'stop', message: { content: '  ' } }],
  });
  await expect(createTextCompletion('Explain this pathway.')).rejects.toThrow(
    'empty response'
  );
  create.mockResolvedValueOnce({
    choices: [{ finish_reason: 'length', message: { content: '{"steps":[' } }],
  });
  await expect(createTextCompletion('Generate a roadmap.')).rejects.toThrow(
    'output limit'
  );
});
