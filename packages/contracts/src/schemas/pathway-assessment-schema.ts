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
] as const;

export const subjectsEnum = [
  'math',
  'science',
  'writing',
  'arts',
  'social',
] as const;

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
] as const;

export const freeTimeEnum = [
  'build',
  'outdoor',
  'socialize',
  'consume',
  'learn',
] as const;

export const workEnvironmentEnum = [
  'office',
  'remote',
  'outdoor',
  'lab',
  'mixed',
] as const;

export const workStyleEnum = [
  'analyze',
  'help',
  'build',
  'create',
  'routine',
] as const;

export const impactEnum = [
  'create',
  'people',
  'discover',
  'systems',
  'express',
] as const;

export const goalsEnum = [
  'impact',
  'money',
  'balance',
  'growth',
  'variety',
] as const;

export const pathwayAssessmentStrengthSchema = z.enum(strengthsEnum);

export const pathwayAssessmentSubjectSchema = z.enum(subjectsEnum, {
  error: 'Please choose your favorite subject',
});

export const pathwayAssessmentPassionSchema = z.enum(passionsEnum);

export const pathwayAssessmentFreeTimeSchema = z.enum(freeTimeEnum, {
  error: 'Please choose what you spend your free time',
});

export const pathwayAssessmentWorkEnvironmentSchema = z.enum(
  workEnvironmentEnum,
  {
    error: 'Please choose your favorite work environment',
  }
);

export const pathwayAssessmentWorkStyleSchema = z.enum(workStyleEnum, {
  error: 'Please choose your favorite work',
});

export const pathwayAssessmentImpactSchema = z.enum(impactEnum, {
  error: 'Please choose one impactfull thing to you',
});

export const pathwayAssessmentGoalSchema = z.enum(goalsEnum, {
  error: 'Please choose your goal',
});

export const pathwayAssessmentFormSchema = z.object({
  strengths: z
    .array(pathwayAssessmentStrengthSchema)
    .min(1, 'Select at least one strength.')
    .max(4, 'Select up to four strengths.'),
  subjects: pathwayAssessmentSubjectSchema,
  passions: z
    .array(pathwayAssessmentPassionSchema)
    .min(1, 'Select at least one interest.')
    .max(4, 'Select up to four interests.'),
  freeTime: pathwayAssessmentFreeTimeSchema,
  workEnvironment: pathwayAssessmentWorkEnvironmentSchema,
  workStyle: pathwayAssessmentWorkStyleSchema,
  impact: pathwayAssessmentImpactSchema,
  goals: pathwayAssessmentGoalSchema,
});

export const pathwayAssessmentSubmitResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    submissionId: z.string(),
    savedAt: z.string(),
  }),
});

export const pathwayAssessmentStatusResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    completed: z.boolean(),
  }),
});
