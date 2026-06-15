import type {
  PathwayDurationProfile,
  PathwayRouteType,
  PathwayCommitmentLevel,
  DegreeRequirement,
} from '@contracts/shared/types/pathway-domain-types';

// ── Slug → display name ───────────────────────────────────────────────────────

const UPPERCASE_TOKENS = new Set([
  'stem',
  'it',
  'ai',
  'hr',
  'erp',
  'crm',
  'ict',
  'ngo',
  'ui',
  'ux',
]);

export const formatSlug = (slug: string): string =>
  slug
    .replaceAll('-', ' ')
    .split(' ')
    .map((word) =>
      UPPERCASE_TOKENS.has(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');

// ── Enum → readable label ─────────────────────────────────────────────────────

const ROUTE_TYPE_LABELS: Record<PathwayRouteType, string> = {
  skill_route: 'Self-taught',
  portfolio_route: 'Portfolio-based',
  vocational_route: 'Vocational / Trade',
  certification_route: 'Certification',
  degree_route: 'University Degree',
  regulated_degree: 'Regulated Degree',
  hybrid_route: 'Hybrid',
};

const COMMITMENT_LABELS: Record<PathwayCommitmentLevel, string> = {
  short: 'Short-term',
  medium: 'Mid-term',
  long: 'Long-term',
};

const DEGREE_LABELS: Record<DegreeRequirement, string> = {
  not_required: 'No degree required',
  optional: 'Degree optional',
  preferred: 'Degree preferred',
  required: 'Degree required',
};

export const formatRouteType = (type: PathwayRouteType): string =>
  ROUTE_TYPE_LABELS[type];

export const formatCommitmentLevel = (level: PathwayCommitmentLevel): string =>
  COMMITMENT_LABELS[level];

export const formatDegreeRequirement = (req: DegreeRequirement): string =>
  DEGREE_LABELS[req];

export const formatDuration = (profile: PathwayDurationProfile): string => {
  if (profile.estimatedYearsMin && profile.estimatedYearsMax) {
    return profile.estimatedYearsMin === profile.estimatedYearsMax
      ? `${profile.estimatedYearsMin} yr`
      : `${profile.estimatedYearsMin}–${profile.estimatedYearsMax} yrs`;
  }
  if (profile.estimatedYearsMin) return `${profile.estimatedYearsMin}+ yrs`;

  if (profile.estimatedMonthsMin && profile.estimatedMonthsMax) {
    return profile.estimatedMonthsMin === profile.estimatedMonthsMax
      ? `${profile.estimatedMonthsMin} mo`
      : `${profile.estimatedMonthsMin}–${profile.estimatedMonthsMax} mo`;
  }
  if (profile.estimatedMonthsMin) return `${profile.estimatedMonthsMin}+ mo`;

  return 'Duration varies';
};
