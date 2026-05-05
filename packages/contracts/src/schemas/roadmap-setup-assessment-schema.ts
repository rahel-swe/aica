import { z } from 'zod';

export const roadmapSetupCurrentStageEnum = [
  'high_school',
  'university',
  'graduate',
  'self_learning',
  'working',
] as const;

export const roadmapSetupWeeklyTimeEnum = [
  'low',
  'medium',
  'high',
  'intense',
] as const;

export const roadmapSetupTimelineEnum = ['short', 'medium', 'long'] as const;

export const roadmapSetupConstraintEnum = [
  'low_budget',
  'weak_internet',
  'no_laptop',
  'beginner',
  'fast_track',
] as const;

export const roadmapSetupStyleEnum = [
  'fast_track',
  'balanced',
  'deep',
] as const;

export const roadmapSetupCurrentStage = z.enum(roadmapSetupCurrentStageEnum);

export const roadmapSetupWeeklyTime = z.enum(roadmapSetupWeeklyTimeEnum);

export const roadmapSetupTimeline = z.enum(roadmapSetupTimelineEnum);

export const roadmapSetupConstraint = z.enum(roadmapSetupConstraintEnum);

export const roadmapSetupStyle = z.enum(roadmapSetupStyleEnum);

/**
 * Main form schema
 */

export const roadmapSetupAssessmentFormSchema = z.object({
  pickedPathwayId: z.string().min(1, 'Pathway is required'),

  currentStage: roadmapSetupCurrentStage.optional(),

  weeklyTime: roadmapSetupWeeklyTime.optional(),

  timeline: roadmapSetupTimeline.optional(),

  constraints: z.array(roadmapSetupConstraint).default([]),

  roadmapStyle: roadmapSetupStyle.optional(),
});

/**
 * Response schemas (matching your existing pattern)
 */

export const roadmapSetupAssessmentSubmitResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    submissionId: z.string(),
    savedAt: z.string(),
  }),
});
