import {
  freeTimeEnum,
  goalsEnum,
  impactEnum,
  passionsEnum,
  strengthsEnum,
  subjectsEnum,
  workEnvironmentEnum,
  workStyleEnum,
} from '@contracts/shared/schemas/onboarding-schema';
import {
  pathwayStatusEnum,
  scoreBandEnum,
} from '@contracts/shared/schemas/pathway-domain-schema';
import { Schema, model, type Document } from 'mongoose';

const createWeightSchema = (allowedValues: string[]) =>
  new Schema(
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
    { _id: false }
  );

const strengthWeightSchema = createWeightSchema(strengthsEnum);
const subjectWeightSchema = createWeightSchema(subjectsEnum);
const passionWeightSchema = createWeightSchema(passionsEnum);
const freeTimeWeightSchema = createWeightSchema(freeTimeEnum);
const workEnvironmentWeightSchema = createWeightSchema(workEnvironmentEnum);
const workStyleWeightSchema = createWeightSchema(workStyleEnum);
const impactWeightSchema = createWeightSchema(impactEnum);
const goalWeightSchema = createWeightSchema(goalsEnum);

export interface IPathwayMatchProfile extends Document {
  pathwayId: Schema.Types.ObjectId;
  version: number;
  strengths: Array<{ value: string; weight: number; band: string }>;
  subjects: Array<{ value: string; weight: number; band: string }>;
  passions: Array<{ value: string; weight: number; band: string }>;
  freeTime: Array<{ value: string; weight: number; band: string }>;
  workEnvironment: Array<{ value: string; weight: number; band: string }>;
  workStyle: Array<{ value: string; weight: number; band: string }>;
  impact: Array<{ value: string; weight: number; band: string }>;
  goals: Array<{ value: string; weight: number; band: string }>;
  notes: string[];
  status: (typeof pathwayStatusEnum)[number];
}

const pathwayMatchProfileSchema = new Schema<IPathwayMatchProfile>(
  {
    pathwayId: {
      type: Schema.Types.ObjectId,
      ref: 'Pathway',
      required: true,
      unique: true,
    },

    version: {
      type: Number,
      default: 1,
    },

    strengths: {
      type: [strengthWeightSchema],
      default: [],
    },

    subjects: {
      type: [subjectWeightSchema],
      default: [],
    },

    passions: {
      type: [passionWeightSchema],
      default: [],
    },

    freeTime: {
      type: [freeTimeWeightSchema],
      default: [],
    },

    workEnvironment: {
      type: [workEnvironmentWeightSchema],
      default: [],
    },

    workStyle: {
      type: [workStyleWeightSchema],
      default: [],
    },

    impact: {
      type: [impactWeightSchema],
      default: [],
    },

    goals: {
      type: [goalWeightSchema],
      default: [],
    },

    notes: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: pathwayStatusEnum,
      default: 'draft',
    },
  },
  { timestamps: true }
);

export const PathwayMatchProfileModel = model<IPathwayMatchProfile>(
  'PathwayMatchProfile',
  pathwayMatchProfileSchema
);
