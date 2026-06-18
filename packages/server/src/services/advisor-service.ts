import type { Response } from 'express';
import type {
  AdvisorChatRequest,
  AdvisorStreamEvent,
  AdvisorToolCall,
  AdvisorContextSource,
  SearchResult,
  AdvisorResponseMode,
} from '@contracts/shared/types/advisor-types';
import { advisorConversationRepository } from '../repositories/advisor-conversation-repository';
import { advisorContextBuilder } from './advisor-context-builder';
import advisorSystemPromptTemplate from '@/src/llm/prompts/advisor-guidance-prompt.txt';
import { runAdvisorCompletion } from '../llm/advisor-chat-completion';

const LLM_HISTORY_WINDOW = 20;
const TITLE_MAX_LENGTH = 60;

export class AdvisorService {
  private readonly conversations = advisorConversationRepository;

  async chat(
    userId: string,
    request: AdvisorChatRequest,
    res: Response
  ): Promise<void> {
    try {
      const conversationId = await this.resolveConversation(userId, request);
      await this.appendUserMessage(conversationId, request.message);

      const conversation = await this.conversations.findByIdAndUserId(
        conversationId,
        userId
      );

      if (!conversation) {
        this.sendEvent(res, {
          type: 'error',
          message: 'Conversation not found.',
        });
        this.sendEvent(res, { type: 'done' });
        res.end();
        return;
      }

      this.sendEvent(res, {
        type: 'start',
        conversationId,
        messageId: new Date().toISOString(),
      });

      const historyMessages = (conversation.messages ?? [])
        .slice(-LLM_HISTORY_WINDOW)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const responseMode = request.responseMode ?? 'focus';

      const systemPrompt = this.buildSystemPrompt(
        conversation.contextSnapshot,
        request,
        responseMode
      );

      let fullContent = '';
      let toolCalls: AdvisorToolCall[] = [];
      let searchResults: SearchResult[] = [];

      try {
        const result = await runAdvisorCompletion(
          systemPrompt,
          historyMessages,
          responseMode,
          {
            //  emits SSE event so UI can show "Searching..." before text starts
            onSearching: (query) => {
              this.sendEvent(res, { type: 'searching', query });
            },
            onDelta: (delta) => {
              fullContent += delta;
              this.sendEvent(res, { type: 'delta', content: delta });
            },
          }
        );

        toolCalls = result.toolCalls;
        searchResults = result.searchResults;
      } catch (llmErr) {
        console.error('[AdvisorService] LLM completion failed:', llmErr);
        if (!fullContent) {
          this.sendEvent(res, {
            type: 'error',
            message:
              'Advisor is temporarily unavailable. Your context is saved — try again shortly.',
          });
          this.sendEvent(res, { type: 'done' });
          res.end();
          return;
        }
      }

      //  emit resources before metadata so UI can render them together
      if (searchResults.length > 0)
        this.sendEvent(res, { type: 'resources', items: searchResults });

      const { actions, followUps, cautions } =
        this.extractToolResults(toolCalls);
      const contextUsed = this.resolveContextSources(
        (conversation as any).contextSnapshot
      );

      this.sendEvent(res, {
        type: 'metadata',
        actions,
        followUps,
        cautions,
        contextUsed,
      });
      this.sendEvent(res, { type: 'done' });
      res.end();

      // Persist assistant message — fire and forget, never blocks the stream
      this.conversations
        .appendMessage(conversationId, {
          role: 'assistant',
          content: fullContent,
          actions,
          followUps,
          cautions,
          contextUsed,
          resources: searchResults, // ← persisted alongside the message
          createdAt: new Date(),
        })
        .catch((err) =>
          console.error(
            '[AdvisorService] Failed to persist assistant message:',
            err
          )
        );
    } catch (err) {
      console.error('[AdvisorService] Unhandled error in chat:', err);
      try {
        this.sendEvent(res, {
          type: 'error',
          message: 'An unexpected error occurred.',
        });
        this.sendEvent(res, { type: 'done' });
        res.end();
      } catch {}
    }
  }

  // ─── Conversation management (unchanged) ─────────────────────────────────────

