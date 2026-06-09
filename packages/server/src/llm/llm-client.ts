/**
 * LLM client using the OpenAI SDK.
 *
 * Currently: HuggingFace Inference API (OpenAI-compatible endpoint)
 * Recommended model: Qwen/Qwen2.5-72B-Instruct (best HF tool-use support)
 *
 * To switch to OpenAI later — only change .env:
 *   Remove  HF_TOKEN
 *   Add     OPENAI_API_KEY=sk-...
 *   Set     LLM_MODEL=gpt-4o-mini
 *   The client detects which provider to use automatically.
 */

import OpenAI from 'openai';
import { tavilySearch, toSearchContext } from './tavily-client';
import { SEARCH_TOOLS, METADATA_TOOLS_BY_MODE } from './advisor-tools';
import type {
  AdvisorToolCall,
  AdvisorResponseMode,
  SearchResult,
} from '@contracts/shared/types/advisor-types';

// ─── Client bootstrap ──────────────────────────────────────────────────────────

export const openaiClient = new OpenAI({
  apiKey: process.env.HF_TOKEN,
  baseURL: 'https://router.huggingface.co/v1',
});

export const LLM_MODEL = 'deepseek-ai/DeepSeek-V4-Pro:fireworks-ai';
// ('Qwen/Qwen2.5-72B-Instruct:novita');
//  'openai/gpt-oss-20b:together'

// ─── Types ─────────────────────────────────────────────────────────────────────

type LLMMessage = { role: 'user' | 'assistant'; content: string };

type CompletionCallbacks = {
  onSearching: (query: string) => void; // emitted before Tavily call
  onDelta: (text: string) => void; // text streaming chunks
};

export type AdvisorCompletionResult = {
  content: string;
  toolCalls: AdvisorToolCall[];
  searchResults: SearchResult[];
};

// ─── Two-phase advisor completion ─────────────────────────────────────────────
//
// Phase 1 (non-streaming, fast, ~100 token budget):
//   Ask the LLM: "do you need to search?" with only web_search tool available.
//   If yes → execute Tavily → inject result → proceed to Phase 2.
//   If no  → skip directly to Phase 2.
//
// Phase 2 (streaming, full response):
//   LLM generates the actual answer with search context in messages.
//   Metadata tools (surface_actions etc.) are collected from the stream.
//
// Why two phases instead of one streaming pass?
//   Tool call arguments arrive at stream end, so you'd wait for the full
//   response before executing a search — terrible UX. Splitting phases lets
//   us show "Searching..." to the user before text generation starts.

export async function runAdvisorCompletion(
  systemPrompt: string,
  history: LLMMessage[],
  responseMode: AdvisorResponseMode,
  callbacks: CompletionCallbacks
): Promise<AdvisorCompletionResult> {
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...history,
  ];

  const searchResults: SearchResult[] = [];

  // ── Phase 1: Search detection ────────────────────────────────────────────────

  const searchEnabled = !!process.env.TAVILY_API_KEY;

  if (searchEnabled) {
    try {
      const detectionResponse = await openaiClient.chat.completions.create({
        model: LLM_MODEL,
        messages,
        tools: SEARCH_TOOLS,
        tool_choice: 'auto',
        max_tokens: 200, // intentionally tiny — just detect the tool call, nothing more
      });

      const detectionMessage = detectionResponse.choices[0]?.message;

      if (detectionMessage?.tool_calls?.length) {
        // Append the assistant's tool_call decision to the conversation
        messages.push(detectionMessage);

        for (const tc of detectionMessage.tool_calls) {
          if (tc.function.name !== 'web_search') continue;

          let query = '';
          try {
            query = JSON.parse(tc.function.arguments).query ?? '';
          } catch {
            continue;
          }

          callbacks.onSearching(query);

          const raw = await tavilySearch(query, { maxResults: 3 });
          searchResults.push(...raw);

          // Inject results as tool response — LLM will use this in Phase 2
          messages.push({
            role: 'tool',
            tool_call_id: tc.id,
            content: JSON.stringify(toSearchContext(raw)),
          });
        }
      }
    } catch (err) {
      // Search failure is non-fatal — continue without results
      console.error('[LLMClient] Phase 1 search detection failed:', err);
    }
  }

  // ── Phase 2: Streaming response ──────────────────────────────────────────────

  const metadataTools = METADATA_TOOLS_BY_MODE[responseMode];

  const stream = await openaiClient.chat.completions.create({
    model: LLM_MODEL,
    messages,
    tools: metadataTools.length > 0 ? metadataTools : undefined,
    tool_choice: metadataTools.length > 0 ? 'auto' : undefined,
    max_tokens: 1024,
    stream: true,
  });

  let fullContent = '';

  // Accumulate tool call chunks — the SDK streams arguments incrementally
  // Each chunk has `delta.tool_calls[N]` with partial `function.arguments`
  const tcAccumulator: Record<
    number,
    { id: string; name: string; arguments: string }
  > = {};

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta;
    if (delta?.content) {
      fullContent += delta.content;
      callbacks.onDelta(delta.content);
    }

    for (const tc of delta?.tool_calls ?? []) {
      if (!tcAccumulator[tc.index]) {
        tcAccumulator[tc.index] = { id: '', name: '', arguments: '' };
      }
      if (tc.id) tcAccumulator[tc.index].id = tc.id;
      if (tc.function?.name) tcAccumulator[tc.index].name = tc.function.name;
      if (tc.function?.arguments)
        tcAccumulator[tc.index].arguments += tc.function.arguments;
    }
  }

  // Parse accumulated tool calls — wrap in try/catch, malformed JSON is possible
  const toolCalls = Object.values(tcAccumulator)
    .filter((tc) => tc.name)
    .flatMap((tc): AdvisorToolCall[] => {
      try {
        const input = JSON.parse(tc.arguments || '{}');
        return [{ name: tc.name as AdvisorToolCall['name'], input }];
      } catch {
        return [];
      }
    });

  return { content: fullContent, toolCalls, searchResults };
}

// ─── add below runAdvisorCompletion ───────────────────────────────────────────
// Used by services that need a single, non-streaming completion with no tools.
// Same client and model — no separate setup needed.
// Optional: pass a cheaper model override for non-critical enrichment.

export async function createTextCompletion(
  prompt: string,
  options: { maxTokens?: number; model?: string } = {}
) {
  try {
    const response = await openaiClient.chat.completions.create({
      model: LLM_MODEL,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0]?.message?.content;
  } catch (error) {
    console.log(error);
  }
}
