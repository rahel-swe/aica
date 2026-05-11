import { advisorChatRequestSchema } from '@contracts/shared/schemas/advisor-schema';
import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { advisorService } from '../services/advisor-service';

export class AdvisorController {
  private readonly service = advisorService;

  chat = async (req: AuthRequest, res: Response) => {
    try {
      const payload = advisorChatRequestSchema.parse(req.body);
      const userId = req.user?.id || 'dummyUserId';
      const result = await this.service.answer(userId, payload);

      res.json({
        success: true,
        message: 'Advisor response generated.',
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

export const advisorController = new AdvisorController();
