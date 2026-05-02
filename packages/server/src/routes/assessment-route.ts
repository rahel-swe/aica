import { Router, type Request, type Response } from 'express';

import { onboardingStatusResponseSchema } from '@contracts/shared/schemas/onboarding-schema';

import { assessmentController } from '../controller/assessment-controller';

import { authorize } from '../middleware/auth-middleware';

const assessmentRouter = Router();

assessmentRouter.post(
  '/submit',
  authorize,
  assessmentController.submitOnboarding
);

assessmentRouter.get(
  '/status',
  authorize,
  assessmentController.getOnboardingStatus
);

export default assessmentRouter;
