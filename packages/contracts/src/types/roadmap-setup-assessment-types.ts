import {
  roadmapSetupAssessmentFormSchema,
  roadmapSetupAssessmentStatusResponseSchema,
  roadmapSetupAssessmentSubmitResponseSchema,
  roadmapSetupConstraint,
  roadmapSetupCurrentStage,
  roadmapSetupStyle,
  roadmapSetupTimeline,
  roadmapSetupWeeklyTime,
} from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import type z from 'zod';

export type RoadmapSetupAssessmentConstraint = z.infer<
  typeof roadmapSetupConstraint
>;

export type RoadmapSetupAssessmentCurrentStage = z.infer<
  typeof roadmapSetupCurrentStage
>;

export type RoadmapSetupAssessmentStyle = z.infer<typeof roadmapSetupStyle>;

export type RoadmapSetupAssessmentTimeline = z.infer<
  typeof roadmapSetupTimeline
>;

export type RoadmapSetupAssessmentWeeklyTime = z.infer<
  typeof roadmapSetupWeeklyTime
>;

export type RoadmapSetupAssessmentFormValues = z.infer<
  typeof roadmapSetupAssessmentFormSchema
>;

export type RoadmapSetupAssessmentSubmitResponse = z.infer<
  typeof roadmapSetupAssessmentSubmitResponseSchema
>;
export type RoadmapSetupAssessmentStatusResponse = z.infer<
  typeof roadmapSetupAssessmentStatusResponseSchema
>;
