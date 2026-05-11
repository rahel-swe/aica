import type {
  PathwayDurationProfile,
  PathwayJourneyPhase,
  RecommendationResult,
} from '@contracts/shared/types/pathway-domain-types';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import { pathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { roadmapRepository } from '../repositories/roadmap-repository';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';
import { roadmapGenerationService } from './roadmap-generation-service';
import type {
  PathwayRoadmap,
  RoadmapStep,
  RoadmapStepStatus,
} from '@contracts/shared/types/roadmap-types';
import type { IRoadmap, IRoadmapStep } from '../models/roadmap-model';

type PathwayDetailRecord = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  keySkills: string[];
  opportunities: string[];
  durationProfile: PathwayDurationProfile;
  journeyPhases: PathwayJourneyPhase[];
  verificationNote?: string;
};

export class RoadmapService {
  private readonly pathwayRepository = pathwayRepository;
  private readonly recommendationRepository = recommendationRepository;
  private readonly roadmapRepository = roadmapRepository;
  private readonly roadmapSetupAssessmentRepository =
    roadmapSetupAssessmentRepository;
  private readonly roadmapGenerationService = roadmapGenerationService;

  async generateRoadmap(userId: string, pathwayId: string) {
    const pathway =
      await this.pathwayRepository.findActiveDetailByIdOrSlug(pathwayId);

    if (!pathway) {
      throw new Error('Pathway not found.');
    }

    const roadmapSetup =
      await this.roadmapSetupAssessmentRepository.findByUserId(userId);

    if (!roadmapSetup) {
      throw new Error(
        'Complete roadmap setup assessment before generating a roadmap.'
      );
    }

    const savedRecommendations =
      await this.recommendationRepository.findByUserId(userId);
    const recommendation = savedRecommendations.find(
      (item) => String(item.pathwayId) === String(pathway._id)
    );

    const pathwayContext = pathway as unknown as PathwayDetailRecord;
    const generated =
      await this.roadmapGenerationService.generateStructuredRoadmap({
        pathway: pathwayContext,
        setup: roadmapSetup as unknown as RoadmapSetupAssessmentFormValues,
        recommendation: recommendation
          ? this.mapRecommendation(recommendation)
          : undefined,
      });

    const currentLevel = this.mapCurrentLevel(
      roadmapSetup as unknown as RoadmapSetupAssessmentFormValues
    );
    const timeBudgetPerWeek = this.mapTimeBudget(
      roadmapSetup as unknown as RoadmapSetupAssessmentFormValues
    );

    const roadmap = await this.roadmapRepository.replaceActiveForUserPathway(
      userId,
      String(pathway._id),
      {
        userId,
        pathwayId: pathway._id,
        version: 1,
        status: 'active',
        title: generated.title,
        summary: generated.summary,
        goal: generated.goal,
        currentLevel,
        timeBudgetPerWeek,
        roadmapStyle: roadmapSetup.roadmapStyle,
        phases: generated.phases,
        steps: generated.steps,
        aiSummary: generated.aiSummary,
        guidanceNote: generated.guidanceNote,
        userEdits: [],
        lastGeneratedAt: new Date(),
        nextReviewAt: this.buildNextReviewAt(roadmapSetup.timeline),
        sourceRecommendation: recommendation
          ? {
              pathwayId: String(recommendation.pathwayId),
              reasons: recommendation.reasons,
              explanation: recommendation.explanation,
              totalScore: recommendation.totalScore,
            }
          : undefined,
      }
    );

    return roadmap;
  }

  async getRoadmaps(userId: string) {
    const roadmaps = await this.roadmapRepository.findByUserId(userId);

    return roadmaps[0] ?? null;
  }

  async changeStepStatus(
    roadmapId: string,
    userId: string,
    stepId: string,
    status: RoadmapStepStatus
  ) {
    // 1. Persist the new step status
    const result = await this.roadmapRepository.changeStepStatus(
      roadmapId,
      userId,
      stepId,
      status
    );

    // 2. Load the full roadmap
    const roadmap = await this.roadmapRepository.findOneByUserId(userId);

    if (!roadmap) return result;

    const updatedStep = roadmap.steps.find((s) => s.id === stepId);
    if (!updatedStep) return result; // defensive

    this.syncPhaseStatus(roadmap, roadmapId, userId, updatedStep.phaseId);

    return result;
  }

