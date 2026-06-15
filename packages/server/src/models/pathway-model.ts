import { Schema, model, type HydratedDocument, type Types } from 'mongoose';

import { contentStatusSchema } from '@contracts/shared/schemas/content-status';
import {
  degreeRequirementEnum,
  pathwayCommitmentLevelEnum,
  pathwayRouteTypeEnum,
  pathwayTypeEnum,
  pathwayVisibilityLayerEnum,
} from '@contracts/shared/schemas/pathway-domain-schema';

import type {
  ContentStatus,
  PathwayDurationProfile,
  PathwayJourneyPhase,
  PathwayTranslatableFields,
  PathwayType,
  PathwayVisibilityLayer,
} from '@contracts/shared/types/pathway-domain-types';

const contentStatusEnum = contentStatusSchema.options;

const journeyPhaseSchema = new Schema<PathwayJourneyPhase>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    focus: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const pathwayTranslationSchema = new Schema<PathwayTranslatableFields>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    keySkills: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length >= 4,
        message: 'keySkills must contain at least 4 items',
      },
    },
    opportunities: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length >= 4,
        message: 'opportunities must contain at least 4 items',
      },
    },
    verificationNote: {
      type: String,
      trim: true,
    },
    journeyPhases: {
      type: [journeyPhaseSchema],
      required: true,
      validate: {
        validator: (v: PathwayJourneyPhase[]) =>
          Array.isArray(v) && v.length >= 3,
        message: 'journeyPhases must contain at least 3 phases',
      },
    },
    roadmapWindowLabel: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

/**
 * MongoDB / Mongoose document shape.
 * Keep this separate from your API-facing PathwayDocument type,
 * because Mongo stores ObjectIds, not string ids.
 */
export interface PathwayDbDocument {
  slug: string;
  version: number;

  type: PathwayType;
  status: ContentStatus;
  visibilityLayer: PathwayVisibilityLayer;

  durationProfile: PathwayDurationProfile;

  taxonomyNodeIds: Types.ObjectId[];
  relatedPathwayIds: Types.ObjectId[];

  matchProfileId: Types.ObjectId;

  translations: Map<string, PathwayTranslatableFields>;

  createdAt: Date;
  updatedAt: Date;
}

export type PathwayDocumentModel = HydratedDocument<PathwayDbDocument>;

const durationProfileSchema = new Schema<PathwayDurationProfile>(
  {
    commitmentLevel: {
      type: String,
      enum: pathwayCommitmentLevelEnum,
      required: true,
    },
    routeType: {
      type: String,
      enum: pathwayRouteTypeEnum,
      required: true,
    },
    degreeRequirement: {
      type: String,
      enum: degreeRequirementEnum,
      required: true,
    },

    estimatedMonthsMin: {
      type: Number,
      min: 1,
    },
    estimatedMonthsMax: {
      type: Number,
      min: 1,
    },
    estimatedYearsMin: {
      type: Number,
      min: 1,
    },
    estimatedYearsMax: {
      type: Number,
      min: 1,
    },

    requiresLicense: {
      type: Boolean,
      default: false,
    },
    localRulesRequired: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const pathwaySchema = new Schema<PathwayDbDocument>(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    version: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    type: {
      type: String,
      enum: pathwayTypeEnum,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: contentStatusEnum,
      required: true,
      default: 'draft',
      index: true,
    },

    visibilityLayer: {
      type: String,
      enum: pathwayVisibilityLayerEnum,
      required: true,
      default: 'adjacent',
      index: true,
    },

    durationProfile: {
      type: durationProfileSchema,
      required: true,
    },

    taxonomyNodeIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'TaxonomyNode',
          required: true,
        },
      ],
      required: true,
      validate: {
        validator: (value: Types.ObjectId[]) =>
          Array.isArray(value) && value.length > 0,
        message: 'taxonomyNodeIds must contain at least one TaxonomyNode id',
      },
    },

    relatedPathwayIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Pathway',
        },
      ],
      default: [],
    },

    matchProfileId: {
      type: Schema.Types.ObjectId,
      ref: 'PathwayMatchProfile',
      required: true,
      index: true,
    },

    translations: {
      type: Map,
      of: pathwayTranslationSchema,
      required: true,
      default: () => new Map<string, PathwayTranslatableFields>(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

pathwaySchema.index({ taxonomyNodeIds: 1, status: 1 });
pathwaySchema.index({ visibilityLayer: 1, status: 1 });

export const PathwayModel = model<PathwayDbDocument>('Pathway', pathwaySchema);
