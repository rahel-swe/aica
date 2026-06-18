/**
 * recommendation-reasons.ts
 *
 * Rule-based reason builder. No LLM. Always runs at scoring time.
 * Output: top 3 human-readable strings stored in recommendation.reasons[].
 *
 * These are the quick "why" signals shown on recommendation cards.
 * Deep LLM explanation lives in recommendation-explanation.service.ts
 * and is generated on-demand when the user clicks "Why?".
 */

import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import type {
  PathwayMatchProfile,
  RecommendationDimensionScores,
} from '@contracts/shared/types/pathway-domain-types';

// ── Human-readable value labels ───────────────────────────────────────────────
// Maps raw enum values to the labels users saw in the assessment.
// Keeps reasons readable without importing frontend UI data.

const VALUE_LABELS: Record<string, Record<string, string>> = {
  strengths: {
    problem_solving: 'problem solving',
    creativity: 'creative thinking',
    people: 'people connection',
    analytical: 'analytical mind',
    communication: 'communication',
    hands_on: 'hands-on building',
    fast_learning: 'quick adaptation',
    organized: 'focus and structure',
  },
  passions: {
    tech: 'tech and digital',
    music: 'music and arts',
    sports: 'sports and movement',
    reading: 'reading and ideas',
    science: 'science and discovery',
    social: 'people and community',
    nature: 'nature and environment',
    building: 'building and making',
    ideas: 'ideas and innovation',
  },
  learningPreference: {
    practice: 'hands-on practice',
    courses: 'structured courses',
    research: 'reading and research',
    watching: 'video and demos',
    teaching: 'teaching and explaining',
  },
  workStyle: {
    analyze: 'analyzing information',
    help: 'helping people',
    build: 'building and fixing',
    create: 'creating and innovating',
    routine: 'structured execution',
  },
  collaborationStyle: {
    solo: 'working independently',
    small_team: 'working in a small team',
    large_team: 'working in a large team',
    client_facing: 'client-facing work',
    community: 'community-facing work',
  },
  workEnvironment: {
    office: 'office environment',
    remote: 'remote work',
    outdoor: 'outdoor or on-site work',
    lab: 'lab or studio environment',
    mixed: 'varied environments',
  },
  impact: {
    create: 'creating useful things',
    people: 'direct work with people',
    discover: 'discovering new knowledge',
    systems: 'building important systems',
    express: 'expressing creativity',
  },
  goals: {
    impact: 'making a difference',
    money: 'financial stability',
    balance: 'work-life balance',
    growth: 'continuous growth',
    variety: 'challenge and variety',
  },
  subjects: {
    math: 'math and numbers',
    science: 'science and experiments',
    writing: 'writing and language',
    arts: 'arts and creativity',
    social: 'history and social studies',
  },
};

function label(dimension: string, value: string): string {
  return VALUE_LABELS[dimension]?.[value] ?? value.replaceAll('_', ' ');
}

// ── Reason templates ──────────────────────────────────────────────────────────
// Each function produces a single reason string for a given dimension.

type DimensionReasonBuilder = (
  assessment: PathwayAssessmentFormValues,
  score: number
) => string | null;

const DIMENSION_REASON_BUILDERS: Partial<
  Record<keyof RecommendationDimensionScores, DimensionReasonBuilder>
> = {
  strengths: (a) => {
    if (!a.strengths.length) return null;
    const top = a.strengths.slice(0, 2).map((v) => label('strengths', v));
    return top.length === 1
      ? `Your ${top[0]} strength aligns with the core demands of this path`
      : `Your ${top[0]} and ${top[1]} strengths align with the core demands of this path`;
  },

  passions: (a) => {
    if (!a.passions.length) return null;
    const top = a.passions.slice(0, 2).map((v) => label('passions', v));
    return top.length === 1
      ? `Your passion for ${top[0]} connects directly to this field`
      : `Your interest in ${top[0]} and ${top[1]} connects directly to this field`;
  },

  subjects: (a) => {
    return `Your strength in ${label('subjects', a.subjects)} supports the academic side of this path`;
  },

  learningPreference: (a) => {
    if (!a.learningPreference.length) return null;
    const top = a.learningPreference[0];
    return `Your preference for ${label('learningPreference', top)} fits how this path is best learned`;
  },

  workStyle: (a) => {
    if (!a.workStyle.length) return null;
    const top = a.workStyle.slice(0, 2).map((v) => label('workStyle', v));
    return top.length === 1
      ? `Your work style of ${top[0]} is at the core of this career`
      : `Your work style — ${top[0]} and ${top[1]} — matches the daily work in this field`;
  },

  collaborationStyle: (a) => {
    return `Your preference for ${label('collaborationStyle', a.collaborationStyle)} matches how people in this field typically work`;
  },

  workEnvironment: (a) => {
    return `Your preferred ${label('workEnvironment', a.workEnvironment)} is common and realistic in this path`;
  },

  impact: (a) => {
    if (!a.impact.length) return null;
    const top = a.impact[0];
    return `Your desire to spend time ${label('impact', top)} aligns with what this career produces`;
  },

  goals: (a) => {
    return `Your goal of ${label('goals', a.goals)} is well-supported by this pathway's long-term outcomes`;
  },
};

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Builds up to 3 human-readable reason strings for a recommendation.
 *
 * Picks the top-scoring dimensions (above a minimum threshold),
 * generates a reason for each using the user's actual assessment values,
 * and returns the top 3.
 *
 * If a dimension scored below MIN_REASON_SCORE it is not mentioned —
 * we never say "matches because of X" when the match is poor.
 */
export function buildReasons(
  assessment: PathwayAssessmentFormValues,
  _profile: PathwayMatchProfile,
  dimensionScores: RecommendationDimensionScores
): string[] {
  const MIN_REASON_SCORE = 0.35;

  // Sort dimensions by score descending — mention best matches first
  const ranked = (
    Object.entries(dimensionScores) as Array<
      [keyof RecommendationDimensionScores, number]
    >
  )
    .filter(([, score]) => score >= MIN_REASON_SCORE)
    .sort(([, a], [, b]) => b - a);

  const reasons: string[] = [];

  for (const [dimension] of ranked) {
    if (reasons.length >= 3) break;

    const builder = DIMENSION_REASON_BUILDERS[dimension];
    if (!builder) continue;

    const reason = builder(assessment, dimensionScores[dimension]);
    if (reason) reasons.push(reason);
  }

  return reasons;
}
