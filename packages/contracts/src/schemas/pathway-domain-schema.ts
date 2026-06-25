import { z } from 'zod';
import { contentStatusSchema } from './content-status';
import {
  collaborationStyleEnum,
  goalsEnum,
  impactEnum,
  learningPreferenceEnum,
  passionsEnum,
  strengthsEnum,
  subjectsEnum,
  workEnvironmentEnum,
  workStyleEnum,
} from './pathway-assessment-schema';

// TAXONOMY
// ─────────────────────────────────────────────────────────────────────────────

export const taxonomyNodeKindEnum = [
  'domain', // top level — Technology, Healthcare, Business …
  'field', // mid level — Software Development, Clinical Medicine …
  'specialization', // leaf level — Frontend Development, General Practice …
] as const;

export const taxonomyNodeKindSchema = z.enum(taxonomyNodeKindEnum);

// Zod schemas for taxonomy API responses
export const taxonomyNodeViewSchema = z.object({
  id: z.string(),
  slug: z.string(),
  kind: taxonomyNodeKindSchema,
  parentId: z.string().nullable(),
  order: z.number().int().nonnegative(),
  name: z.string().min(1),
  description: z.string().optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// PATHWAY ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export const pathwayTypeEnum = ['study', 'career', 'hybrid'] as const;
export const pathwayTypeSchema = z.enum(pathwayTypeEnum);

export const pathwayVisibilityLayerEnum = [
  'primary', // broad-appeal pathways — always surfaced for relevant profiles
  'adjacent', // require more specific profile alignment to surface
  'specialized', // niche — only surfaces for highly specific profiles
] as const;
export const pathwayVisibilityLayerSchema = z.enum(pathwayVisibilityLayerEnum);

// Renamed from pathwayTimelineTypeEnum — "route" better describes what this is.
// Hyphens → underscores for consistency. Added certification_route.
export const pathwayRouteTypeEnum = [
  'skill_route', // learned independently, no formal credential required
  'portfolio_route', // proven through a body of work (design, dev, writing)
  'vocational_route', // trade-school or apprenticeship path
  'certification_route', // professional certification without a full degree (CPA, AWS, ACCA)
  'degree_route', // standard university degree
  'regulated_degree', // degree with mandatory state/professional licensing
  'hybrid_route', // combination of the above (e.g. degree + portfolio)
] as const;
export const pathwayRouteTypeSchema = z.enum(pathwayRouteTypeEnum);

export const pathwayCommitmentLevelEnum = ['short', 'medium', 'long'] as const;
export const pathwayCommitmentLevelSchema = z.enum(pathwayCommitmentLevelEnum);

export const degreeRequirementEnum = [
  'not_required',
  'optional',
  'preferred',
  'required',
] as const;

export const degreeRequirementSchema = z.enum(degreeRequirementEnum);

// ─────────────────────────────────────────────────────────────────────────────
// PATHWAY DURATION PROFILE
// Note: roadmapWindowLabel moved to PathwayTranslatableFields (it's user-facing text)
// ─────────────────────────────────────────────────────────────────────────────

export const pathwayDurationProfileSchema = z.object({
  commitmentLevel: pathwayCommitmentLevelSchema,
  routeType: pathwayRouteTypeSchema, // was timelineType
  degreeRequirement: degreeRequirementSchema,
  estimatedMonthsMin: z.number().int().positive().optional(),
  estimatedMonthsMax: z.number().int().positive().optional(),
  estimatedYearsMin: z.number().int().positive().optional(),
  estimatedYearsMax: z.number().int().positive().optional(),
  requiresLicense: z.boolean().default(false),
  localRulesRequired: z.boolean().default(false),
});

// PATHWAY TRANSLATABLE FIELDS
// ─────────────────────────────────────────────────────────────────────────────

export const pathwayJourneyPhaseSchema = z.object({
  name: z.string().min(1),
  duration: z.string().min(1),
  focus: z.string().min(1),
});

export const pathwayTranslatableFieldsSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  keySkills: z.array(z.string()).min(4),
  opportunities: z.array(z.string()).min(4),
  verificationNote: z.string().optional(), // localized licensing/cert notes
  journeyPhases: z.array(pathwayJourneyPhaseSchema).min(3),
  roadmapWindowLabel: z.string().min(1), // e.g. "Next 12 months" (was in durationProfile)
});

