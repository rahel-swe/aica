import type { DashboardApiResponse } from '@contracts/shared/types/dashboard-types';
import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { dashboardService } from '../services/dashboard-services';

export class DashboardController {
  static getDashboardData = async (
    req: AuthRequest,
    res: Response<DashboardApiResponse | { success: false; message: string }>
  ): Promise<void> => {
    try {
      const user = req.user;

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'You are not logged in.',
        });

        return;
      }

      const data = await dashboardService.getDashboardData(user);

      res.json({
        success: true,
        data,
        message: 'Dashboard data fetched successfully.',
      });

      return;
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: error.message,
      });

      return;
    }
  };
}
