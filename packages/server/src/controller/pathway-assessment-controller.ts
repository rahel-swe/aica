import type { Request, Response } from 'express';
import { pathwayAssessmentFormSchema } from '@contracts/shared/schemas/pathway-assessment-schema';
import { PathwayAssessmentService } from '../services/pathway-assessment-service';
import type { AuthRequest } from '../middleware/auth-middleware';

export class PathwayAssessmentController {
  private readonly service = new PathwayAssessmentService();

  submitPathwayAssessment = async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = pathwayAssessmentFormSchema.parse(req.body);
      const userId = req.user?.id || 'dummyUserId';
      const result = await this.service.submitPathwayAssessment(
        userId,
        validatedData
      );

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

  getPathwayAssessmentStatus = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';
      const isCompleted = await this.service.getPathwayAssessmentStatus(userId);

      res.json({
        success: true,
        message: 'Assessment status fetched.',
        data: {
          completed: !!isCompleted,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export const assessmentController = new PathwayAssessmentController();
