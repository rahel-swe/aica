// controllers/roadmap-setup-assessment-controller.ts
import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { RoadmapSetupAssessmentService } from '../services/roadmap-setup-assessment-service';

export class RoadmapSetupAssessmentController {
  private readonly service = RoadmapSetupAssessmentService;

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

  getRoadmapSetupAssessmentStatus = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';
      const assessment = await this.service.getRoadmapSetupStatus(userId);

      if (!assessment) {
        return res.json({
          success: true,
          message: 'Assessment status fetched.',
          data: {
            completed: false,
          },
        });
      }

      return res.json({
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

  deleteRoadmapSetupAssessment = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';
      const { id } = req.params as { id: string };
      const assessment = await this.service.deleteRoadmapSetup(id, userId);

      if (!assessment) {
        return res.json({
          success: true,
          message: 'Assessment status faild to fetch fetched.',
          data: {
            completed: false,
          },
        });
      }

      return res.json({
        success: true,
        message: 'Roadmap setup assessment deleted successfully.',
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
