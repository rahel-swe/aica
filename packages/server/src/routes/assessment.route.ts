import { Router, type Request, type Response } from 'express';

import { onboardingStatusResponseSchema } from '@contracts/shared/schemas/onboarding-schema';

import { onboardingController } from '../controller/onboarding-controller';

import { userController } from '../controller/user-controller';

const assessmentRouter = Router();

assessmentRouter.post('/submit', onboardingController.submitOnboarding);

assessmentRouter.get('/status', async (_req: Request, res: Response) => {
  const response = onboardingStatusResponseSchema.parse({
    success: true,
    message: 'Assessment status fetched.',
    data: {
      completed: false,
      stepsCompleted: 0,
    },
  });

  res.send(response);
});

assessmentRouter.post('/users', userController.createUser);

assessmentRouter.get('/users', userController.getUsers);

export default assessmentRouter;
