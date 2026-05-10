import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { roadmapService } from '../services/roadmap-service';
import type { RoadmapStepStatus } from '@contracts/shared/types/roadmap-types';

export class RoadmapController {
  private readonly service = roadmapService;

  generateRoadmap = async (req: AuthRequest, res: Response) => {
    try {
      const { pathwayId } = req.body as { pathwayId: string };
      const userId = req.user?.id || 'dummyUserId';
      const result = await this.service.generateRoadmap(userId, pathwayId);

      res.json({
        success: true,
        data: result,
        message: 'Roadmap generated.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getMyRoadmaps = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';
      const result = await this.service.getRoadmaps(userId);

      res.json({
        success: true,
        data: result,
        message: 'Current user roadmap fetched.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  changeStepStatus = async (req: AuthRequest, res: Response) => {
    try {
      const { id, stepId } = req.params as { id: string; stepId: string };
      const { status } = req.body as { status: RoadmapStepStatus };
      const userId = req.user?.id || 'dummyUserId';

      const result = await this.service.changeStepStatus(
        id,
        userId,
        stepId,
        status
      );

      res.json({
        success: true,
        data: result,
        message: 'Current user roadmap fetched.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  deleteMyRoadmap = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      const userId = req.user?.id || 'dummyUserId';

      const result = await this.service.deleteMyRoadmap(id, userId);

      res.json({
        success: true,
        data: result,
        message: 'Current user roadmap fetched.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export const roadmapController = new RoadmapController();
