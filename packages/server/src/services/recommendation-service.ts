import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import type {
  MatchWeight,
  PathwayMatchProfile,
  PathwayVisibilityLayer,
  RecommendationDirectionMatch,
  RecommendationFamilyMatch,
  RecommendationGroupRef,
  RecommendationOverview,
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

type PathwayTaxonomyNode = {
  name: string;
  slug: string;
  kind: 'domain' | 'field' | 'specialization';
};

type PathwayRecord = {
  _id: unknown;
  title: string;
  slug: string;
  type: RecommendationResult['type'];
  summary: string;
  visibilityLayer?: PathwayVisibilityLayer;
  taxonomyNodeIds: PathwayTaxonomyNode[];
};

type RecommendationScoreSnapshot = Omit<
  RecommendationResult,
  'matchPercent' | 'visibilityLayer' | 'direction' | 'family'
> & {
  matchPercent: number;
  visibilityLayer: PathwayVisibilityLayer;
  direction: RecommendationGroupRef;
  family?: RecommendationGroupRef;
  rankingSignals: {
    strongMatches: number;
    supportingMatches: number;
    penaltyConflicts: number;
    matchedDimensions: number;
  };
};

type RecommendationGroupCandidate = {
  key: string;
  title: string;
  direction?: RecommendationGroupRef;
  topEntries: RecommendationScoreSnapshot[];
  totalScore: number;
  matchPercent: number;
  pathwayCount: number;
  topPathwaySlugs: string[];
};

const DIRECTION_COUNT = 3;
const FAMILY_COUNT = 17;

const VISIBILITY_SCORE_WEIGHTS: Record<PathwayVisibilityLayer, number> = {
  primary: 1,
  adjacent: 0.84,
  specialized: 0.68,
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
  ): Promise<RecommendationOverview> {
    return await this.buildRecommendationOverview(userId);
  }

  async getRecommendations(userId: string): Promise<RecommendationOverview> {
    return await this.buildRecommendationOverview(userId);
  }

  private async buildRecommendationOverview(
    userId: string
  ): Promise<RecommendationOverview> {
    const onboarding = await this.pathwayAssessment.findByUserId(userId);

    if (!onboarding) {
      throw new Error(
        'Complete onboarding first before generating recommendations.'
      );
    }

    const [profiles, pathwaysRaw, existingRecommendations] = await Promise.all([
      this.pathwayMatchProfileRepository.findAllActive() as Promise<
        PathwayProfileShape[]
      >,
      this.pathwayRepository.findAllActiveWithDetails(),
      this.recommendationRepository.findByUserId(userId),
    ]);

    const pathways = pathwaysRaw as unknown as PathwayRecord[];

    if (!profiles.length) {
      throw new Error('No active pathway match profiles found.');
    }

    const pathwayById = new Map(
      pathways.map((pathway) => [String(pathway._id), pathway])
    );
    const explanationBySlug = new Map(
      existingRecommendations.map((item) => [item.slug, item.explanation])
    );

    const rankedPathways = profiles
      .map((profile): RecommendationScoreSnapshot | null => {
        const pathway = pathwayById.get(String(profile.pathwayId));

        if (!pathway) return null;

        const direction = this.resolveDirection(pathway);

        if (!direction) return null;

        const family = this.resolveFamily(pathway);
        const dimensionScores = this.buildDimensionScores(onboarding, profile);
        const totalScore = this.calculateTotalScore(dimensionScores);
        const visibilityLayer = pathway.visibilityLayer ?? 'adjacent';

        const candidate: RecommendationScoreSnapshot = {
          pathwayId: String(pathway._id),
          title: pathway.title,
          slug: pathway.slug,
          type: pathway.type,
          summary: pathway.summary,
          totalScore,
          matchPercent: this.toPercent(totalScore),
          dimensionScores,
          reasons: this.explanationService.buildReasons(onboarding, profile),
          visibilityLayer,
          direction,
          family,
          rankingSignals: this.buildRankingSignals(onboarding, profile),
        };

        return candidate;
      })
      .filter((item): item is RecommendationScoreSnapshot => item !== null)
      .sort((a, b) => this.compareRecommendations(a, b));

    const directionMatches = this.buildDirectionMatches(rankedPathways);
    const familyMatches = this.buildFamilyMatches(
      rankedPathways,
      directionMatches
    );

    const pathwayRecommendationsBase = rankedPathways.map((pathway) => ({
      ...pathway,
      explanation: explanationBySlug.get(pathway.slug) || undefined,
    }));

    const topPathwaysForExplanation = this.selectTopPathways(
      pathwayRecommendationsBase
    );
    const enrichedTopPathways = await this.enrichPathwaysIfNeeded(
      topPathwaysForExplanation,
      onboarding
    );

    const enrichedTopPathwaysBySlug = new Map(
      enrichedTopPathways.map((item) => [item.slug, item.explanation])
    );

    const pathwayRecommendations = pathwayRecommendationsBase.map(
      (item, index) => ({
        ...item,
        explanation:
          item.explanation ?? enrichedTopPathwaysBySlug.get(item.slug),
        rank: index + 1,
        matchingVersion: 2,
      })
    );

    await this.recommendationRepository.replaceForUser(
      userId,
      pathwayRecommendations.map((item) => ({
        userId,
        pathwayId: item.pathwayId,
        title: item.title,
        slug: item.slug,
        type: item.type,
        summary: item.summary,
        totalScore: item.totalScore,
        matchPercent: item.matchPercent,
        visibilityLayer: item.visibilityLayer,
        direction: item.direction,
        family: item.family,
        dimensionScores: item.dimensionScores,
        reasons: item.reasons,
        explanation: item.explanation,
        rank: item.rank,
        matchingVersion: item.matchingVersion,
        sourceProfileSnapshot: onboarding,
      }))
    );

    return {
      directionMatches,
      familyMatches,
      pathwayRecommendations,
    };
  }

  private async enrichPathwaysIfNeeded(
    recommendations: RecommendationResult[],
    onboarding: PathwayAssessmentFormValues
  ) {
    const ready = recommendations.filter((item) => item.explanation);
    const missing = recommendations.filter((item) => !item.explanation);

    if (!missing.length) {
      return recommendations;
    }

    const enrichedMissing = await this.explanationService.enrichRecommendations(
      missing,
      onboarding
    );
    const enrichedBySlug = new Map(
      enrichedMissing.map((item) => [item.slug, item.explanation])
    );

    return recommendations.map((item) => ({
      ...item,
      explanation: item.explanation ?? enrichedBySlug.get(item.slug),
    }));
  }

  private buildDirectionMatches(
    rankedPathways: RecommendationScoreSnapshot[]
  ): RecommendationDirectionMatch[] {
    const candidates = this.buildGroupCandidates(
      rankedPathways,
      (item) => ({
        key: item.direction.slug,
        title: item.direction.title,
      }),
      DIRECTION_COUNT
    );

    return candidates.map((item) => ({
      slug: item.key,
      title: item.title,
      totalScore: item.totalScore,
      matchPercent: item.matchPercent,
      pathwayCount: item.pathwayCount,
      topPathwaySlugs: item.topPathwaySlugs,
    }));
  }

  private buildFamilyMatches(
    rankedPathways: RecommendationScoreSnapshot[],
    directionMatches: RecommendationDirectionMatch[]
  ): RecommendationFamilyMatch[] {
    const topDirectionSlugs = new Set(
      directionMatches.slice(0, 2).map((item) => item.slug)
    );

    const candidates = this.buildGroupCandidates(
      rankedPathways.filter(
        (item) => item.family && topDirectionSlugs.has(item.direction.slug)
      ),
      (item) =>
        item.family
          ? {
              key: item.family.slug,
              title: item.family.title,
              direction: item.direction,
            }
          : null,
      FAMILY_COUNT
    );

    return candidates.map((item) => ({
      slug: item.key,
      title: item.title,
      direction: item.direction!,
      totalScore: item.totalScore,
      matchPercent: item.matchPercent,
      pathwayCount: item.pathwayCount,
      topPathwaySlugs: item.topPathwaySlugs,
    }));
  }

  private buildGroupCandidates(
    rankedPathways: RecommendationScoreSnapshot[],
    pickGroup: (item: RecommendationScoreSnapshot) => {
      key: string;
      title: string;
      direction?: RecommendationGroupRef;
    } | null,
    limit: number
  ) {
    const grouped = new Map<string, RecommendationGroupCandidate>();

    for (const item of rankedPathways) {
      const group = pickGroup(item);

      if (!group) {
        continue;
      }

      const existing = grouped.get(group.key);

      if (!existing) {
        grouped.set(group.key, {
          key: group.key,
          title: group.title,
          direction: group.direction,
          topEntries: [item],
          totalScore: 0,
          matchPercent: 0,
          pathwayCount: 1,
          topPathwaySlugs: [],
        });
        continue;
      }

      existing.topEntries.push(item);
      existing.pathwayCount += 1;
    }

    const scored = [...grouped.values()].map((group) => {
      const topEntries = group.topEntries
        .sort((a, b) => this.compareRecommendations(a, b))
        .slice(0, 3);
      const totalScore = Number(
        (
          topEntries.reduce(
            (sum, item) => sum + this.applyVisibilityWeight(item),
            0
          ) / topEntries.length
        ).toFixed(4)
      );

      return {
        ...group,
        topEntries,
        totalScore,
        matchPercent: this.toPercent(totalScore),
        topPathwaySlugs: topEntries.map((item) => item.slug),
      };
    });

    return scored
      .sort((a, b) => {
        if (b.totalScore !== a.totalScore) {
          return b.totalScore - a.totalScore;
        }

        if (b.pathwayCount !== a.pathwayCount) {
          return b.pathwayCount - a.pathwayCount;
        }

        return a.title.localeCompare(b.title);
      })
      .slice(0, limit);
  }

  private selectTopPathways(
    rankedPathways: Array<
      RecommendationScoreSnapshot & { explanation?: string | undefined }
    >
  ) {
    const visibleFirst = rankedPathways.filter(
      (item) => item.visibilityLayer !== 'specialized'
    );
    const selected = visibleFirst.slice(0, 3);

    if (selected.length >= 3) {
      return selected;
    }

    const selectedSlugs = new Set(selected.map((item) => item.slug));

    for (const item of rankedPathways) {
      if (selectedSlugs.has(item.slug)) {
        continue;
      }

      selected.push(item);

      if (selected.length >= 3) {
        break;
      }
    }

    return selected;
  }

  private resolveDirection(pathway: PathwayRecord) {
    const directionNode = pathway.taxonomyNodeIds.find(
      (node) => node.kind === 'domain'
    );

    if (!directionNode) return null;

    return {
      slug: directionNode.slug,
      title: directionNode.name,
    } satisfies RecommendationGroupRef;
  }

  private resolveFamily(pathway: PathwayRecord) {
    const familyNode = pathway.taxonomyNodeIds.find(
      (node) => node.kind === 'field'
    );

    if (!familyNode) return undefined;

    return {
      slug: familyNode.slug,
      title: familyNode.name,
    } satisfies RecommendationGroupRef;
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

    return {
      strongMatches: allMatches.filter((item) => item.band === 'strong').length,
      supportingMatches: allMatches.filter((item) => item.band === 'supporting')
        .length,
      penaltyConflicts: allMatches.filter((item) => item.band === 'penalty')
        .length,
      matchedDimensions,
    };
  }

  private compareRecommendations(
    a: RecommendationScoreSnapshot,
    b: RecommendationScoreSnapshot
  ) {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;

    if (b.rankingSignals.strongMatches !== a.rankingSignals.strongMatches)
      return b.rankingSignals.strongMatches - a.rankingSignals.strongMatches;

    if (
      b.rankingSignals.matchedDimensions !== a.rankingSignals.matchedDimensions
    )
      return (
        b.rankingSignals.matchedDimensions - a.rankingSignals.matchedDimensions
      );

    if (
      a.visibilityLayer !== b.visibilityLayer &&
      VISIBILITY_SCORE_WEIGHTS[a.visibilityLayer] !==
        VISIBILITY_SCORE_WEIGHTS[b.visibilityLayer]
    )
      return (
        VISIBILITY_SCORE_WEIGHTS[b.visibilityLayer] -
        VISIBILITY_SCORE_WEIGHTS[a.visibilityLayer]
      );

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

  private applyVisibilityWeight(item: RecommendationScoreSnapshot) {
    return Number(
      (
        item.totalScore * VISIBILITY_SCORE_WEIGHTS[item.visibilityLayer]
      ).toFixed(4)
    );
  }

  private toPercent(score: number) {
    return Math.max(0, Math.min(100, Math.round(score * 100)));
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
