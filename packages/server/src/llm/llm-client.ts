import OpenAI from 'openai';

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();

if (!accountId || !apiToken) {
  throw new Error(
    'CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required for Workers AI.'
  );
}

export const openaiClient = new OpenAI({
  apiKey: apiToken,
  baseURL: `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/v1`,
  timeout: 60000,
  maxRetries: 0,
});

export const LLM_MODEL =
  process.env.CLOUDFLARE_AI_MODEL?.trim() ||
  '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

export type LLMMessage = { role: 'user' | 'assistant'; content: string };

export async function createTextCompletion(
  prompt: string,
  options: { maxTokens?: number; model?: string } = {}
) {
  const response = await openaiClient.chat.completions.create({
    model: options.model || LLM_MODEL,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: options.maxTokens ?? 4096,
  });
  const choice = response.choices[0];
  if (choice?.finish_reason === 'length')
    throw new Error('AI response exceeded its output limit.');
  const content = choice?.message?.content;
  if (!content?.trim()) throw new Error('AI returned an empty response.');
  return content;
}
