import type {
  AdvisorChatRequest,
  AdvisorContextSource,
  AdvisorResponse,
} from '@contracts/shared/types/advisor-types';
import { advisorResponseSchema } from '@contracts/shared/schemas/advisor-schema';
import { pathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';
import { pathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { roadmapRepository } from '../repositories/roadmap-repository';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';
import { llmClient } from '../llm/llm-client';
import advisorGuidancePrompt from '@/src/llm/prompts/advisor-guidance-prompt.txt';

// ─── Internal context types ───────────────────────────────────────────────────
// Typed to what we actually extract — not the full mongoose document shape.
// When the real model types are exported from repositories, replace these.

type RecommendationItem = {
  pathwayId: string;
  title: string;
  slug: string;
  rank: number;
  totalScore: number;
  reasons: string[];
};

type RoadmapPhase = {
  title: string;
  objective: string;
  steps: Array<{
    title: string;
    status: string;
    estimatedTime: string;
    difficulty: string;
  }>;
};

type RoadmapData = {
  pathwayId: string;
  title: string;
  summary: string;
  goal: string;
  currentLevel: string;
  timeBudgetPerWeek: number;
  roadmapStyle: string;
  nextReviewAt: Date | string;
  phases: RoadmapPhase[];
};

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
  roadmap: RoadmapData | null;
};

// ─── Static fallback ─────────────────────────────────────────────────────────
// Used only when LLM is unavailable or returns unparseable output.
// Intentionally minimal — no hand-coded routing logic.

const FALLBACK_RESPONSE: Omit<AdvisorResponse, 'contextUsed'> = {
  intent: 'general',
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
  private readonly llm = llmClient;

  async answer(
    userId: string,
    request: AdvisorChatRequest
  ): Promise<AdvisorResponse> {
    const context = await this.buildContext(userId);

    if (!process.env.HF_TOKEN) {
      return {
        ...FALLBACK_RESPONSE,
        contextUsed: this.resolveContextSources(context),
      };
    }

    try {
      const raw = await this.llm.createTextCompletion(
        this.buildPrompt(request, context)
      );
      const parsed = this.extractJson(raw);

      return advisorResponseSchema.parse({
        ...parsed,
        contextUsed: this.resolveContextSources(context),
      });
    } catch {
      return {
        ...FALLBACK_RESPONSE,
        contextUsed: this.resolveContextSources(context),
      };
    }
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
        (onboardingRaw as Record<string, unknown>))
      : null;

    const recommendations = (recommendationsRaw as RecommendationItem[]).slice(
      0,
      3
    );

    const selectedPathwayId =
      roadmap?.pathwayId ??
      (roadmapSetup as RoadmapSetupData | null)?.pickedPathwayId ??
      recommendations[0]?.pathwayId;

    const selectedPathway = selectedPathwayId
      ? await this.pathways
          .findActiveDetailByIdOrSlug(String(selectedPathwayId))
          .then((p) => p as PathwayData | null)
      : null;

    return {
      onboarding,
      recommendations,
      selectedPathway,
      roadmapSetup: roadmapSetup as RoadmapSetupData | null,
      roadmap: roadmap as RoadmapData | null,
    };
  }

  // ─── Prompt building ────────────────────────────────────────────────────────

  private buildPrompt(
    request: AdvisorChatRequest,
    context: AdvisorContext
  ): string {
    return advisorGuidancePrompt
      .replace('{{message}}', request.message)
      .replace(
        '{{context}}',
        JSON.stringify(this.summarizeContext(context), null, 2)
      );
  }

  private summarizeContext(context: AdvisorContext) {
    return {
      onboarding: context.onboarding,

      recommendations: context.recommendations.map((r) => ({
        title: r.title,
        slug: r.slug,
        rank: r.rank,
        totalScore: r.totalScore,
        reasons: r.reasons,
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
            goal: context.roadmap.goal,
            currentLevel: context.roadmap.currentLevel,
            timeBudgetPerWeek: context.roadmap.timeBudgetPerWeek,
            roadmapStyle: context.roadmap.roadmapStyle,
            nextReviewAt: context.roadmap.nextReviewAt,
            phases: context.roadmap.phases?.map((phase) => ({
              title: phase.title,
              objective: phase.objective,
              steps: phase.steps?.map((step) => ({
                title: step.title,
                status: step.status,
                estimatedTime: step.estimatedTime,
                difficulty: step.difficulty,
              })),
            })),
          }
        : null,
    };
  }

  // ─── JSON extraction ────────────────────────────────────────────────────────
  // Handles: plain JSON, markdown fences (```json ... ```), and LLM preamble text.

  private extractJson(raw: string): unknown {
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

  // ─── Context source resolution ──────────────────────────────────────────────

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
}

export const advisorService = new AdvisorService();
