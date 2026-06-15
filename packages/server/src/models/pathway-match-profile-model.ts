import { Schema, model, type HydratedDocument, type Types } from 'mongoose';

import { contentStatusSchema } from '@contracts/shared/schemas/content-status';

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
} from '@contracts/shared/schemas/pathway-assessment-schema';

import { scoreBandEnum } from '@contracts/shared/schemas/pathway-domain-schema';

import type {
  ContentStatus,
  MatchWeightEntry,
} from '@contracts/shared/types/pathway-domain-types';

const contentStatusEnum = contentStatusSchema.options;

const createWeightSchema = (allowedValues: readonly string[]) =>
  new Schema<MatchWeightEntry>(
    {
      value: {
        type: String,
        enum: allowedValues,
        required: true,
      },

      weight: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
      },

      band: {
        type: String,
        enum: scoreBandEnum,
        default: 'supporting',
      },
    },
    {
      _id: false,
    }
  );

const strengthWeightSchema = createWeightSchema(strengthsEnum);

const passionWeightSchema = createWeightSchema(passionsEnum);

const subjectWeightSchema = createWeightSchema(subjectsEnum);

const learningPreferenceWeightSchema = createWeightSchema(
  learningPreferenceEnum
);

const collaborationStyleWeightSchema = createWeightSchema(
  collaborationStyleEnum
);

const workEnvironmentWeightSchema = createWeightSchema(workEnvironmentEnum);

const workStyleWeightSchema = createWeightSchema(workStyleEnum);

const impactWeightSchema = createWeightSchema(impactEnum);

const goalWeightSchema = createWeightSchema(goalsEnum);

export interface PathwayMatchProfileDbDocument {
  pathwayId: Types.ObjectId;

  version: number;

  status: ContentStatus;

  strengths: MatchWeightEntry[];
  passions: MatchWeightEntry[];
  subjects: MatchWeightEntry[];

  learningPreference: MatchWeightEntry[];
  collaborationStyle: MatchWeightEntry[];

  workEnvironment: MatchWeightEntry[];
  workStyle: MatchWeightEntry[];

  impact: MatchWeightEntry[];
  goals: MatchWeightEntry[];

  notes: string[];

  createdAt: Date;
  updatedAt: Date;
}

export type PathwayMatchProfileDocumentModel =
  HydratedDocument<PathwayMatchProfileDbDocument>;

const pathwayMatchProfileSchema = new Schema<PathwayMatchProfileDbDocument>(
  {
    pathwayId: {
      type: Schema.Types.ObjectId,
      ref: 'Pathway',
      required: true,
      unique: true,
      index: true,
    },

    version: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    status: {
      type: String,
      enum: contentStatusEnum,
      required: true,
      default: 'draft',
      index: true,
    },

    strengths: {
      type: [strengthWeightSchema],
      required: true,
      default: [],
    },

    passions: {
      type: [passionWeightSchema],
      required: true,
      default: [],
    },

    subjects: {
      type: [subjectWeightSchema],
      required: true,
      default: [],
    },

    learningPreference: {
      type: [learningPreferenceWeightSchema],
      required: true,
      default: [],
    },

    collaborationStyle: {
      type: [collaborationStyleWeightSchema],
      required: true,
      default: [],
    },

    workEnvironment: {
      type: [workEnvironmentWeightSchema],
      required: true,
      default: [],
    },

    workStyle: {
      type: [workStyleWeightSchema],
      required: true,
      default: [],
    },

    impact: {
      type: [impactWeightSchema],
      required: true,
      default: [],
    },

    goals: {
      type: [goalWeightSchema],
      required: true,
      default: [],
    },

    notes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const PathwayMatchProfileModel = model<PathwayMatchProfileDbDocument>(
  'PathwayMatchProfile',
  pathwayMatchProfileSchema
);