  async listConversations(userId: string) {
    const docs = await this.conversations.findRecentByUserId(userId);
    return docs.map((doc: any) => ({
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
      _id: String((doc as any)._id),
      title: (doc as any).title,
      messages: (doc as any).messages ?? [],
      createdAt: (doc as any).createdAt?.toISOString(),
      updatedAt: (doc as any).updatedAt?.toISOString(),
    };
  }

  async deleteConversation(conversationId: string, userId: string) {
    return this.conversations.deleteByIdAndUserId(conversationId, userId);
  }

  // ─── Internals ────────────────────────────────────────────────────────────────

  private async resolveConversation(
    userId: string,
    request: AdvisorChatRequest
  ) {
    if (request.conversationId) {
      const existing = await this.conversations.findByIdAndUserId(
        request.conversationId,
        userId
      );
      if (existing) return String((existing as any)._id);
    }

    const context = await advisorContextBuilder.build(userId, request);
    const snapshot = advisorContextBuilder.toSnapshot(context);

    const newConv = await this.conversations.create({
      userId,
      title: this.generateTitle(request.message),
      contextSnapshot: snapshot,
      firstMessage: {
        role: 'user',
        content: request.message,
        actions: [],
        followUps: [],
        cautions: [],
        contextUsed: [],
        resources: [],
        createdAt: new Date(),
      },
    });

    return String(newConv._id);
  }

  private async appendUserMessage(conversationId: string, message: string) {
    await this.conversations.appendMessage(conversationId, {
      role: 'user',
      content: message,
      actions: [],
      followUps: [],
      cautions: [],
      contextUsed: [],
      resources: [],
      createdAt: new Date(),
    });
  }

  // ← Mode-aware system prompt: injects a behavioral hint based on responseMode
  private buildSystemPrompt(
    snapshot: Record<string, unknown>,
    request: AdvisorChatRequest,
    mode: AdvisorResponseMode
  ): string {
    const modeHints: Record<AdvisorResponseMode, string> = {
      guided:
        'Provide thorough guidance. Include follow-up questions and actions when genuinely useful.',
      focused:
        'Be concise and direct. Answer the question only — no follow-up suggestions.',
      deep: 'Focus on concrete, actionable next steps. Omit follow-up questions.',
    };

    const stepHint = request.roadmapStep
      ? '\nThe user is asking about a specific roadmap step. Focus guidance on that step.'
      : '';

    return advisorSystemPromptTemplate
      .replace('{{context}}', JSON.stringify(snapshot, null, 2))
      .replace('{{step_hint}}', stepHint)
      .replace('{{mode_hint}}', modeHints[mode] ?? modeHints.guided);
  }

  private extractToolResults(toolCalls: AdvisorToolCall[]) {
    const actions: string[] = [];
    const followUps: string[] = [];
    const cautions: string[] = [];
    for (const call of toolCalls) {
      switch (call.name) {
        case 'surface_actions':
          actions.push(...call.input.actions);
          break;
        case 'surface_follow_ups':
          followUps.push(...call.input.questions);
          break;
        case 'flag_caution':
          cautions.push(call.input.message);
          break;
      }
    }
    return { actions, followUps, cautions };
  }

  private resolveContextSources(
    snapshot: Record<string, unknown>
  ): AdvisorContextSource[] {
    const sources: AdvisorContextSource[] = [];
    if (snapshot.onboarding) sources.push('onboarding');
    if (
      Array.isArray(snapshot.recommendations) &&
      snapshot.recommendations.length
    )
      sources.push('recommendations');
    if (snapshot.selectedPathway) {
      sources.push('pathway');
      sources.push('pathwayKnowledge');
    }
    if (snapshot.roadmapSetup) sources.push('roadmapSetup');
    if (snapshot.roadmap) sources.push('roadmap');
    return sources;
  }

  private generateTitle(message: string): string {
    const clean = message.trim().replace(/[^\w\s''\-,.?]/g, '');
    return clean.length <= TITLE_MAX_LENGTH
      ? clean
      : clean.slice(0, TITLE_MAX_LENGTH).trim() + '…';
  }

  private sendEvent(res: Response, event: AdvisorStreamEvent): void {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  }
}

export const advisorService = new AdvisorService();
