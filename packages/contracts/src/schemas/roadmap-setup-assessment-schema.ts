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

// Enums using the same { error: 'message' } style as pathwayAssessment
export const roadmapSetupCurrentStage = z.enum(roadmapSetupCurrentStageEnum, {
  error: 'Please select your current stage',
});

export const roadmapSetupWeeklyTime = z.enum(roadmapSetupWeeklyTimeEnum, {
  error: 'Please select how much time you can commit weekly',
});

export const roadmapSetupTimeline = z.enum(roadmapSetupTimelineEnum, {
  error: 'Please select your desired timeline',
});

export const roadmapSetupConstraint = z.enum(roadmapSetupConstraintEnum);

export const roadmapSetupStyle = z.enum(roadmapSetupStyleEnum, {
  error: 'Please select your preferred learning style',
});

export const roadmapSetupAssessmentFormSchema = z.object({
  pickedPathwayId: z.string().min(1, 'Pathway is required'),

  currentStage: roadmapSetupCurrentStage,

  weeklyTime: roadmapSetupWeeklyTime,

  timeline: roadmapSetupTimeline,

  constraints: z
    .array(roadmapSetupConstraint)
    .min(1, 'Select at least one constraint.')
    .max(4, 'Select up to four constraints.'),

  roadmapStyle: roadmapSetupStyle,
});
