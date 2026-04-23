import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const strengthsEnum = [
  'problem_solving',
  'creativity',
  'people',
  'analytical',
  'communication',
  'hands_on',
  'fast_learning',
  'organized',
];

const subjectsEnum = ['math', 'science', 'writing', 'arts', 'social'];

const passionsEnum = [
  'tech',
  'music',
  'sports',
  'reading',
  'science',
  'social',
  'nature',
  'building',
  'ideas',
];

const freeTimeEnum = ['build', 'outdoor', 'socialize', 'consume', 'learn'];

const workEnvironmentEnum = ['office', 'remote', 'outdoor', 'lab', 'mixed'];

const workStyleEnum = ['analyze', 'help', 'build', 'create', 'routine'];

const impactEnum = ['create', 'people', 'discover', 'systems', 'express'];

const goalsEnum = ['impact', 'money', 'balance', 'growth', 'variety'];

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
