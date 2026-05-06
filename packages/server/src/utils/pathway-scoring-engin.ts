import type {
  MatchWeight,
  ScoreBand,
} from '@contracts/shared/types/pathway-domain-types';

export const DIMENSION_WEIGHTS = {
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

class PathwayScoringEngine {
  scoreMultiValueDimension(
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

  scoreSingleValueDimension(selectedValue: string, weights: MatchWeightItem[]) {
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

  getBandMultiplier(band: ScoreBand) {
    return BAND_MULTIPLIERS[band] ?? BAND_MULTIPLIERS.supporting;
  }
}

export const pathwayScoringEngine = new PathwayScoringEngine();
