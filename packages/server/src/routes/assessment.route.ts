import { Router, type Request, type Response } from 'express';
import {
  onboardingStatusResponseSchema,
  onboardingSubmitRequestSchema,
  onboardingSubmitResponseSchema,
} from '@contracts/shared/schemas/onboarding-schema';

const assessmentRouter = Router();

assessmentRouter.post('/submit', async (req: Request, res: Response) => {
  const payload = onboardingSubmitRequestSchema.parse(req.body);

  await Promise.resolve(payload);

  const response = onboardingSubmitResponseSchema.parse({
    success: true,
    message: 'Assessment responses accepted.',
    data: {
      submissionId: 'draft-submission',
      nextRoute: '/app/recommendations',
      savedAt: new Date().toISOString(),
    },
  });

  res.status(202).send(response);
});

assessmentRouter.get('/status', async (_req: Request, res: Response) => {
  await Promise.resolve();

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

export default assessmentRouter;
