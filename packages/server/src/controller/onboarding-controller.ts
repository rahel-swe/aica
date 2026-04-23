import type { Request, Response } from 'express';
import { onboardingFormSchema } from '@contracts/shared/schemas/onboarding-schema';
import { OnboardingService } from '../services/onboarding-service';
const service = new OnboardingService();

export const onboardingController = {
  submitOnboarding: async (req: Request, res: Response) => {
    try {
      const validatedData = onboardingFormSchema.parse(req.body);

      const userId = req.user?.id || 'dummyUserId';

      const result = await service.submitOnboarding(userId, validatedData);

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
