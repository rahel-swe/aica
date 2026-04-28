import { Router, type Request, type Response } from 'express';

import { onboardingStatusResponseSchema } from '@contracts/shared/schemas/onboarding-schema';

import { assessmentController } from '../controller/assessment-controller';

import { userController } from '../controller/user-controller';
import { requireAuth } from '../middleware/auth.middleware';

const assessmentRouter = Router();

assessmentRouter.post(
  '/submit',
  requireAuth,
  assessmentController.submitOnboarding
);

assessmentRouter.get('/status', async (_req: Request, res: Response) => {
  const response = onboardingStatusResponseSchema.parse({
    success: true,
    message: 'Assessment status fetched.',
    data: {
      completed: false,
    },
  });

  res.send(response);
});

assessmentRouter.post('/users', userController.createUser);

assessmentRouter.get('/users', userController.getUsers);

export default assessmentRouter;
