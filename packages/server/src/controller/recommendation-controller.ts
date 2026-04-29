import type { Request, Response } from 'express';
import { RecommendationService } from '../services/recommendation-service';
import type { AuthRequest } from '../middleware/auth-middleware';

const service = new RecommendationService();

export const recommendationController = {
  generateRecommendations: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';
      const result = await service.generateRecommendations(userId);

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
  },

  getMyRecommendations: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';
      const result = await service.generateRecommendations(userId);

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
  },
};
