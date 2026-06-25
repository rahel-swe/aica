import { z } from 'zod';

export const dashboardNextActionTypeSchema = z.enum([
  'complete_onboarding',
  'review_recommendations',
  'complete_roadmap_setup',
  'generate_roadmap',
  'continue_roadmap',
]);

export const dashboardStatusSchema = z.enum([
  'needs_onboarding',
  'needs_recommendations',
  'needs_roadmap_setup',
  'needs_roadmap',
  'active',
]);

export const dashboardResponseSchema = z.object({
  profile: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    onboardingCompleted: z.boolean(),
    roadmapSetupCompleted: z.boolean(),
  }),
  status: dashboardStatusSchema,
  nextActionType: dashboardNextActionTypeSchema,
  recommendation: z.object({
    hasRecommendations: z.boolean(),
    top: z.array(
      z.object({
        pathwaySlug: z.string().optional(),
        score: z.number(),
        rank: z.number(),
        reasons: z.array(z.string()),
      })
    ),
  }),
  roadmap: z.object({
    hasRoadmap: z.boolean(),
    roadmapId: z.string().optional(),
    pathwaySlug: z.string().optional(),
    title: z.string().optional(),
    summary: z.string().optional(),
    progressPercent: z.number(),
    completedSteps: z.number(),
    notStartedSteps: z.number(),
    inProgressSteps: z.number(),
    totalSteps: z.number(),
    currentPhase: z.string().optional(),
    nextStep: z
      .object({
        id: z.string(),
        title: z.string(),
        estimatedTime: z.string().optional(),
        difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
      })
      .optional(),
    nextReviewAt: z.string().optional(),
  }),
  insights: z.object({
    profileAssessmentCompleted: z.boolean(),
    roadmapSetupCompleted: z.boolean(),
    topPathwaySlug: z.string().optional(),
    topRecommendedPathwayScore: z.number().optional(),
    roadmapProgressPercent: z.number(),
    roadmapTotalSteps: z.number(),
    hasRoadmap: z.boolean(),
    roadmapCompletedSteps: z.number(),
  }),
});

export const dashboardApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: dashboardResponseSchema,
});
