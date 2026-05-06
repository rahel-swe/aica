import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import type {
  MatchWeight,
  Pathway,
  PathwayMatchProfile,
  RecommendationResult,
  ScoreBand,
} from '@contracts/shared/types/pathway-domain-types';
import { pathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';
import { pathwayMatchProfileRepository } from '../repositories/pathway-match-profile-repository';
import { pathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import {
  recommendationExplanationService,
  RecommendationExplanationService,
} from './recommendation-explanation-service';
import {
  DIMENSION_WEIGHTS,
  pathwayScoringEngine,
} from '../utils/pathway-scoring-engin';

type PathwayProfileShape = PathwayMatchProfile;

export class RecommendationService {
  private readonly pathwayRepository = pathwayRepository;
  private readonly pathwayMatchProfileRepository =
    pathwayMatchProfileRepository;
  private readonly recommendationRepository = recommendationRepository;
  private readonly explanationService = recommendationExplanationService;
  private readonly pathwayAssessment = pathwayAssessmentRepository;
  private readonly scoringEngine = pathwayScoringEngine;

  async generateRecommendations(
    userId: string
  ): Promise<RecommendationResult[]> {
    const onboarding = (await this.pathwayAssessment.findByUserId(
      userId
    )) as PathwayAssessmentFormValues | null;

    if (!onboarding) {
      throw new Error(
        'Complete onboarding first before generating recommendations.'
      );
    }

    const profiles =
      (await this.pathwayMatchProfileRepository.findAllActive()) as PathwayProfileShape[];

    if (!profiles.length) {
      throw new Error('No active pathway match profiles found.');
    }

    const pathwayIds = profiles.map((profile) => String(profile.pathwayId));
    const pathways = await this.pathwayRepository.findActiveByIds(pathwayIds);
    const pathwayById = new Map(
      pathways.map((pathway) => [String(pathway._id), pathway])
    );

    const ranked = profiles
      .map((profile) => {
        const pathway = pathwayById.get(String(profile.pathwayId));

        if (!pathway) {
          return null;
        }

        const dimensionScores = {
          strengths: this.scoringEngine.scoreMultiValueDimension(
            onboarding.strengths,
            profile.strengths
          ),
          subjects: this.scoringEngine.scoreSingleValueDimension(
            onboarding.subjects,
            profile.subjects
          ),
          passions: this.scoringEngine.scoreMultiValueDimension(
            onboarding.passions,
            profile.passions
          ),
          freeTime: this.scoringEngine.scoreSingleValueDimension(
            onboarding.freeTime,
            profile.freeTime
          ),
          workEnvironment: this.scoringEngine.scoreSingleValueDimension(
            onboarding.workEnvironment,
            profile.workEnvironment
          ),
          workStyle: this.scoringEngine.scoreSingleValueDimension(
            onboarding.workStyle,
            profile.workStyle
          ),
          impact: this.scoringEngine.scoreSingleValueDimension(
            onboarding.impact,
            profile.impact
          ),
          goals: this.scoringEngine.scoreSingleValueDimension(
            onboarding.goals,
            profile.goals
          ),
        };

        const totalScore = Number(
          (
            dimensionScores.strengths * DIMENSION_WEIGHTS.strengths +
            dimensionScores.subjects * DIMENSION_WEIGHTS.subjects +
            dimensionScores.passions * DIMENSION_WEIGHTS.passions +
            dimensionScores.freeTime * DIMENSION_WEIGHTS.freeTime +
            dimensionScores.workEnvironment *
              DIMENSION_WEIGHTS.workEnvironment +
            dimensionScores.workStyle * DIMENSION_WEIGHTS.workStyle +
            dimensionScores.impact * DIMENSION_WEIGHTS.impact +
            dimensionScores.goals * DIMENSION_WEIGHTS.goals
          ).toFixed(4)
        );

        return {
          pathwayId: String(pathway._id),
          title: pathway.title,
          slug: pathway.slug,
          type: pathway.type,
          summary: pathway.summary,
          totalScore,
          dimensionScores,
          reasons: this.explanationService.buildReasons(onboarding, profile),
        } satisfies RecommendationResult;
      })
      .filter((item): item is RecommendationResult => item !== null)
      .sort((a, b) => (b?.totalScore ?? 0) - (a?.totalScore ?? 0))
      .slice(0, 3)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
        matchingVersion: 1,
      }));

    const enriched = await this.explanationService.enrichRecommendations(
      ranked,
      onboarding
    );

    await this.recommendationRepository.replaceForUser(
      userId,
      enriched.map((item) => ({
        userId,
        pathwayId: item.pathwayId,
        title: item.title,
        slug: item.slug,
        type: item.type,
        summary: item.summary,
        totalScore: item.totalScore,
        dimensionScores: item.dimensionScores,
        reasons: item.reasons,
        explanation: item.explanation,
        rank: item.rank,
        matchingVersion: item.matchingVersion,
        sourceProfileSnapshot: onboarding,
      }))
    );

    return enriched;
  }

  async getRecommendations(userId: string): Promise<RecommendationResult[]> {
    const existing = await this.recommendationRepository.findByUserId(userId);

    if (!existing.length) {
      return await this.generateRecommendations(userId);
    }

    return existing.map((item) => ({
      pathwayId: String(item.pathwayId),
      title: item.title,
      slug: item.slug,
      type: item.type,
      summary: item.summary,
      totalScore: item.totalScore,
      dimensionScores: item.dimensionScores,
      reasons: item.reasons,
      explanation: item.explanation,
      rank: item.rank,
      matchingVersion: item.matchingVersion,
    }));
  }
}
