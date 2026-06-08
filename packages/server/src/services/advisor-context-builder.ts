import { pathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';
import { pathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { roadmapRepository } from '../repositories/roadmap-repository';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';
import type {
  AdvisorContext,
  AdvisorContextSource,
  AdvisorRoadmapData,
  AdvisorChatRequest,
} from '@contracts/shared/types/advisor-types';
import type {
  RoadmapPhase,
  RoadmapStep,
  PathwayRoadmap,
} from '@contracts/shared/types/roadmap-types';
import type { RecommendationItem } from '@contracts/shared/types/pathway-domain-types';

export class AdvisorContextBuilder {
  // ─── Build fresh context from DB ────────────────────────────────────────────
  // Call once per conversation creation only — not every message.

  async build(
    userId: string,
    request: AdvisorChatRequest
  ): Promise<AdvisorContext> {
    const [onboardingRaw, recommendationsRaw, roadmapSetup, roadmap] =
      await Promise.all([
        pathwayAssessmentRepository.findByUserId(userId),
        recommendationRepository.findByUserId(userId),
        roadmapSetupAssessmentRepository.findByUserId(userId),
        roadmapRepository.findOneByUserId(userId),
      ]);

    // Strip Mongoose document wrapper without casting every type
    const onboarding = onboardingRaw
      ? ((onboardingRaw as any).toObject?.() ??
        (onboardingRaw as Record<string, unknown>))
      : null;

    const recommendations: AdvisorContext['recommendations'] = (
      (recommendationsRaw as unknown as RecommendationItem[]) ?? []
    )
      .slice(0, 3)
      .map((r) => ({
        title: r.title,
        slug: r.slug,
        rank: r.rank,
        totalScore: r.totalScore,
        reasons: r.reasons ?? [],
        pathwayId: String(r.pathwayId),
      }));

    const roadmapData = roadmap as PathwayRoadmap | null;
    const roadmapSetupData = roadmapSetup as Record<string, unknown> | null;

    const selectedPathwayId =
      roadmapData?.pathwayId ??
      (roadmapSetupData?.pickedPathwayId as string | undefined) ??
      recommendations[0]?.pathwayId;

    const selectedPathwayRaw = selectedPathwayId
      ? await pathwayRepository
          .findActiveDetailByIdOrSlug(String(selectedPathwayId))
          .then((p) => p as any)
      : null;

    const selectedPathway = selectedPathwayRaw
      ? {
          title: selectedPathwayRaw.title,
          slug: selectedPathwayRaw.slug,
          type: selectedPathwayRaw.type,
          summary: selectedPathwayRaw.summary,
          description: selectedPathwayRaw.description,
          keySkills: selectedPathwayRaw.keySkills ?? [],
          opportunities: selectedPathwayRaw.opportunities ?? [],
          durationProfile: selectedPathwayRaw.durationProfile ?? {},
          journeyPhases: selectedPathwayRaw.journeyPhases ?? [],
          verificationNote: selectedPathwayRaw.verificationNote,
        }
      : null;

    const roadmapNormalized: AdvisorRoadmapData | null = roadmapData
      ? {
          title: roadmapData.title,
          summary: roadmapData.summary,
          currentLevel: roadmapData.currentLevel,
          timeBudgetPerWeek: roadmapData.timeBudgetPerWeek,
          roadmapStyle: roadmapData.roadmapStyle,
          nextReviewAt: roadmapData.nextReviewAt,
          pathwayId: String(roadmapData.pathwayId ?? ''),
          phases: (roadmapData.phases ?? []).map((p: RoadmapPhase) => ({
            id: p.id,
            phase: p.phase,
            title: p.title,
            objective: p.objective,
            status: p.status,
            order: p.order,
          })),
          steps: (roadmapData.steps ?? []).map((s: RoadmapStep) => ({
            id: s.id,
            phaseId: s.phaseId,
            title: s.title,
            why: s.why,
            status: s.status,
            estimatedTime: s.estimatedTime,
            difficulty: s.difficulty,
            evidenceOfCompletion: s.evidenceOfCompletion,
            order: s.order,
          })),
        }
      : null;

    const context: AdvisorContext = {
      onboarding,
      recommendations,
      selectedPathway,
      roadmapSetup: roadmapSetupData,
      roadmap: roadmapNormalized,
      selectedRoadmapStep: null,
    };

    // If the request targets a specific step, resolve it now so it's in the snapshot
    if (request.roadmapStep) {
      context.selectedRoadmapStep = this.resolveStep(
        request.roadmapStep,
        roadmapNormalized
      );
    }

    return context;
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private resolveStep(
    step: { phaseId: string; stepId: string },
    roadmap: AdvisorRoadmapData | null
  ) {
    if (!roadmap) return null;

    const matchedStep = roadmap.steps.find(
      (s: any) => s.id === step.stepId && s.phaseId === step.phaseId
    );
    if (!matchedStep) return null;

    const phase =
      roadmap.phases.find((p: any) => p.id === step.phaseId) ?? null;

    return { phase, step: matchedStep };
  }

  resolveSources(context: AdvisorContext): AdvisorContextSource[] {
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

  // Deep-clone via JSON serialization — strips Mongoose internals, Dates become strings.
  // This is intentional: the snapshot is a plain object, not a live document.
  toSnapshot(context: AdvisorContext): Record<string, unknown> {
    return JSON.parse(JSON.stringify(context));
  }
}

export const advisorContextBuilder = new AdvisorContextBuilder();
