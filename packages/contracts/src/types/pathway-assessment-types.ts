import type z from 'zod';
import {
  pathwayAssessmentFormSchema,
  pathwayAssessmentFreeTimeSchema,
  pathwayAssessmentGoalSchema,
  pathwayAssessmentImpactSchema,
  pathwayAssessmentPassionSchema,
  pathwayAssessmentStatusResponseSchema,
  pathwayAssessmentStrengthSchema,
  pathwayAssessmentSubjectSchema,
  pathwayAssessmentSubmitResponseSchema,
  pathwayAssessmentWorkEnvironmentSchema,
  pathwayAssessmentWorkStyleSchema,
} from '../schemas/pathway-assessment-schema';

export type PathwayAssessmentStrength = z.infer<
  typeof pathwayAssessmentStrengthSchema
>;
export type PathwayAssessmentSubject = z.infer<
  typeof pathwayAssessmentSubjectSchema
>;
export type PathwayAssessmentPassion = z.infer<
  typeof pathwayAssessmentPassionSchema
>;
export type PathwayAssessmentFreeTime = z.infer<
  typeof pathwayAssessmentFreeTimeSchema
>;
export type PathwayAssessmentWorkEnvironment = z.infer<
  typeof pathwayAssessmentWorkEnvironmentSchema
>;
export type PathwayAssessmentWorkStyle = z.infer<
  typeof pathwayAssessmentWorkStyleSchema
>;
export type PathwayAssessmentImpact = z.infer<
  typeof pathwayAssessmentImpactSchema
>;
export type PathwayAssessmentGoal = z.infer<typeof pathwayAssessmentGoalSchema>;

export type PathwayAssessmentFormValues = z.infer<
  typeof pathwayAssessmentFormSchema
>;

export type PathwayAssessmentSubmitResponse = z.infer<
  typeof pathwayAssessmentSubmitResponseSchema
>;
export type PathwayAssessmentStatusResponse = z.infer<
  typeof pathwayAssessmentStatusResponseSchema
>;
