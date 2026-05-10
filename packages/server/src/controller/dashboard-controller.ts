import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { DashboardService } from '../services/dashboard-services';

export class DashboardController {
  private readonly service = new DashboardService();

  /**
   * MAIN DASHBOARD DATA
   */
  getDashboardData = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';

      const data = await this.service.getDashboardData(userId);

      res.json({
        success: true,
        data,
        message: 'Dashboard data fetched successfully.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * STATS CARDS
   */
  getDashboardStats = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';

      const stats = await this.service.getStats(userId);

      res.json({
        success: true,
        data: stats,
        message: 'Dashboard stats fetched successfully.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * INSIGHTS (AI / LOGIC OUTPUT)
   */
  getDashboardInsights = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';

      const insights = await this.service.getInsights(userId);

      res.json({
        success: true,
        data: insights,
        message: 'Dashboard insights fetched successfully.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * ROADMAP PROGRESS
   */
  getUserProgress = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || 'dummyUserId';

      const progress = await this.service.getProgress(userId);

      res.json({
        success: true,
        data: progress,
        message: 'User progress fetched successfully.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export const dashboardController = new DashboardController();
