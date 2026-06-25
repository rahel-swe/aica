import type { DashboardApiResponse } from '@contracts/shared/types/dashboard-types';
import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { dashboardService } from '../services/dashboard-services';

export class DashboardController {
  getDashboardData = async (
    req: AuthRequest,
    res: Response<DashboardApiResponse | { success: false; message: string }>
  ) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'You are not logged in.',
        });
      }

      const data = await dashboardService.getDashboardData(user);

      return res.json({
        success: true,
        data,
        message: 'Dashboard data fetched successfully.',
      });
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export const dashboardController = new DashboardController();
