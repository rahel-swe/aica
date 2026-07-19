import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  listConversations,
  getConversation,
  deleteConversation,
} from '@/services/advisor-service';
import { useAdvisorStore } from '@/stores/advisor-store';

// ─── Query keys ────────────────────────────────────────────────────────────────

export const advisorKeys = {
  all: ['advisor'] as const,
  conversations: () => [...advisorKeys.all, 'conversations'] as const,
  conversation: (id: string) => [...advisorKeys.conversations(), id] as const,
};

// ─── Conversation list ─────────────────────────────────────────────────────────

export const useConversationsQuery = () =>
  useQuery({
    queryKey: advisorKeys.conversations(),
    queryFn: listConversations,
    staleTime: 30_000,
  });

// ─── Load a single conversation into the store ─────────────────────────────────
// Not a useQuery — this is imperative (triggered by sidebar click).
// Returns a loading function the caller invokes directly.

export const useLoadConversation = () => {
  const queryClient = useQueryClient();
  const { loadConversation } = useAdvisorStore();

  return async (id: string, title: string) => {
    const conversation = await queryClient.fetchQuery({
      queryKey: advisorKeys.conversation(id),
      queryFn: () => getConversation(id),
      staleTime: 60_000,
    });

    loadConversation(id, title, conversation?.messages ?? []);
  };
};

// ─── Delete conversation ───────────────────────────────────────────────────────

export const useDeleteConversationMutation = () => {
  const queryClient = useQueryClient();
  const { activeConversationId, startNewConversation } = useAdvisorStore();

  return useMutation({
    mutationFn: deleteConversation,
    onSuccess: (_, deletedId) => {
      // If the deleted conversation was active, reset to empty state
      if (deletedId === activeConversationId) {
        startNewConversation();
      }
      // Invalidate both the list and the cached single conversation
      queryClient.invalidateQueries({ queryKey: advisorKeys.conversations() });
      queryClient.removeQueries({
        queryKey: advisorKeys.conversation(deletedId),
      });
    },
  });
};
