import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import type {
  MatchWeightEntry,
  PathwayMatchProfile,
  RecommendationDimensionScores,
} from '@contracts/shared/types/pathway-domain-types';
import type { ScoreBand } from '@contracts/shared/types/pathway-domain-types';

// ── Matching version
// Increment this when DIMENSION_WEIGHTS or scoring logic changes.
// Recommendations with a lower matchingVersion are stale and should be re-scored.
export const CURRENT_MATCHING_VERSION = 2;

// ── Dimension weights
// Rationale:
//   strengths + passions:  0.20 each — strongest long-term career predictors
//   goals:                 0.12      — forced single-select, high signal
//   workStyle:             0.12      — multi-select, captures composite work identity
//   impact:                0.10      — multi-select, professional values
//   subjects:              0.08      — academic alignment signal
//   learningPreference:    0.08      — the way user can learn well (stronger predictor)
//   workEnvironment:       0.05      — location context, less differentiating
//   collaborationStyle:    0.05      — conservative start
// Sum: 1.00

export const DIMENSION_WEIGHTS = {
  strengths: 0.2,
  passions: 0.2,
  goals: 0.12,
  workStyle: 0.12,
  impact: 0.1,
  subjects: 0.08,
  learningPreference: 0.08,
  workEnvironment: 0.05,
  collaborationStyle: 0.05,
} as const satisfies Record<keyof RecommendationDimensionScores, number>;

// ── Dimension type registry ───────────────────────────────────────────────────
// Determines which scoring method is used per dimension.
// Update this when assessment structure changes — never hardcode in service layer.
export const MULTI_VALUE_DIMENSIONS = new Set<
  keyof RecommendationDimensionScores
>(['strengths', 'passions', 'learningPreference', 'workStyle', 'impact']);

export const SINGLE_VALUE_DIMENSIONS = new Set<
  keyof RecommendationDimensionScores
>(['subjects', 'workEnvironment', 'collaborationStyle', 'goals']);

// ── Band multipliers
// penalty is negative — it actively reduces the dimension score
// when a user selects a value that is a clear misalignment for this pathway.
const BAND_MULTIPLIERS: Record<ScoreBand, number> = {
  strong: 1.0,
  supporting: 0.75,
  weak: 0.4,
  penalty: -0.5,
};

// Minimum dimension score — prevents extreme negative values from one penalty
// dominating the total score disproportionately.
const MIN_DIMENSION_SCORE = -0.2;

type MatchWeightItem = {
  value: MatchWeightEntry['value'];
  weight: MatchWeightEntry['weight'];
  band: ScoreBand;
};

// ── Scoring engine
class PathwayScoringEngine {
  // ── Band multiplier
  getBandMultiplier(band: ScoreBand): number {
    return BAND_MULTIPLIERS[band] ?? BAND_MULTIPLIERS.supporting;
  }

  // ── Multi-value dimension scoring
  // For dimensions where the user selects 1–N values (strengths, passions,
  // learningPreference, workStyle, impact).

  // Normalizes matchedScore against the sum of positive-band weights only.
  // Penalty items reduce the numerator but don't inflate the denominator,
  // ensuring a pathway with strong+penalty isn't penalized for having a rich profile.

  scoreMultiValueDimension(
    selectedValues: string[],
    weights: MatchWeightItem[]
  ): number {
    if (!weights.length || !selectedValues.length) return 0;

    // Denominator: sum of positive-band contributions only
    const totalPossible = weights.reduce((sum, w) => {
      const m = this.getBandMultiplier(w.band);

      return m > 0 ? sum + w.weight * m : sum;
    }, 0);

    if (totalPossible <= 0) return 0;

    // Numerator: matched weights × multipliers (can be negative for penalties)
    const matchedScore = weights.reduce((sum, w) => {
      if (!selectedValues.includes(w.value)) return sum;
      return sum + w.weight * this.getBandMultiplier(w.band);
    }, 0);

    const raw = matchedScore / totalPossible;
    return Number(Math.min(1, Math.max(MIN_DIMENSION_SCORE, raw)).toFixed(4));
  }

  // ── Single-value dimension scoring ───────────────────────────────────────────
  // For dimensions where the user selects exactly 1 value (subjects,
  // workEnvironment, collaborationStyle, goals).
  //
  // Normalizes the matched weight against the total possible positive weight
  // for this dimension — consistent scale with multi-value scoring.
  //
  // Returns a value in [MIN_DIMENSION_SCORE, 1.0].
  scoreSingleValueDimension(
    selectedValue: string,
    weights: MatchWeightItem[]
  ): number {
    if (!weights.length || !selectedValue) return 0;

    // Denominator: sum of positive-band contributions
    const totalPossible = weights.reduce((sum, w) => {
      const m = this.getBandMultiplier(w.band);
      return m > 0 ? sum + w.weight * m : sum;
    }, 0);

    if (totalPossible <= 0) return 0;

    const match = weights.find((w) => w.value === selectedValue);
    if (!match) return 0;

    const raw =
      (match.weight * this.getBandMultiplier(match.band)) / totalPossible;

    return Number(Math.min(1, Math.max(MIN_DIMENSION_SCORE, raw)).toFixed(4));
  }

  // ── Dimension score builder ───────────────────────────────────────────────────
  // Uses the MULTI_VALUE_DIMENSIONS registry to route each dimension to the
  // correct scoring method. No hardcoding in the service layer.
  buildDimensionScores(
    assessment: PathwayAssessmentFormValues,
    profile: PathwayMatchProfile
  ): RecommendationDimensionScores {
    return {
      strengths: this.scoreMultiValueDimension(
        assessment.strengths,
        profile.strengths
      ),
      passions: this.scoreMultiValueDimension(
        assessment.passions,
        profile.passions
      ),
      subjects: this.scoreSingleValueDimension(
        assessment.subjects,
        profile.subjects
      ),
      learningPreference: this.scoreMultiValueDimension(
        assessment.learningPreference,
        profile.learningPreference
      ),
      workEnvironment: this.scoreMultiValueDimension(
        assessment.workEnvironment,
        profile.workEnvironment
      ),
      workStyle: this.scoreMultiValueDimension(
        assessment.workStyle,
        profile.workStyle
      ),
      collaborationStyle: this.scoreSingleValueDimension(
        assessment.collaborationStyle,
        profile.collaborationStyle
      ),
      impact: this.scoreMultiValueDimension(assessment.impact, profile.impact),
      goals: this.scoreSingleValueDimension(assessment.goals, profile.goals),
    };
  }

  // ── Total score
  // Weighted sum of all dimension scores, clamped to [0, 1].
  // Penalty-driven negative dimension scores reduce the total but
  // the displayed matchPercent is always ≥ 0.
  calculateTotalScore(dimensionScores: RecommendationDimensionScores): number {
    const raw = (
      Object.entries(DIMENSION_WEIGHTS) as Array<
        [keyof RecommendationDimensionScores, number]
      >
    ).reduce(
      (sum, [dim, weight]) => sum + (dimensionScores[dim] ?? 0) * weight,
      0
    );

    return Number(Math.min(1, Math.max(0, raw)).toFixed(4));
  }

  // ── Match percent ───
  toMatchPercent(totalScore: number): number {
    return Math.round(totalScore * 100);
  }
}

export const pathwayScoringEngine = new PathwayScoringEngine();