  private derivePhaseStatus(phaseSteps: IRoadmapStep[]): RoadmapStepStatus {
    if (phaseSteps.length === 0) return 'pending';

    if (phaseSteps.every((s) => s.status === 'completed')) return 'completed';

    if (
      phaseSteps.some(
        (s) => s.status === 'in_progress' || s.status === 'completed'
      )
    )
      return 'in_progress';

    return 'pending';
  }

  private async syncPhaseStatus(
    roadmap: IRoadmap,
    roadmapId: string,
    userId: string,
    phaseId: string
  ) {
    const phase = roadmap.phases.find((p) => p.id === phaseId);
    if (!phase) return;

    const phaseSteps = roadmap.steps
      .filter((s) => s.phaseId === phase.id)
      .sort((a, b) => a.order - b.order);

    const newStatus = this.derivePhaseStatus(phaseSteps);

    if (newStatus !== phase.status)
      await this.roadmapRepository.changeRoadmapPhaseStatus(
        roadmapId,
        userId,
        phase.id,
        newStatus
      );

    if (newStatus === 'completed')
      await this.advanceToNextPhase(roadmap, roadmapId, userId, phase.order);
  }

  private async advanceToNextPhase(
    roadmap: IRoadmap,
    roadmapId: string,
    userId: string,
    completedPhaseOrder: number
  ): Promise<void> {
    const nextPhase = roadmap.phases
      .sort((a, b) => a.order - b.order)
      .find((p) => p.order > completedPhaseOrder && p.status === 'pending');

    if (!nextPhase) return;

    // Activate the next phase
    await this.roadmapRepository.changeRoadmapPhaseStatus(
      roadmapId,
      userId,
      nextPhase.id,
      'in_progress'
    );

    const firstStep = roadmap.steps
      .filter((s) => s.phaseId === nextPhase.id)
      .sort((a, b) => a.order - b.order)[0];

    if (firstStep && firstStep.status === 'pending')
      await this.roadmapRepository.changeStepStatus(
        roadmapId,
        userId,
        firstStep.id,
        'in_progress'
      );
  }

  async deleteMyRoadmap(roadmapId: string, userId: string) {
    const result = await this.roadmapRepository.delete(roadmapId, userId);
    return result;
  }

  private mapRecommendation(recommendation: any): RecommendationResult {
    return {
      pathwayId: String(recommendation.pathwayId),
      title: recommendation.title,
      slug: recommendation.slug,
      type: recommendation.type,
      summary: recommendation.summary,
      totalScore: recommendation.totalScore,
      dimensionScores: recommendation.dimensionScores,
      reasons: recommendation.reasons,
      explanation: recommendation.explanation,
      rank: recommendation.rank,
      matchingVersion: recommendation.matchingVersion,
    };
  }

  private mapCurrentLevel(setup: RoadmapSetupAssessmentFormValues) {
    if (setup.currentStage === 'high_school') return 'school';
    if (setup.currentStage === 'university') return 'student';
    if (setup.currentStage === 'graduate') return 'graduate';
    if (setup.currentStage === 'working') return 'working';
    return 'self-learning';
  }

  private mapTimeBudget(setup: RoadmapSetupAssessmentFormValues) {
    if (setup.weeklyTime === 'low') return '2-4 hours per week';
    if (setup.weeklyTime === 'medium') return '5-7 hours per week';
    if (setup.weeklyTime === 'high') return '8-12 hours per week';
    return '13+ hours per week';
  }

  private buildNextReviewAt(
    timeline: RoadmapSetupAssessmentFormValues['timeline']
  ) {
    const date = new Date();

    if (timeline === 'short') {
      date.setDate(date.getDate() + 21);
      return date;
    }

    if (timeline === 'medium') {
      date.setDate(date.getDate() + 45);
      return date;
    }

    date.setDate(date.getDate() + 75);
    return date;
  }
}

export const roadmapService = new RoadmapService();
