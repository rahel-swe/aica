import type { AdvisorChatMessage } from '@contracts/shared/types/advisor-types';
import { AdvisorConversationModel } from '../models/advisor-conversation-model';

const MAX_HISTORY_FOR_LIST = 20;

type AdvisorFirtsMessage = Omit<AdvisorChatMessage, 'id'> &
  Partial<Pick<AdvisorChatMessage, 'id'>>;

export class AdvisorConversationRepository {
  // ─── Write

  async create(data: {
    userId: string;
    title: string;
    contextSnapshot: Record<string, unknown>;
    firstMessage: AdvisorFirtsMessage;
  }) {
    return AdvisorConversationModel.create({
      userId: data.userId,
      title: data.title,
      messages: [data.firstMessage],
      contextSnapshot: data.contextSnapshot,
    });
  }

  async appendMessage(conversationId: string, message: AdvisorFirtsMessage) {
    // $push is atomic — safe for concurrent requests (though the UX shouldn't allow that)
    return AdvisorConversationModel.findByIdAndUpdate(
      conversationId,
      { $push: { messages: message } },
      { returnDocument: 'after', lean: true }
    );
  }

  // ─── Read

  async findByIdAndUserId(conversationId: string, userId: string) {
    return AdvisorConversationModel.findOne({
      _id: conversationId,
      userId,
    }).lean();
  }

  // Returns summaries for the sidebar/conversation list.
  // Uses $slice on messages to grab only the last message for preview.
  async findRecentByUserId(userId: string, limit = MAX_HISTORY_FOR_LIST) {
    return AdvisorConversationModel.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .select({
        title: 1,
        messages: { $slice: -1 },
        createdAt: 1,
        updatedAt: 1,
      })
      .lean();
  }

  // ─── Delete ──────────────────────────────────────────────────────────────────

  async deleteByIdAndUserId(conversationId: string, userId: string) {
    return AdvisorConversationModel.findOneAndDelete({
      _id: conversationId,
      userId,
    });
  }
}

export const advisorConversationRepository =
  new AdvisorConversationRepository();
