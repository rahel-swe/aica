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

export const learningPreferenceEnum = [
  'practice',
  'courses',
  'research',
  'watching',
  'teaching',
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

export const collaborationStyleEnum = [
  'solo',
  'small_team',
  'large_team',
  'client_facing',
  'community',
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

export const pathwayAssessmentLearningPreferenceSchema = z.enum(
  learningPreferenceEnum
);

export const pathwayAssessmentWorkEnvironmentSchema = z.enum(
  workEnvironmentEnum,
  {
    error: 'Please choose your favorite work environment',
  }
);

export const pathwayAssessmentWorkStyleSchema = z.enum(workStyleEnum, {
  error: 'Please choose your favorite work',
});

export const pathwayAssessmentCollaborationStyleSchema = z.enum(
  collaborationStyleEnum,
  {
    error: 'Please choose how you prefer to work with others',
  }
);

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
    .max(5, 'Select up to five strengths.'),

  subjects: pathwayAssessmentSubjectSchema,

  passions: z
    .array(pathwayAssessmentPassionSchema)
    .min(1, 'Select at least one interest.')
    .max(5, 'Select up to five interests.'),

  learningPreference: z
    .array(pathwayAssessmentLearningPreferenceSchema)
    .min(1, 'Select at least one learning style.')
    .max(3, 'Select up to three.'),

  workEnvironment: z
    .array(pathwayAssessmentWorkEnvironmentSchema)
    .min(1, 'Select at least one learning style.')
    .max(2, 'Select up to two.'),

  workStyle: z
    .array(pathwayAssessmentWorkStyleSchema)
    .min(1, 'Select at least one work style.')
    .max(2, 'Select up to two work styles.'),

  collaborationStyle: pathwayAssessmentCollaborationStyleSchema,

  impact: z
    .array(pathwayAssessmentImpactSchema)
    .min(1, 'Select at least one impact area.')
    .max(2, 'Select up to two impact areas.'),

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
