import type OpenAI from 'openai';
import type { AdvisorResponseMode } from '@contracts/shared/types/advisor-types';

// ─── Tool definitions ──────────────────────────────────────────────────────────
// These are the only two categories of tools:
//   1. web_search  — executed by the service (calls Tavily), runs in Phase 1
//   2. metadata    — declared to the LLM, collected from stream, never executed
//
// The LLM decides when to call metadata tools. We decide when to allow search.

export const WEB_SEARCH_TOOL: OpenAI.ChatCompletionTool = {
  type: 'function',
  function: {
    name: 'web_search',
    description: `Search the web for current, external information. Use this ONLY when the user's question requires:
- Local licensing, certification, or legal requirements (these vary by country/region)
- Current job market data or salary ranges
- Specific institution programs, admission requirements, or deadlines
- Recent industry news or regulatory changes
- Any fact that changes over time or by location.

Do NOT search for information already present in the user's profile, pathway, or roadmap context.
Keep your query specific and targeted (3–8 words).`,
    parameters: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description:
            'Specific search query, 3–8 words. Target the exact information needed.',
        },
      },
      required: ['query'],
    },
  },
};

const SURFACE_ACTIONS_TOOL: OpenAI.ChatCompletionTool = {
  type: 'function',
  function: {
    name: 'surface_actions',
    description:
      'Surface 1–5 concrete next steps for the user. Call this when your answer implies specific things they should do. Not every answer needs actions — omit if nothing concrete applies.',
    parameters: {
      type: 'object' as const,
      properties: {
        actions: {
          type: 'array',
          items: { type: 'string' },
          maxItems: 5,
          description: 'Specific, actionable steps — not generic advice.',
        },
      },
      required: ['actions'],
    },
  },
};

const SURFACE_FOLLOW_UPS_TOOL: OpenAI.ChatCompletionTool = {
  type: 'function',
  function: {
    name: 'surface_follow_ups',
    description:
      'Offer 1–3 follow-up questions the user might want to ask next. Call this when your answer naturally leads somewhere deeper.',
    parameters: {
      type: 'object' as const,
      properties: {
        questions: {
          type: 'array',
          items: { type: 'string' },
          maxItems: 3,
        },
      },
      required: ['questions'],
    },
  },
};

const FLAG_CAUTION_TOOL: OpenAI.ChatCompletionTool = {
  type: 'function',
  function: {
    name: 'flag_caution',
    description:
      'Flag a genuine concern: unverifiable local requirements, missing profile data, licensing specifics that vary by region. Use ONLY for real warnings, not general caveats.',
    parameters: {
      type: 'object' as const,
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};

// ─── Mode → tool configuration ────────────────────────────────────────────────
//
// guided: full feature set — actions + follow-ups + cautions + search
// focused: minimal chrome — direct answers, search when needed, real cautions only
// deep: execution-oriented — actions + search, no follow-up noise

export const METADATA_TOOLS_BY_MODE: Record<
  AdvisorResponseMode,
  OpenAI.ChatCompletionTool[]
> = {
  guided: [SURFACE_ACTIONS_TOOL, SURFACE_FOLLOW_UPS_TOOL, FLAG_CAUTION_TOOL],
  focused: [FLAG_CAUTION_TOOL],
  deep: [SURFACE_ACTIONS_TOOL, FLAG_CAUTION_TOOL],
};

// Phase 1 tools (search detection only)
export const SEARCH_TOOLS: OpenAI.ChatCompletionTool[] = [WEB_SEARCH_TOOL];
