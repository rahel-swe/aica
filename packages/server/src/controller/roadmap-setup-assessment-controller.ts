// controllers/roadmap-setup-assessment-controller.ts
import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { roadmapSetupAssessmentFormSchema } from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import { RoadmapSetupAssessmentService } from '../services/roadmap-setup-assessment-service';

export class RoadmapSetupAssessmentController {
  private readonly service = new RoadmapSetupAssessmentService();

  submitRoadmapSetupAssessment = async (req: AuthRequest, res: Response) => {
    try {
      const data = req.body;

      const userId = req.user?.id || 'dummyUserId';

      const result = await this.service.submitRoadmapSetupAssessment(
        userId,
        data
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

  updateRoadmapSetupAssessment = async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = roadmapSetupAssessmentFormSchema.parse(req.body);
      const userId = req.user?.id || 'dummyUserId';

      const result = await this.service.updateRoadmapSetupAssessment(
        userId,
        validatedData
      );

      res.json({
        success: true,
        message: 'Roadmap setup assessment updated.',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getRoadmapSetupAssessmentStatus = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';
      const assessment = await this.service.getRoadmapSetupStatus(userId);

      res.json({
        success: true,
        message: 'Assessment status fetched.',
        data: assessment,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export const roadmapSetupAssessmentController =
  new RoadmapSetupAssessmentController();
