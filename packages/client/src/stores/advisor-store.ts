import { create } from 'zustand';
import type {
  AdvisorChatMessage,
  AdvisorRequestMode,
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
  messageId: string | null;
  requestMode: AdvisorRequestMode; // ← base on action selected (new, edit, retry)
  responseMode: AdvisorResponseMode; // ← user-selected, persisted across messages

  startNewConversation: () => void;
  loadConversation: (
    id: string,
    title: string,
    messages: AdvisorFirtsMessage[]
  ) => void;
  appendUserMessage: (content: string) => void;
  setRequestMode: (mode: AdvisorRequestMode) => void;
  setResponseMode: (mode: AdvisorResponseMode) => void;

  setMessageId: (id: string) => void;

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

// ─── Store

export const useAdvisorStore = create<AdvisorStoreState>((set, get) => ({
  activeConversationId: null,
  activeConversationTitle: null,
  messages: [],
  streaming: null,
  requestMode: 'new',
  responseMode: 'focused',
  streamingConversationIds: [],
  messageId: null,

  startNewConversation: () =>
    set({
      activeConversationId: null,
      activeConversationTitle: null,
      messages: [],
    }),

  loadConversation: (id, title, messages) =>
    set({
      activeConversationId: id,
      activeConversationTitle: title,
      messages: messages.map((m) => ({
        ...m,
        createdAt: new Date(m.createdAt),
      })),
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

  setRequestMode: (mode) => set({ requestMode: mode }),
  setResponseMode: (mode) => set({ responseMode: mode }),
  setMessageId: (id) => set({ messageId: id }),

  beginStream: () =>
    set(() => ({
      streaming: {
        content: '',
        searchingQuery: null,
        resources: [],
        metadata: null,
        error: null,
        conversationId: null,
        messageId: null,
      },
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
    const { streaming, messages, messageId } = get();

    if (!streaming || !streaming.content) {
      set({ streaming: null });

      return;
    }

    if (!streaming.messageId || !streaming.conversationId) {
      console.error(
        'commitStream: missing IDs - backend "start" event never arrived'
      );
    }

    const assistantMessage: AdvisorFirtsMessage = {
      id: streaming.messageId ?? messageId ?? crypto.randomUUID(),
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
