import type { Response } from 'express';
import { RecommendationService } from '../services/recommendation-service';
import type { AuthRequest } from '../middleware/auth-middleware';

export class RecommendationController {
  private readonly service = new RecommendationService();

  generateRecommendations = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';
      const result = await this.service.generateRecommendations(userId);

      res.json({
        success: true,
        data: result,
        message: 'Recommendations generated.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getMyRecommendations = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';
      const result = await this.service.getRecommendations(userId);

      res.json({
        success: true,
        data: result,
        message: 'Current user recommendations fetched.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export const recommendationController = new RecommendationController();
