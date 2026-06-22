import type {
  DashboardNextActionType,
  DashboardResponse,
  DashboardStatus,
} from '@contracts/shared/types/dashboard-types';
import { pathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { roadmapRepository } from '../repositories/roadmap-repository';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';
import type { User } from 'better-auth';
import type { PathwayRoadmap } from '@contracts/shared/types/roadmap-types';
import type { IRecommendation } from '../models/recommendation-model';

type DashboardNextAction = DashboardResponse['nextActionType'];
type DashboardRoadmap = DashboardResponse['roadmap'];
type DashboardRecommendation = DashboardResponse['recommendation'];

export class DashboardService {
  private readonly pathwayAssessmentRepo = pathwayAssessmentRepository;
  private readonly recommendationRepo = recommendationRepository;
  private readonly roadmapRepo = roadmapRepository;
  private readonly roadmapSetupAssessmentRepo =
    roadmapSetupAssessmentRepository;

  async getDashboardData(user: User): Promise<DashboardResponse> {
    const [onboarding, recommendations, roadmapSetup, roadmap] =
      await Promise.all([
        this.pathwayAssessmentRepo.findByUserId(user.id),
        this.recommendationRepo.findAllByUserId(user.id),
        this.roadmapSetupAssessmentRepo.findByUserId(user.id),
        this.roadmapRepo.findOneByUserId(user.id),
      ]);

    const onboardingCompleted = Boolean(onboarding?.completed);
    const roadmapSetupCompleted = Boolean(roadmapSetup?.completed);
    const recommendation = this.buildRecommendation(recommendations);
    const roadmapSummary = this.buildRoadmapSummary(roadmap);
    const status = this.resolveStatus({
      onboardingCompleted,
      hasRecommendations: recommendation.hasRecommendations,
      roadmapSetupCompleted,
      hasRoadmap: roadmapSummary.hasRoadmap,
    });

    return {
      profile: {
        name: user.name,
        email: user.email,
        onboardingCompleted,
        roadmapSetupCompleted,
      },
      status,
      nextActionType: this.buildNextActionType(
        status,
        recommendation,
        roadmapSummary
      ),
      recommendation,
      roadmap: roadmapSummary,
      insights: this.buildInsights({
        onboardingCompleted,
        recommendation,
        roadmap: roadmapSummary,
        roadmapSetupCompleted,
      }),
    };
  }

  private buildRecommendation(
    recommendations: IRecommendation[]
  ): DashboardRecommendation {
    const top = recommendations.slice(0, 3).map((item) => ({
      pathwaySlug: item.pathwaySlug,
      score: Number(item.totalScore.toFixed(2)),
      rank: item.rank,
      reasons: item.reasons.slice(0, 2),
    }));

    return {
      hasRecommendations: top.length > 0,
      top,
    };
  }

  private buildRoadmapSummary(
    roadmap: PathwayRoadmap | null
  ): DashboardRoadmap {
    if (!roadmap) {
      return {
        hasRoadmap: false,
        progressPercent: 0,
        completedSteps: 0,
        inProgressSteps: 0,
        notStartedSteps: 0,
        totalSteps: 0,
      };
    }

    const steps = roadmap.steps ?? [];
    const completedSteps = steps.filter(
      (step) => step.status === 'completed'
    ).length;
    const notStartedSteps = steps.filter(
      (step) => step.status === 'pending'
    ).length;
    const inProgressSteps = steps.filter(
      (step) => step.status === 'in_progress'
    ).length;

    const totalSteps = steps.length;
    const nextStep = steps.find((step: any) => step.status !== 'completed');
    const currentPhase = nextStep
      ? roadmap.phases?.find((phase: any) => phase.id === nextStep.phaseId)
      : roadmap.phases?.find((phase: any) => phase.status !== 'completed');
    const progressPercent =
      totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

    return {
      hasRoadmap: true,
      roadmapId: String(roadmap._id),
      pathwaySlug: String(roadmap.pathwaySlug),
      title: roadmap.title,
      summary: roadmap.summary,
      progressPercent,
      completedSteps,
      notStartedSteps,
      inProgressSteps,
      totalSteps,
      currentPhase: currentPhase?.title,
      nextStep: nextStep
        ? {
            id: nextStep.id,
            title: nextStep.title,
            estimatedTime: nextStep.estimatedTime,
            difficulty: nextStep.difficulty,
          }
        : undefined,
      nextReviewAt: roadmap.nextReviewAt
        ? new Date(roadmap.nextReviewAt).toISOString()
        : undefined,
    };
  }

  private resolveStatus(input: {
    onboardingCompleted: boolean;
    hasRecommendations: boolean;
    roadmapSetupCompleted: boolean;
    hasRoadmap: boolean;
  }): DashboardStatus {
    if (!input.onboardingCompleted) return 'needs_onboarding';
    if (!input.hasRecommendations) return 'needs_recommendations';
    if (!input.roadmapSetupCompleted) return 'needs_roadmap_setup';
    if (!input.hasRoadmap) return 'needs_roadmap';
    return 'active';
  }

  private buildNextActionType(
    status: DashboardStatus,
    recommendation: DashboardRecommendation,
    roadmap: DashboardRoadmap
  ): DashboardNextAction {
    const actions: Record<DashboardStatus, DashboardNextAction> = {
      needs_onboarding: this.nextAction('complete_onboarding'),
      needs_recommendations: this.nextAction('review_recommendations'),
      needs_roadmap_setup: this.nextAction('complete_roadmap_setup'),
      needs_roadmap: this.nextAction('generate_roadmap'),
      active: this.nextAction('continue_roadmap'),
    };

    return actions[status];
  }

  private nextAction(type: DashboardNextActionType): DashboardNextAction {
    return type;
  }

  private buildInsights(input: {
    onboardingCompleted: boolean;
    roadmapSetupCompleted: boolean;
    recommendation: DashboardRecommendation;
    roadmap: DashboardRoadmap;
  }): DashboardResponse['insights'] {
    return {
      profileAssessmentCompleted: input.onboardingCompleted,
      roadmapSetupCompleted: input.roadmapSetupCompleted,
      topPathwaySlug: input.recommendation.top[0]!.pathwaySlug,
      topRecommendedPathwayScore: input.recommendation.top[0]!.score,
      roadmapCompletedSteps: input.roadmap.completedSteps,
      roadmapTotalSteps: input.roadmap.totalSteps,
      roadmapProgressPercent: input.roadmap.progressPercent,
      hasRoadmap: input.roadmap.hasRoadmap,
    };
  }
}

export const dashboardService = new DashboardService();
