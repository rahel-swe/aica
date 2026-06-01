import type {
  AdvisorChatRequest,
  AdvisorContextSource,
  AdvisorMode,
  AdvisorResponse,
  AdvisorSource,
} from '@contracts/shared/types/advisor-types';
import { advisorResponseSchema } from '@contracts/shared/schemas/advisor-schema';
import { pathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';
import { pathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { roadmapRepository } from '../repositories/roadmap-repository';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';
import { llmClient } from '../llm/llm-client';
import advisorGuidancePrompt from '@/src/llm/prompts/advisor-guidance-prompt.txt';
import { advisorMessageRepository } from '../repositories/advisor-message-repository';
import type {
  RoadmapPhase,
  RoadmapStep,
  PathwayRoadmap,
} from '@contracts/shared/types/roadmap-types';
import type { RecommendationItem } from '@contracts/shared/types/pathway-domain-types';

// ─── Internal context types ───────────────────────────────────────────────────

type PathwayData = {
  title: string;
  slug: string;
  type: string;
  summary: string;
  description: string;
  keySkills: string[];
  opportunities: string[];
  durationProfile: { localRulesRequired?: boolean };
  journeyPhases: unknown[];
  verificationNote?: string;
};

type RoadmapSetupData = {
  pickedPathwayId?: string;
  [key: string]: unknown;
};

type AdvisorContext = {
  onboarding: Record<string, unknown> | null;
  recommendations: RecommendationItem[];
  selectedPathway: PathwayData | null;
  roadmapSetup: RoadmapSetupData | null;
  roadmap: PathwayRoadmap | null;
  selectedRoadmapStep: {
    phase: RoadmapPhase | null;
    step: RoadmapStep;
  } | null;
};

// ─── Static fallback ─────────────────────────────────────────────────────────
// Used only when LLM is unavailable or returns unparseable output.
// Intentionally minimal — no hand-coded routing logic.

const FALLBACK_RESPONSE: Omit<AdvisorResponse, 'contextUsed'> = {
  mode: 'general',
  source: 'advisor',
  title: 'Advisor unavailable',
  answer:
    'The advisor is temporarily unavailable. Your pathway data and roadmap are saved — try again in a moment.',
  nextActions: ['Return to your roadmap and continue the current step.'],
  cautions: ['Advisor response could not be generated right now.'],
  suggestedFollowUps: [
    'What should I focus on this week?',
    'Explain my current roadmap phase.',
  ],
};

// ─── Service ─────────────────────────────────────────────────────────────────

export class AdvisorService {
  private readonly pathwayAssessment = pathwayAssessmentRepository;
  private readonly recommendations = recommendationRepository;
  private readonly pathways = pathwayRepository;
  private readonly roadmaps = roadmapRepository;
  private readonly roadmapSetup = roadmapSetupAssessmentRepository;
  private readonly advisorMessages = advisorMessageRepository;
  private readonly llm = llmClient;

  async answer(
    userId: string,
    request: AdvisorChatRequest
  ): Promise<AdvisorResponse> {
    const context = await this.buildContext(userId);
    const mode = this.resolveMode(request);
    const source = this.resolveSource(request, mode);

    if (!process.env.HF_TOKEN) {
      const response = {
        ...FALLBACK_RESPONSE,
        mode,
        source,
        contextUsed: this.resolveContextSources(context),
      };

      await this.saveAnswer(userId, request.message, response);
      return response;
    }

    try {
      const raw = await this.llm.createTextCompletion(
        this.buildPrompt(request, context, mode, source)
      );
      const parsed = this.extractJson(raw);
      const response = advisorResponseSchema.parse({
        ...parsed,
        mode,
        source,
        contextUsed: this.resolveContextSources(context),
      });

      await this.saveAnswer(userId, request.message, response);
      return response;
    } catch {
      const response = {
        ...FALLBACK_RESPONSE,
        mode,
        source,
        contextUsed: this.resolveContextSources(context),
      };

      await this.saveAnswer(userId, request.message, response);
      return response;
    }
  }

  async getHistory(userId: string) {
    const items = await this.advisorMessages.findRecentByUserId(userId);

    return items.map((item) => ({
      _id: String(item._id),
      message: item.message,
      mode: item.mode,
      source: item.source,
      response: item.response,
      createdAt: item.createdAt.toISOString(),
    }));
  }

  // ─── Context assembly ───────────────────────────────────────────────────────

  private async buildContext(userId: string): Promise<AdvisorContext> {
    const [onboardingRaw, recommendationsRaw, roadmapSetup, roadmap] =
      await Promise.all([
        this.pathwayAssessment.findByUserId(userId),
        this.recommendations.findByUserId(userId),
        this.roadmapSetup.findByUserId(userId),
        this.roadmaps.findOneByUserId(userId),
      ]);

    const onboarding = onboardingRaw
      ? ((onboardingRaw as any).toObject?.() ??
        (onboardingRaw as unknown as Record<string, unknown>))
      : null;

    const recommendations = (
      recommendationsRaw as unknown as RecommendationItem[]
    ).slice(0, 3);

    const selectedPathwayId =
      roadmap?.pathwayId ??
      (roadmapSetup as RoadmapSetupData | null)?.pickedPathwayId ??
      recommendations[0]?.pathwayId;

    const selectedPathway = selectedPathwayId
      ? await this.pathways
          .findActiveDetailByIdOrSlug(String(selectedPathwayId))
          .then((p) => p as PathwayData | null)
      : null;

    const roadmapContext = roadmap as PathwayRoadmap | null;

    return {
      onboarding,
      recommendations,
      selectedPathway,
      roadmapSetup: roadmapSetup as RoadmapSetupData | null,
      roadmap: roadmapContext,
      selectedRoadmapStep: null,
    };
  }

  // ─── Prompt building

  private buildPrompt(
    request: AdvisorChatRequest,
    context: AdvisorContext,
    mode: AdvisorMode,
    source: AdvisorSource
  ): string {
    return advisorGuidancePrompt
      .replace('{{message}}', request.message)
      .replace('{{mode}}', mode)
      .replace('{{source}}', source)
      .replace(
        '{{context}}',
        JSON.stringify(this.summarizeContext(request, context), null, 2)
      );
  }

  private summarizeContext(
    request: AdvisorChatRequest,
    context: AdvisorContext
  ) {
    const selectedRoadmapStep = this.resolveSelectedRoadmapStep(
      request,
      context.roadmap
    );

    return {
      onboarding: context.onboarding,

      recommendations: context.recommendations.map((r) => ({
        title: r.title,
        slug: r.slug,
        rank: r.rank,
        totalScore: r.totalScore,
        reasons: r.reasons ?? [],
      })),

      selectedPathway: context.selectedPathway
        ? {
            title: context.selectedPathway.title,
            slug: context.selectedPathway.slug,
            type: context.selectedPathway.type,
            summary: context.selectedPathway.summary,
            description: context.selectedPathway.description,
            keySkills: context.selectedPathway.keySkills,
            opportunities: context.selectedPathway.opportunities,
            durationProfile: context.selectedPathway.durationProfile,
            journeyPhases: context.selectedPathway.journeyPhases,
            verificationNote: context.selectedPathway.verificationNote,
          }
        : null,

      roadmapSetup: context.roadmapSetup,

      roadmap: context.roadmap
        ? {
            title: context.roadmap.title,
            summary: context.roadmap.summary,
            currentLevel: context.roadmap.currentLevel,
            timeBudgetPerWeek: context.roadmap.timeBudgetPerWeek,
            roadmapStyle: context.roadmap.roadmapStyle,
            nextReviewAt: context.roadmap.nextReviewAt,
            phases: context.roadmap.phases?.map((phase) => ({
              id: phase.id,
              phase: phase.phase,
              title: phase.title,
              objective: phase.objective,
              status: phase.status,
              order: phase.order,
            })),
            steps: context.roadmap.steps?.map((step) => ({
              id: step.id,
              phaseId: step.phaseId,
              title: step.title,
              why: step.why,
              status: step.status,
              estimatedTime: step.estimatedTime,
              difficulty: step.difficulty,
              evidenceOfCompletion: step.evidenceOfCompletion,
              order: step.order,
            })),
          }
        : null,

      selectedRoadmapStep,
    };
  }

  private resolveSelectedRoadmapStep(
    request: AdvisorChatRequest,
    roadmap: PathwayRoadmap | null
  ) {
    if (!request.roadmapStep || !roadmap) return null;

    const step = roadmap.steps?.find(
      (item) =>
        item.id === request.roadmapStep?.stepId &&
        item.phaseId === request.roadmapStep?.phaseId
    );

    if (!step) {
      return null;
    }

    const phase =
      roadmap.phases?.find(
        (item) => item.id === request.roadmapStep?.phaseId
      ) ?? null;

    return {
      phase,
      step,
    };
  }

  // ─── JSON extraction ────────────────────────────────────────────────────────
  // Handles: plain JSON, markdown fences (```json ... ```), and LLM preamble text.

  private extractJson(raw: string) {
    const stripped = raw.replace(/```json|```/gi, '').trim();

    try {
      return JSON.parse(stripped);
    } catch {}

    // Find the outermost JSON object when the LLM adds preamble/postamble
    const start = stripped.indexOf('{');
    const end = stripped.lastIndexOf('}');

    if (start === -1 || end === -1 || end <= start) {
      throw new Error('LLM response contained no parseable JSON object.');
    }

    return JSON.parse(stripped.slice(start, end + 1));
  }

  // ─── Context source resolution

  private resolveContextSources(
    context: AdvisorContext
  ): AdvisorContextSource[] {
    const sources: AdvisorContextSource[] = [];

    if (context.onboarding) sources.push('onboarding');
    if (context.recommendations.length) sources.push('recommendations');
    if (context.selectedPathway) {
      sources.push('pathway');
      sources.push('pathwayKnowledge');
    }
    if (context.roadmapSetup) sources.push('roadmapSetup');
    if (context.roadmap) sources.push('roadmap');

    return sources;
  }

  private resolveMode(request: AdvisorChatRequest): AdvisorMode {
    if (request.mode) return request.mode;
    if (request.roadmapStep) return 'guide_step';

    const message = request.message.toLowerCase();

    if (message.includes('compare') || message.includes(' vs ')) {
      return 'decide';
    }

    if (message.includes('adjust') || message.includes('change my plan')) {
      return 'adjust';
    }

    if (
      message.includes('license') ||
      message.includes('degree') ||
      message.includes('verify')
    ) {
      return 'verify';
    }

    if (message.includes('unsure') || message.includes('confused')) {
      return 'reflect';
    }

    if (message.includes('fit') || message.includes('why')) {
      return 'explain';
    }

    return 'general';
  }

  private resolveSource(
    request: AdvisorChatRequest,
    mode: AdvisorMode
  ): AdvisorSource {
    if (request.source) return request.source;
    if (request.roadmapStep || mode === 'guide_step' || mode === 'adjust') {
      return 'roadmap';
    }
    if (mode === 'explain' || mode === 'decide') return 'recommendation';
    if (mode === 'verify') return 'pathway';
    if (mode === 'reflect') return 'profile';
    return 'advisor';
  }

  private async saveAnswer(
    userId: string,
    message: string,
    response: AdvisorResponse
  ) {
    await this.advisorMessages.create({
      userId,
      message,
      mode: response.mode,
      source: response.source,
      response,
    });
  }
}

export const advisorService = new AdvisorService();
