import { advisorConversationRepository } from '@/src/repositories/advisor-conversation-repository';

export class AdvisorConversationService {
  private conversations = advisorConversationRepository;

  async listConversations(userId: string) {
    const docs = await this.conversations.findRecentByUserId(userId);
    return docs.map((doc) => ({
      _id: String(doc._id),
      title: doc.title,
      lastMessage: (doc.messages?.[0]?.content ?? '').slice(0, 120),
      messageCount: doc.messages?.length ?? 0,
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    }));
  }

  async getConversation(conversationId: string, userId: string) {
    const doc = await this.conversations.findByIdAndUserId(
      conversationId,
      userId
    );

    if (!doc) return null;

    return {
      _id: String(doc._id),
      title: doc.title,
      messages: doc.messages ?? [],
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    };
  }

  async deleteConversation(conversationId: string, userId: string) {
    return this.conversations.deleteByIdAndUserId(conversationId, userId);
  }
}

export const advisorConversationService = new AdvisorConversationService();
