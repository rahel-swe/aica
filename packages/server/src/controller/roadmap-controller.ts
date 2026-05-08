import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { roadmapService } from '../services/roadmap-service';

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
}

export const roadmapController = new RoadmapController();