// ─────────────────────────────────────────────────────────────────────────────
// API RESPONSE SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

export const pathwayListViewSchema = z.object({
  id: z.string(),
  slug: z.string(),
  type: pathwayTypeSchema,
  status: contentStatusSchema,
  visibilityLayer: pathwayVisibilityLayerSchema,
  durationProfile: pathwayDurationProfileSchema,
  taxonomyNodes: z.array(taxonomyNodeViewSchema),
  title: z.string(),
  summary: z.string(),
  keySkills: z.array(z.string()),
  roadmapWindowLabel: z.string(),
});

export const pathwayListPayloadSchema = z.object({
  items: z.array(pathwayListViewSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});

export const pathwaysListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: pathwayListPayloadSchema,
});

export const pathwayDetailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: pathwayListViewSchema.extend({
    description: z.string(),
    opportunities: z.array(z.string()),
    verificationNote: z.string().optional(),
    journeyPhases: z.array(pathwayJourneyPhaseSchema),
    relatedPathways: z.array(
      z.object({
        id: z.string(),
        slug: z.string(),
        type: pathwayTypeSchema,
        title: z.string(),
        summary: z.string(),
      })
    ),
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// SCORE BAND  (match profile weighting bands)
// ─────────────────────────────────────────────────────────────────────────────

export const scoreBandEnum = [
  'strong',
  'supporting',
  'weak',
  'penalty',
] as const;

export const scoreBandSchema = z.enum(scoreBandEnum);

export const matchWeightEntrySchema = z.object({
  value: z.string().min(1),
  weight: z.number().min(0).max(1),
  band: scoreBandSchema.default('supporting'),
});

// Typed entry factory — use inside dimension-specific schemas
const dimensionWeightSchema = <T extends readonly [string, ...string[]]>(
  valuesEnum: T
) =>
  matchWeightEntrySchema.extend({
    value: z.enum(valuesEnum),
  });

// ─────────────────────────────────────────────────────────────────────────────
// PATHWAY MATCH PROFILE  (9-dimension scoring data)
// ─────────────────────────────────────────────────────────────────────────────

export const pathwayMatchProfileSchema = z
  .object({
    pathwayId: z.string().min(1),
    version: z.number().int().positive().default(1),
    status: contentStatusSchema.default('draft'),

    // Dimension arrays — each value must match the assessment enum for that dimension
    strengths: z.array(dimensionWeightSchema(strengthsEnum)),
    passions: z.array(dimensionWeightSchema(passionsEnum)),
    subjects: z.array(dimensionWeightSchema(subjectsEnum)),
    learningPreference: z.array(dimensionWeightSchema(learningPreferenceEnum)), // ← NEW
    workEnvironment: z.array(dimensionWeightSchema(workEnvironmentEnum)),
    workStyle: z.array(dimensionWeightSchema(workStyleEnum)),
    collaborationStyle: z.array(dimensionWeightSchema(collaborationStyleEnum)), // ← NEW
    impact: z.array(dimensionWeightSchema(impactEnum)),
    goals: z.array(dimensionWeightSchema(goalsEnum)),

    notes: z.array(z.string()).default([]),
  })
  .refine(
    // Minimum coverage guard — prevents silent 0-score dimensions
    (p) =>
      p.passions.length >= 3 &&
      p.strengths.length >= 3 &&
      p.goals.length >= 2 &&
      p.learningPreference.length >= 2 &&
      p.collaborationStyle.length >= 2,
    {
      message:
        'Match profile must define ≥ 3 passions, ≥ 3 strengths, ≥ 2 goals, ' +
        '≥ 2 learningPreference, and ≥ 2 collaborationStyle entries.',
    }
  );
