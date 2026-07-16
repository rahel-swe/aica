import { create } from 'zustand';
import type {
  AdvisorChatMessage,
  AdvisorResponseMode,
  SearchResult,
} from '@contracts/shared/types/advisor-types';
import type { AdvisorStreamMetadata } from '@/services/advisor-service';

// ─── Types

export type StreamingState = {
  content: string;
  messageId: string | null;
  conversationId: string | null;
  searchingQuery: string | null; // ← set while Tavily search is running
  resources: SearchResult[]; // ← populated after search completes
  metadata: AdvisorStreamMetadata | null;
  error: string | null;
};

type AdvisorFirtsMessage = Omit<AdvisorChatMessage, 'id'> &
  Partial<Pick<AdvisorChatMessage, 'id'>>;

type AdvisorStoreState = {
  activeConversationId: string | null;
  activeConversationTitle: string | null;
  messages: AdvisorFirtsMessage[];
  streaming: StreamingState | null;
  streamingConversationIds: string[];
  responseMode: AdvisorResponseMode; // ← user-selected, persisted across messages

  setStreamingConversationIds: (id: string) => void;
  startNewConversation: () => void;
  loadConversation: (
    id: string,
    title: string,
    messages: AdvisorFirtsMessage[]
  ) => void;
  appendUserMessage: (content: string) => void;
  setResponseMode: (mode: AdvisorResponseMode) => void;
  // Stream state machine
  beginStream: () => void;
  attachStreamMeta: (conversationId: string, messageId: string) => void;

  setSearchingQuery: (query: string) => void;
  pushDelta: (delta: string) => void;
  applyResources: (items: SearchResult[]) => void;
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
  responseMode: 'focused',
  streamingConversationIds: [],

  startNewConversation: () =>
    set({
      activeConversationId: null,
      activeConversationTitle: null,
      messages: [],
    }),

  setStreamingConversationIds: (id) => {
    set((state) => ({
      streamingConversationIds: [...state.streamingConversationIds, id],
    }));
  },

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
        } satisfies AdvisorFirtsMessage,
      ],
    })),

  setResponseMode: (mode) => set({ responseMode: mode }),

  beginStream: () =>
    set((state) => ({
      streaming: {
        content: '',
        searchingQuery: null,
        resources: [],
        metadata: null,
        error: null,
        conversationId: null,
        messageId: null,
      },
      streamingConversationIds: [
        ...state.streamingConversationIds,
        state.activeConversationId!,
      ],
    })),

  attachStreamMeta: (conversationId, messageId) =>
    set((state) => ({
      activeConversationId: state.activeConversationId ?? conversationId,
      streaming: state.streaming
        ? { ...state.streaming, conversationId, messageId }
        : state.streaming,
    })),

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

    if (!streaming.messageId || !streaming.conversationId) {
      console.log(
        'commitStream: missing IDs - backend "start" event never arrived'
      );
    }

    const assistantMessage: AdvisorFirtsMessage = {
      id: streaming.messageId ?? crypto.randomUUID(),
      role: 'assistant',
      content: streaming.content,
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
