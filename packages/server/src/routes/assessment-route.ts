import { Router, type Request, type Response } from 'express';

import { onboardingStatusResponseSchema } from '@contracts/shared/schemas/onboarding-schema';

import { assessmentController } from '../controller/assessment-controller';

import { requireAuth } from '../middleware/auth-middleware';

const assessmentRouter = Router();

assessmentRouter.post(
  '/submit',
  requireAuth,
  assessmentController.submitOnboarding
);

assessmentRouter.get(
  '/status',
  requireAuth,
  assessmentController.getOnboardingStatus
);

export default assessmentRouter;
