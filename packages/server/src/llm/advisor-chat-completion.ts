import type {
  AdvisorToolCall,
  SearchResult,
  AdvisorResponseMode,
} from '@contracts/shared/types/advisor-types';
import type OpenAI from 'openai';
import { toSearchContext } from '../utils/to-search-context';
import { SEARCH_TOOLS, METADATA_TOOLS_BY_MODE } from './advisor-tools';
import { type LLMMessage, openaiClient, LLM_MODEL } from './llm-client';
import { tavilySearch } from './tavily-client';

type CompletionCallbacks = {
  onSearching: (query: string) => void; // emitted before Tavily call
  onDelta: (text: string) => void; // text streaming chunks
};

export type AdvisorCompletionResult = {
  content: string;
  toolCalls: AdvisorToolCall[];
  searchResults: SearchResult[];
};

type ToolCall = {
  function: {
    name: string;
    arguments: string;
  };
  id: string;
  type: 'function' | 'custome';
};

//
// Phase 1 (non-streaming, fast, ~100 token budget):
//   Ask the LLM: "do you need to search?" with only web_search tool available.
//   If yes → execute Tavily → inject result → proceed to Phase 2.
//   If no  → skip directly to Phase 2.
//
// Phase 2 (streaming, full response):
//   LLM generates the actual answer with search context in messages.
//   Metadata tools (surface_actions etc.) are collected from the stream.

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
        max_tokens: 200,
      });

      const detectionMessage = detectionResponse.choices[0]?.message;

      if (detectionMessage?.tool_calls?.length) {
        // Append the assistant's tool_call decision to the conversation
        messages.push(detectionMessage);

        const toolCalls = detectionMessage?.tool_calls as ToolCall[];

        for (const toolCall of toolCalls) {
          if (toolCall.function.name !== 'web_search') continue;

          let query = '';

          try {
            query = JSON.parse(toolCall.function.arguments).query ?? '';
          } catch {
            continue;
          }

          callbacks.onSearching(query);

          const raw = await tavilySearch(query, { maxResults: 3 });
          searchResults.push(...raw);

          // Inject results as tool response — LLM will use this in Phase 2
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(toSearchContext(raw)),
          });
        }
      }
    } catch (err) {
      // Search failure is non-fatal — our chat should continue without results
      console.error('[LLMClient] Phase 1 search detection failed:', err);
    }
  }

  // ── Phase 2: Streaming response

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
      if (!tcAccumulator[tc.index])
        tcAccumulator[tc.index] = { id: '', name: '', arguments: '' };

      if (tc.id) tcAccumulator[tc?.index]!.id = tc.id;

      if (tc.function?.name) tcAccumulator[tc?.index]!.name = tc.function.name;

      if (tc.function?.arguments)
        tcAccumulator[tc?.index]!.arguments += tc.function.arguments;
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
