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
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const onboardingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    strengths: {
      type: [String],
      enum: strengthsEnum,
      validate: [
        (val: string[]) => val.length >= 1 && val.length <= 4,
        'Select 1 to 4 strengths',
      ],
    },

    subjects: {
      type: String,
      enum: subjectsEnum,
      required: true,
    },

    passions: {
      type: [String],
      enum: passionsEnum,
      validate: [
        (val: string[]) => val.length >= 1 && val.length <= 4,
        'Select 1 to 4 passions',
      ],
    },

    freeTime: {
      type: String,
      enum: freeTimeEnum,
      required: true,
    },

    workEnvironment: {
      type: String,
      enum: workEnvironmentEnum,
      required: true,
    },

    workStyle: {
      type: String,
      enum: workStyleEnum,
      required: true,
    },

    impact: {
      type: String,
      enum: impactEnum,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

export const Onboarding = model('Onboarding', onboardingSchema);
