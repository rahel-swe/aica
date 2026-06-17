import {
  roadmapSetupAssessmentFormSchema,
  roadmapSetupConstraint,
  roadmapSetupCurrentStage,
  roadmapSetupStyle,
  roadmapSetupTimeline,
  roadmapSetupWeeklyTime,
} from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import z from 'zod';

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

export type RoadmapSetupAssessmentSubmitResponse = {
  success: boolean;
  message?: string;
  data: {
    _id: string;
    userId: string;
    pickedPathwaySlug: string;
    currentStage: RoadmapSetupAssessmentCurrentStage;
    weeklyTime: RoadmapSetupAssessmentWeeklyTime;
    timeline: RoadmapSetupAssessmentTimeline;
    constraints: RoadmapSetupAssessmentConstraint[];
    roadmapStyle: RoadmapSetupAssessmentStyle;
    completed: boolean;
    stepsCompleted: number;
    createdAt: Date;
  };
};
export type RoadmapSetupAssessmentStatusResponse = {
  success: boolean;
  message: string;
  data?: {
    pickedPathwaySlug: string;
    constraints: RoadmapSetupAssessmentConstraint[];
    currentStage: RoadmapSetupAssessmentCurrentStage;
    weeklyTime: RoadmapSetupAssessmentWeeklyTime;
    timeline: RoadmapSetupAssessmentTimeline;
    roadmapStyle: RoadmapSetupAssessmentStyle;
    completed: boolean;
    _id: string;
    stepsCompleted: number;
    userId: string;
    createdAt: string;
  };
};
