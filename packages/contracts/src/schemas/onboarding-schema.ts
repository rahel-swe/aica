import { z } from 'zod';

export const strengthsEnum = [
  'problem_solving',
  'creativity',
  'people',
  'analytical',
  'communication',
  'hands_on',
  'fast_learning',
  'organized',
];

export const subjectsEnum = ['math', 'science', 'writing', 'arts', 'social'];

export const passionsEnum = [
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

export const freeTimeEnum = [
  'build',
  'outdoor',
  'socialize',
  'consume',
  'learn',
];

export const workEnvironmentEnum = [
  'office',
  'remote',
  'outdoor',
  'lab',
  'mixed',
];

export const workStyleEnum = ['analyze', 'help', 'build', 'create', 'routine'];

export const impactEnum = [
  'create',
  'people',
  'discover',
  'systems',
  'express',
];

export const goalsEnum = ['impact', 'money', 'balance', 'growth', 'variety'];

export const onboardingStrengthSchema = z.enum(strengthsEnum);

export const onboardingSubjectSchema = z.enum(subjectsEnum, {
  error: 'Please choose your favorite subject',
});

export const onboardingPassionSchema = z.enum(passionsEnum);

export const onboardingFreeTimeSchema = z.enum(freeTimeEnum, {
  error: 'Please choose what you spend your free time',
});

export const onboardingWorkEnvironmentSchema = z.enum(workEnvironmentEnum, {
  error: 'Please choose your favorite work environment',
});

export const onboardingWorkStyleSchema = z.enum(workStyleEnum, {
  error: 'Please choose your favorite work',
});

export const onboardingImpactSchema = z.enum(impactEnum, {
  error: 'Please choose one impactfull thing to you',
});

export const onboardingGoalSchema = z.enum(goalsEnum, {
  error: 'Please choose your goal',
});

export const onboardingFormSchema = z.object({
  strengths: z
    .array(onboardingStrengthSchema)
    .min(1, 'Select at least one strength.')
    .max(4, 'Select up to four strengths.'),
  subjects: onboardingSubjectSchema,
  passions: z
    .array(onboardingPassionSchema)
    .min(1, 'Select at least one interest.')
    .max(4, 'Select up to four interests.'),
  freeTime: onboardingFreeTimeSchema,
  workEnvironment: onboardingWorkEnvironmentSchema,
  workStyle: onboardingWorkStyleSchema,
  impact: onboardingImpactSchema,
  goals: onboardingGoalSchema,
});

export const onboardingSubmitResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    submissionId: z.string(),
    savedAt: z.string(),
  }),
});

export const onboardingStatusResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    completed: z.boolean(),
  }),
});
