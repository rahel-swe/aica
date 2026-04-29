import type { OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import type {
  MatchWeight,
  Pathway,
  PathwayMatchProfile,
  RecommendationResult,
  ScoreBand,
} from '@contracts/shared/types/pathway-domain-types';
import { OnboardingRepository } from '../repositories/onboarding-repository';
import { PathwayMatchProfileRepository } from '../repositories/pathway-match-profile-repository';
import { PathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { RecommendationExplanationService } from './recommendation-explanation-service';

const onboardingRepo = new OnboardingRepository();
const pathwayRepo = new PathwayRepository();
const profileRepo = new PathwayMatchProfileRepository();
const explanationService = new RecommendationExplanationService();

const DIMENSION_WEIGHTS = {
  strengths: 0.2,
  subjects: 0.1,
  passions: 0.2,
  freeTime: 0.1,
  workEnvironment: 0.1,
  workStyle: 0.1,
  impact: 0.1,
  goals: 0.1,
} as const;

const BAND_MULTIPLIERS = {
  strong: 1,
  supporting: 0.75,
  weak: 0.4,
  penalty: -0.5,
} as const;

type MatchWeightItem = {
  value: MatchWeight['value'];
  weight: MatchWeight['weight'];
  band: ScoreBand;
};

type OnboardingShape = OnboardingFormValues;
type PathwayProfileShape = PathwayMatchProfile;
type PathwayRecord = Pathway & { _id: string };

export class RecommendationService {
  async generateRecommendations(
    userId: string
  ): Promise<RecommendationResult[]> {
    const onboarding = (await onboardingRepo.findByUserId(
      userId
    )) as OnboardingShape | null;

    if (!onboarding) {
      throw new Error(
        'Complete onboarding first before generating recommendations.'
      );
    }

    const profiles =
      (await profileRepo.findAllActive()) as PathwayProfileShape[];

    if (!profiles.length) {
      throw new Error('No active pathway match profiles found.');
    }

    const pathwayIds = profiles.map((profile) => String(profile.pathwayId));
    const pathways = (await pathwayRepo.findActiveByIds(
      pathwayIds
    )) as PathwayRecord[];
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
          strengths: this.scoreMultiValueDimension(
            onboarding.strengths,
            profile.strengths
          ),
          subjects: this.scoreSingleValueDimension(
            onboarding.subjects,
            profile.subjects
          ),
          passions: this.scoreMultiValueDimension(
            onboarding.passions,
            profile.passions
          ),
          freeTime: this.scoreSingleValueDimension(
            onboarding.freeTime,
            profile.freeTime
          ),
          workEnvironment: this.scoreSingleValueDimension(
            onboarding.workEnvironment,
            profile.workEnvironment
          ),
          workStyle: this.scoreSingleValueDimension(
            onboarding.workStyle,
            profile.workStyle
          ),
          impact: this.scoreSingleValueDimension(
            onboarding.impact,
            profile.impact
          ),
          goals: this.scoreSingleValueDimension(
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
          reasons: this.buildReasons(onboarding, profile),
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

    const enriched = await explanationService.enrichRecommendations(
      ranked,
      onboarding
    );

    await recommendationRepository.replaceForUser(
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
    const existing = await recommendationRepository.findByUserId(userId);

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

  private scoreMultiValueDimension(
    selectedValues: string[],
    weights: MatchWeightItem[]
  ) {
    if (!weights.length || !selectedValues.length) {
      return 0;
    }

    const totalPossible = weights.reduce(
      (sum, item) => sum + item.weight * this.getBandMultiplier(item.band),
      0
    );

    if (totalPossible <= 0) {
      return 0;
    }

    const matchedScore = weights.reduce((sum, item) => {
      if (!selectedValues.includes(item.value)) {
        return sum;
      }

      return sum + item.weight * this.getBandMultiplier(item.band);
    }, 0);

    return Number(Math.max(0, matchedScore / totalPossible).toFixed(4));
  }

  private scoreSingleValueDimension(
    selectedValue: string,
    weights: MatchWeightItem[]
  ) {
    if (!weights.length || !selectedValue) {
      return 0;
    }

    const match = weights.find((item) => item.value === selectedValue);

    if (!match) {
      return 0;
    }

    return Number(
      Math.max(0, match.weight * this.getBandMultiplier(match.band)).toFixed(4)
    );
  }

  private getBandMultiplier(band: ScoreBand) {
    // these type later create separate 'penalty' | 'weak' | 'supporting' | 'strong'
    return (
      BAND_MULTIPLIERS[band as 'penalty' | 'weak' | 'supporting' | 'strong'] ??
      BAND_MULTIPLIERS.supporting
    );
  }

  private buildReasons(
    onboarding: OnboardingShape,
    profile: PathwayProfileShape
  ) {
    const reasons: string[] = [];

    const strongestStrength = profile.strengths
      .filter((item) => onboarding.strengths.includes(item.value))
      .sort((a, b) => b.weight - a.weight)[0];

    if (strongestStrength) {
      reasons.push(
        `Matches your strength in ${strongestStrength.value.replaceAll('_', ' ')}.`
      );
    }

    const subjectMatch = profile.subjects.find(
      (item) => item.value === onboarding.subjects
    );

    if (subjectMatch) {
      reasons.push(
        `Aligns with your subject preference in ${subjectMatch.value}.`
      );
    }

    const passionMatch = profile.passions.find((item) =>
      onboarding.passions.includes(item.value)
    );

    if (passionMatch) {
      reasons.push(`Connects with your interest in ${passionMatch.value}.`);
    }

    const workStyleMatch = profile.workStyle.find(
      (item) => item.value === onboarding.workStyle
    );

    if (workStyleMatch) {
      reasons.push(
        `Fits your preferred work style: ${workStyleMatch.value.replaceAll('_', ' ')}.`
      );
    }

    const impactMatch = profile.impact.find(
      (item) => item.value === onboarding.impact
    );

    if (impactMatch) {
      reasons.push(
        `Supports the kind of impact you value: ${impactMatch.value}.`
      );
    }

    return reasons.slice(0, 4);
  }
}
