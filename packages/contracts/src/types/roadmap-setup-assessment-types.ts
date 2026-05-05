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
    pickedPathwayId: string;
    currentStage:
      | 'graduate'
      | 'high_school'
      | 'self_learning'
      | 'university'
      | 'working';
    weeklyTime: 'high' | 'intense' | 'low' | 'medium';
    timeline: 'long' | 'medium' | 'short';
    constraints: (
      | 'beginner'
      | 'fast_track'
      | 'low_budget'
      | 'no_laptop'
      | 'weak_internet'
    )[];
    roadmapStyle: 'balanced' | 'deep' | 'fast_track';
    completed: boolean;
    stepsCompleted: number;
    createdAt: Date;
  };
};
export type RoadmapSetupAssessmentStatusResponse = {
  success: boolean;
  message: string;
  data: {
    pickedPathwayId: string;
    constraints: (
      | 'low_budget'
      | 'weak_internet'
      | 'no_laptop'
      | 'beginner'
      | 'fast_track'
    )[];
    currentStage?:
      | 'high_school'
      | 'university'
      | 'graduate'
      | 'self_learning'
      | 'working';
    weeklyTime?: 'medium' | 'low' | 'high' | 'intense';
    timeline?: 'short' | 'medium' | 'long';
    roadmapStyle?: 'fast_track' | 'balanced' | 'deep';
    completed: boolean;
    _id: string;
    stepsComleted: number;
    userId: string;
    createdAt: string;
  };
};
