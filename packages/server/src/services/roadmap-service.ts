import type {
  PathwayDurationProfile,
  PathwayJourneyPhase,
} from '@contracts/shared/types/pathway-domain-types';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import { pathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { roadmapRepository } from '../repositories/roadmap-repository';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';
import { roadmapGenerationService } from './roadmap-generation-service';
import type { RoadmapStepStatus } from '@contracts/shared/types/roadmap-types';
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

  async generateRoadmap(userId: string) {
    const roadmapSetup =
      await roadmapSetupAssessmentRepository.findByUserId(userId);

    if (!roadmapSetup)
      throw new Error(
        'Complete roadmap setup assessment before generating a roadmap.'
      );

    const pathway = await this.pathwayRepository.findActiveDetailBySlug(
      roadmapSetup!.pickedPathwaySlug
    );

    if (!pathway) throw new Error('Pathway not found.');

    const savedRecommendations =
      await this.recommendationRepository.findAllByUserId(userId, 10);
    const recommendation = savedRecommendations.find(
      (recom) => String(recom.pathwayId) === String(pathway._id)
    );

    const pathwayContext = pathway as unknown as PathwayDetailRecord;

    console.log('it works');

    const generated =
      await this.roadmapGenerationService.generateStructuredRoadmap({
        pathway: pathwayContext,
        setup: roadmapSetup as unknown as RoadmapSetupAssessmentFormValues,
        recommendation: recommendation,
      });

    const currentLevel = this.mapCurrentLevel(
      roadmapSetup as unknown as RoadmapSetupAssessmentFormValues
    );

    const timeBudgetPerWeek = this.mapTimeBudget(
      roadmapSetup as unknown as RoadmapSetupAssessmentFormValues
    );

    const roadmap = await this.roadmapRepository.replaceActiveForUserPathway(
      userId,
      String(pathway.slug),
      {
        userId,
        pathwaySlug: pathway.slug,
        version: 1,
        status: 'active',
        title: generated.title,
        summary: generated.summary,
        currentLevel,
        timeBudgetPerWeek,
        roadmapStyle: roadmapSetup.roadmapStyle,
        phases: generated.phases,
        steps: generated.steps,
        lastGeneratedAt: new Date(),
        nextReviewAt: this.buildNextReviewAt(roadmapSetup.timeline),
        sourceRecommendation: recommendation
          ? {
              pathwayId: String(recommendation.pathwayId),
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
    if (!updatedStep) return result;

    // Start next step automaticly, later we might controll through settings

    this.startNextStep(roadmap, roadmapId, userId, updatedStep.id);

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
      await this.startNextPhase(roadmap, roadmapId, userId, phase.order);
  }

  private async startNextStep(
    roadmap: IRoadmap,
    roadmapId: string,
    userId: string,
    updatedStepId: string
  ) {
    const step = roadmap.steps.find((s) => s.id === updatedStepId);

    if (!step) return;

    if (step.status === 'completed') {
      const nextStep = roadmap.steps
        .sort((a, b) => a.order - b.order)
        .find((s) => s.order > step.order && s.status === 'pending');

      if (nextStep)
        this.roadmapRepository.changeStepStatus(
          roadmapId,
          userId,
          nextStep.id,
          'in_progress'
        );
    }
  }

  private async startNextPhase(
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

  private mapCurrentLevel(setup: RoadmapSetupAssessmentFormValues) {
    if (setup.currentStage === 'high_school') return 'school';
    if (setup.currentStage === 'university') return 'student';
    if (setup.currentStage === 'graduate') return 'graduate';
    if (setup.currentStage === 'working') return 'working';
    return 'self-learning';
  }

  private mapTimeBudget(setup: RoadmapSetupAssessmentFormValues) {
    if (setup.weeklyTime === 'low') return '2-4 hours per week';
    if (setup.weeklyTime === 'medium') return '5-8 hours per week';
    if (setup.weeklyTime === 'high') return '9-12 hours per week';
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
