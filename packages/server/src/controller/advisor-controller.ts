import { ZodError } from 'zod';
import { advisorChatRequestSchema } from '@contracts/shared/schemas/advisor-schema';
import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { advisorService } from '../services/advisor-service';

export class AdvisorController {
  private readonly service = advisorService;

  chat = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const payload = advisorChatRequestSchema.parse(req.body);
      const userId = req.user!.id;

      const data = await this.service.answer(userId, payload);

      res.status(200).json({
        success: true,
        message: 'Advisor response generated.',
        data,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).json({
          success: false,
          message: 'Invalid request.',
          errors: error.flatten().fieldErrors,
        });
        return;
      }

      console.error('[AdvisorController] Unhandled error:', error);

      res.status(500).json({
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      });
    }
  };
}

export const advisorController = new AdvisorController();
