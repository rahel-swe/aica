import {
  goalsEnum,
  impactEnum,
  passionsEnum,
  strengthsEnum,
  subjectsEnum,
  learningPreferenceEnum,
  collaborationStyleEnum,
  workEnvironmentEnum,
  workStyleEnum,
} from '@contracts/shared/schemas/pathway-assessment-schema';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const pathwayAssessmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    strengths: {
      type: [String],
      enum: strengthsEnum,
      required: true,
      validate: [
        (val: string[]) => val.length >= 1 && val.length <= 3,
        'Select 1 to 3 strengths',
      ],
    },

    passions: {
      type: [String],
      enum: passionsEnum,
      required: true,
      validate: [
        (val: string[]) => val.length >= 1 && val.length <= 3,
        'Select 1 to 3 passions',
      ],
    },

    subjects: {
      type: String,
      enum: subjectsEnum,
      required: true,
    },

    learningPreference: {
      type: [String],
      enum: learningPreferenceEnum,
      required: true,
      validate: [
        (val: string[]) => val.length >= 1 && val.length <= 3,
        'Select 1 to 3 learning preferences',
      ],
    },

    workStyle: {
      type: [String],
      enum: workStyleEnum,
      required: true,
      validate: [
        (val: string[]) => val.length >= 1 && val.length <= 2,
        'Select 1 to 2 work styles',
      ],
    },

    workEnvironment: {
      type: String,
      enum: workEnvironmentEnum,
      required: true,
    },

    collaborationStyle: {
      type: String,
      enum: collaborationStyleEnum,
      required: true,
    },

    impact: {
      type: [String],
      enum: impactEnum,
      required: true,
      validate: [
        (val: string[]) => val.length >= 1 && val.length <= 2,
        'Select 1 to 2 impact preferences',
      ],
    },

    goals: {
      type: String,
      enum: goalsEnum,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    stepsCompleted: {
      type: Number,
      default: 0,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const PathwayAssessmentModel = model(
  'PathwayAssessment',
  pathwayAssessmentSchema
);
