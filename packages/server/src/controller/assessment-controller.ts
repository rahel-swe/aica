import type { Request, Response } from 'express';
import { onboardingFormSchema } from '@contracts/shared/schemas/onboarding-schema';
import { OnboardingService } from '../services/onboarding-service';
import type { AuthRequest } from '../middleware/auth-middleware';

export class AssessmentController {
  private readonly service = new OnboardingService();

  submitOnboarding = async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = onboardingFormSchema.parse(req.body);
      const userId = req.user?.id || 'dummyUserId';
      const result = await this.service.submitOnboarding(userId, validatedData);

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
  };
}

export const assessmentController = new AssessmentController();
