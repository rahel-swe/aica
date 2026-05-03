import { z } from 'zod';
import {
  freeTimeEnum,
  goalsEnum,
  impactEnum,
  passionsEnum,
  strengthsEnum,
  subjectsEnum,
  workEnvironmentEnum,
  workStyleEnum,
} from './pathway-assessment-schema';

export const taxonomyNodeKindEnum = ['domain', 'field', 'specialization'];

export const taxonomyNodeStatusEnum = ['active', 'draft', 'archived'];

export const pathwayTypeEnum = ['study', 'career', 'hybrid'];

export const pathwayStatusEnum = ['active', 'draft', 'archived'];

export const scoreBandEnum = ['strong', 'supporting', 'weak', 'penalty'];

export const taxonomyNodeKindSchema = z.enum(taxonomyNodeKindEnum);
export const taxonomyNodeStatusSchema = z.enum(taxonomyNodeStatusEnum);
export const pathwayTypeSchema = z.enum(pathwayTypeEnum);
export const pathwayStatusSchema = z.enum(pathwayStatusEnum);
export const scoreBandSchema = z.enum(scoreBandEnum);

export const matchWeightSchema = z.object({
  value: z.string().min(1),
  weight: z.number().min(0).max(1),
  band: scoreBandSchema.default('supporting'),
});

export const taxonomyNodeSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  kind: taxonomyNodeKindSchema,
  parentId: z.string().nullable().default(null),
  description: z.string().optional(),
  order: z.number().int().nonnegative().default(0),
  status: taxonomyNodeStatusSchema.default('draft'),
});

export const pathwaySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  type: pathwayTypeSchema,
  taxonomyNodeIds: z.array(z.string()).min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  keySkills: z.array(z.string()).default([]),
  learningRoute: z.array(z.string()).default([]),
  opportunities: z.array(z.string()).default([]),
  relatedPathwayIds: z.array(z.string()).default([]),
  status: pathwayStatusSchema.default('draft'),
});

export const pathwayMatchProfileSchema = z.object({
  pathwayId: z.string().min(1),
  version: z.number().int().positive().default(1),
  strengths: z.array(
    matchWeightSchema.extend({
      value: z.enum(strengthsEnum),
    })
  ),
  subjects: z.array(
    matchWeightSchema.extend({
      value: z.enum(subjectsEnum),
    })
  ),
  passions: z.array(
    matchWeightSchema.extend({
      value: z.enum(passionsEnum),
    })
  ),
  freeTime: z.array(
    matchWeightSchema.extend({
      value: z.enum(freeTimeEnum),
    })
  ),
  workEnvironment: z.array(
    matchWeightSchema.extend({
      value: z.enum(workEnvironmentEnum),
    })
  ),
  workStyle: z.array(
    matchWeightSchema.extend({
      value: z.enum(workStyleEnum),
    })
  ),
  impact: z.array(
    matchWeightSchema.extend({
      value: z.enum(impactEnum),
    })
  ),
  goals: z.array(
    matchWeightSchema.extend({
      value: z.enum(goalsEnum),
    })
  ),
  notes: z.array(z.string()).default([]),
  status: pathwayStatusSchema.default('draft'),
});

export const taxonomyNodeSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  kind: taxonomyNodeKindSchema,
  parentId: z.string().nullable(),
});

export const relatedPathwaySummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: pathwayTypeSchema,
  summary: z.string(),
});

export const pathwayListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: pathwayTypeSchema,
  summary: z.string(),
  taxonomyNodes: z.array(taxonomyNodeSummarySchema),
  keySkills: z.array(z.string()),
});

export const pathwayDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: pathwayTypeSchema,
  summary: z.string(),
  description: z.string(),
  taxonomyNodes: z.array(taxonomyNodeSummarySchema),
  keySkills: z.array(z.string()),
  learningRoute: z.array(z.string()),
  opportunities: z.array(z.string()),
  relatedPathways: z.array(relatedPathwaySummarySchema),
});

export const pathwaysListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(pathwayListItemSchema),
});

export const pathwayDetailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: pathwayDetailSchema,
});
