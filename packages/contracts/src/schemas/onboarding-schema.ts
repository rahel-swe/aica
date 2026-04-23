import { z } from 'zod';

export const onboardingStrengthSchema = z.enum([
  'problem_solving',
  'creativity',
  'people',
  'analytical',
  'communication',
  'hands_on',
  'fast_learning',
  'organized',
]);

export const onboardingSubjectSchema = z.enum(
  ['math', 'science', 'writing', 'arts', 'social'],
  {
    error: 'Please choose your favorite subject',
  }
);

export const onboardingPassionSchema = z.enum([
  'tech',
  'music',
  'sports',
  'reading',
  'science',
  'social',
  'nature',
  'building',
  'ideas',
]);

export const onboardingFreeTimeSchema = z.enum(
  ['build', 'outdoor', 'socialize', 'consume', 'learn'],
  {
    error: 'Please choose what you spend your free time',
  }
);

export const onboardingWorkEnvironmentSchema = z.enum(
  ['office', 'remote', 'outdoor', 'lab', 'mixed'],
  {
    error: 'Please choose your favorite work environment',
  }
);

export const onboardingWorkStyleSchema = z.enum(
  ['analyze', 'help', 'build', 'create', 'routine'],
  {
    error: 'Please choose your favorite work',
  }
);

export const onboardingImpactSchema = z.enum(
  ['create', 'people', 'discover', 'systems', 'express'],
  {
    error: 'Please choose one impactfull thing to you',
  }
);

export const onboardingGoalSchema = z.enum(
  ['impact', 'money', 'balance', 'growth', 'variety'],
  {
    error: 'Please choose your goal',
  }
);

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

export const onboardingSubmitRequestSchema = z.object({
  responses: onboardingFormSchema,
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
    stepsCompleted: z.number().int().nonnegative(),
  }),
});
