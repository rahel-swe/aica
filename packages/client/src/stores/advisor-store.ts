import { create } from 'zustand';
import type {
  AdvisorChatMessage,
  AdvisorIntent,
  AdvisorContextSource,
  AdvisorResponseMode,
  SearchResult,
} from '@contracts/shared/types/advisor-types';
import type { AdvisorStreamMetadata } from '@/services/advisor-service';

// ─── Types ─────────────────────────────────────────────────────────────────────

type StreamingState = {
  content: string;
  searchingQuery: string | null; // ← set while Tavily search is running
  resources: SearchResult[]; // ← populated after search completes
  metadata: AdvisorStreamMetadata | null;
  error: string | null;
};

type AdvisorStoreState = {
  activeConversationId: string | null;
  activeConversationTitle: string | null;
  messages: AdvisorChatMessage[];
  streaming: StreamingState | null;
  responseMode: AdvisorResponseMode; // ← user-selected, persisted across messages

  startNewConversation: () => void;
  loadConversation: (
    id: string,
    title: string,
    messages: AdvisorChatMessage[]
  ) => void;
  appendUserMessage: (content: string) => void;
  setResponseMode: (mode: AdvisorResponseMode) => void;

  // Stream state machine
  beginStream: () => void;
  confirmConversationId: (id: string) => void;
  setSearchingQuery: (query: string) => void; // ← NEW: onSearching handler
  pushDelta: (delta: string) => void;
  applyResources: (items: SearchResult[]) => void; // ← NEW: onResources handler
  applyMetadata: (meta: AdvisorStreamMetadata) => void;
  commitStream: () => void;
  failStream: (error: string) => void;
  cancelStream: () => void;
};

// ─── Store ─────────────────────────────────────────────────────────────────────

export const useAdvisorStore = create<AdvisorStoreState>((set, get) => ({
  activeConversationId: null,
  activeConversationTitle: null,
  messages: [],
  streaming: null,
  responseMode: 'guided',

  startNewConversation: () =>
    set({
      activeConversationId: null,
      activeConversationTitle: null,
      messages: [],
      streaming: null,
    }),

  loadConversation: (id, title, messages) =>
    set({
      activeConversationId: id,
      activeConversationTitle: title,
      messages: messages.map((m) => ({
        ...m,
        createdAt: new Date(m.createdAt),
      })),
      streaming: null,
    }),

  appendUserMessage: (content) =>
    set((s) => ({
      messages: [
        ...s.messages,
        {
          role: 'user',
          content,
          actions: [],
          followUps: [],
          cautions: [],
          contextUsed: [],
          resources: [],
          createdAt: new Date(),
        } satisfies AdvisorChatMessage,
      ],
    })),

  setResponseMode: (mode) => set({ responseMode: mode }),

  beginStream: () =>
    set({
      streaming: {
        content: '',
        searchingQuery: null,
        resources: [],
        metadata: null,
        error: null,
      },
    }),

  confirmConversationId: (id) => set({ activeConversationId: id }),

  setSearchingQuery: (query) =>
    set((s) => ({
      streaming: s.streaming
        ? { ...s.streaming, searchingQuery: query }
        : s.streaming,
    })),

  pushDelta: (delta) =>
    set((s) => ({
      streaming: s.streaming
        ? {
            ...s.streaming,
            content: s.streaming.content + delta,
            searchingQuery: null, // search is done once text starts arriving
          }
        : s.streaming,
    })),

  applyResources: (items) =>
    set((s) => ({
      streaming: s.streaming
        ? { ...s.streaming, resources: items }
        : s.streaming,
    })),

  applyMetadata: (meta) =>
    set((s) => ({
      streaming: s.streaming ? { ...s.streaming, metadata: meta } : s.streaming,
    })),

  commitStream: () => {
    const { streaming, messages } = get();
    if (!streaming || !streaming.content) {
      set({ streaming: null });
      return;
    }

    const assistantMessage: AdvisorChatMessage = {
      role: 'assistant',
      content: streaming.content,
      intent: streaming.metadata?.intent,
      actions: streaming.metadata?.actions ?? [],
      followUps: streaming.metadata?.followUps ?? [],
      cautions: streaming.metadata?.cautions ?? [],
      contextUsed: streaming.metadata?.contextUsed ?? [],
      resources: streaming.resources,
      createdAt: new Date(),
    };

    set({ messages: [...messages, assistantMessage], streaming: null });
  },

  failStream: (error) =>
    set((s) => ({
      streaming: s.streaming ? { ...s.streaming, error } : null,
    })),

  cancelStream: () => set({ streaming: null }),
}));
