import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import type {
  MatchWeight,
  PathwayMatchProfile,
  RecommendationResult,
} from '@contracts/shared/types/pathway-domain-types';
import { pathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';
import { pathwayMatchProfileRepository } from '../repositories/pathway-match-profile-repository';
import { pathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { recommendationExplanationService } from './recommendation-explanation-service';
import {
  DIMENSION_WEIGHTS,
  pathwayScoringEngine,
} from '../utils/pathway-scoring-engin';

type PathwayProfileShape = PathwayMatchProfile;
type RecommendationScoreSnapshot = RecommendationResult & {
  rankingSignals: {
    strongMatches: number;
    supportingMatches: number;
    penaltyConflicts: number;
    matchedDimensions: number;
  };
};

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

        const dimensionScores = this.buildDimensionScores(onboarding, profile);
        const totalScore = this.calculateTotalScore(dimensionScores);
        const rankingSignals = this.buildRankingSignals(onboarding, profile);

        return {
          pathwayId: String(pathway._id),
          title: pathway.title,
          slug: pathway.slug,
          type: pathway.type,
          summary: pathway.summary,
          totalScore,
          dimensionScores,
          reasons: this.explanationService.buildReasons(onboarding, profile),
          rankingSignals,
        } satisfies RecommendationScoreSnapshot;
      })
      .filter((item): item is RecommendationScoreSnapshot => item !== null)
      .sort((a, b) => this.compareRecommendations(a, b))
      .slice(0, 3)
      .map(({ rankingSignals: _rankingSignals, ...item }, index) => ({
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

  private buildDimensionScores(
    onboarding: PathwayAssessmentFormValues,
    profile: PathwayProfileShape
  ) {
    return {
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
  }

  private calculateTotalScore(
    dimensionScores: RecommendationResult['dimensionScores']
  ) {
    return Number(
      (
        dimensionScores.strengths * DIMENSION_WEIGHTS.strengths +
        dimensionScores.subjects * DIMENSION_WEIGHTS.subjects +
        dimensionScores.passions * DIMENSION_WEIGHTS.passions +
        dimensionScores.freeTime * DIMENSION_WEIGHTS.freeTime +
        dimensionScores.workEnvironment * DIMENSION_WEIGHTS.workEnvironment +
        dimensionScores.workStyle * DIMENSION_WEIGHTS.workStyle +
        dimensionScores.impact * DIMENSION_WEIGHTS.impact +
        dimensionScores.goals * DIMENSION_WEIGHTS.goals
      ).toFixed(7)
    );
  }

  private buildRankingSignals(
    onboarding: PathwayAssessmentFormValues,
    profile: PathwayProfileShape
  ) {
    const matchedStrengths = this.collectMultiValueMatches(
      onboarding.strengths,
      profile.strengths
    );
    const matchedPassions = this.collectMultiValueMatches(
      onboarding.passions,
      profile.passions
    );
    const matchedSingles = [
      this.collectSingleValueMatch(onboarding.subjects, profile.subjects),
      this.collectSingleValueMatch(onboarding.freeTime, profile.freeTime),
      this.collectSingleValueMatch(
        onboarding.workEnvironment,
        profile.workEnvironment
      ),
      this.collectSingleValueMatch(onboarding.workStyle, profile.workStyle),
      this.collectSingleValueMatch(onboarding.impact, profile.impact),
      this.collectSingleValueMatch(onboarding.goals, profile.goals),
    ].filter((item): item is MatchWeight => item !== null);

    const matchedDimensions = [
      matchedStrengths.length > 0,
      matchedPassions.length > 0,
      this.collectSingleValueMatch(onboarding.subjects, profile.subjects) !==
        null,
      this.collectSingleValueMatch(onboarding.freeTime, profile.freeTime) !==
        null,
      this.collectSingleValueMatch(
        onboarding.workEnvironment,
        profile.workEnvironment
      ) !== null,
      this.collectSingleValueMatch(onboarding.workStyle, profile.workStyle) !==
        null,
      this.collectSingleValueMatch(onboarding.impact, profile.impact) !== null,
      this.collectSingleValueMatch(onboarding.goals, profile.goals) !== null,
    ].filter(Boolean).length;

    const allMatches = [
      ...matchedStrengths,
      ...matchedPassions,
      ...matchedSingles,
    ];
    const strongMatches = allMatches.filter(
      (item) => item.band === 'strong'
    ).length;
    const supportingMatches = allMatches.filter(
      (item) => item.band === 'supporting'
    ).length;
    const penaltyConflicts = allMatches.filter(
      (item) => item.band === 'penalty'
    ).length;

    return {
      strongMatches,
      supportingMatches,
      penaltyConflicts,
      matchedDimensions,
    };
  }

  private compareRecommendations(
    a: RecommendationScoreSnapshot,
    b: RecommendationScoreSnapshot
  ) {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }

    if (b.rankingSignals.strongMatches !== a.rankingSignals.strongMatches) {
      return b.rankingSignals.strongMatches - a.rankingSignals.strongMatches;
    }

    if (
      b.rankingSignals.matchedDimensions !== a.rankingSignals.matchedDimensions
    ) {
      return (
        b.rankingSignals.matchedDimensions - a.rankingSignals.matchedDimensions
      );
    }

    if (
      b.rankingSignals.supportingMatches !== a.rankingSignals.supportingMatches
    ) {
      return (
        b.rankingSignals.supportingMatches - a.rankingSignals.supportingMatches
      );
    }

    if (
      a.rankingSignals.penaltyConflicts !== b.rankingSignals.penaltyConflicts
    ) {
      return (
        a.rankingSignals.penaltyConflicts - b.rankingSignals.penaltyConflicts
      );
    }

    return a.slug.localeCompare(b.slug);
  }

  private collectMultiValueMatches(
    selectedValues: string[],
    weights: MatchWeight[]
  ) {
    return weights.filter((item) => selectedValues.includes(item.value));
  }

  private collectSingleValueMatch(
    selectedValue: string,
    weights: MatchWeight[]
  ) {
    return weights.find((item) => item.value === selectedValue) ?? null;
  }
}
