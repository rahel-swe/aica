import type z from 'zod';
import {
  onboardingFormSchema,
  onboardingFreeTimeSchema,
  onboardingGoalSchema,
  onboardingImpactSchema,
  onboardingPassionSchema,
  onboardingStatusResponseSchema,
  onboardingStrengthSchema,
  onboardingSubjectSchema,
  onboardingSubmitRequestSchema,
  onboardingSubmitResponseSchema,
  onboardingWorkEnvironmentSchema,
  onboardingWorkStyleSchema,
} from '../schemas/onboarding-schema';

export type OnboardingStrength = z.infer<typeof onboardingStrengthSchema>;
export type OnboardingSubject = z.infer<typeof onboardingSubjectSchema>;
export type OnboardingPassion = z.infer<typeof onboardingPassionSchema>;
export type OnboardingFreeTime = z.infer<typeof onboardingFreeTimeSchema>;
export type OnboardingWorkEnvironment = z.infer<
  typeof onboardingWorkEnvironmentSchema
>;
export type OnboardingWorkStyle = z.infer<typeof onboardingWorkStyleSchema>;
export type OnboardingImpact = z.infer<typeof onboardingImpactSchema>;
export type OnboardingGoal = z.infer<typeof onboardingGoalSchema>;
export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;
export type OnboardingSubmitRequest = z.infer<
  typeof onboardingSubmitRequestSchema
>;
export type OnboardingSubmitResponse = z.infer<
  typeof onboardingSubmitResponseSchema
>;
export type OnboardingStatusResponse = z.infer<
  typeof onboardingStatusResponseSchema
>;
