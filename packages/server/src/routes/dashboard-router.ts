import { Router } from 'express';
import { dashboardController } from '../controller/dashboard-controller';
import { authorize } from '../middleware/auth-middleware';

const dashboardRouter = Router();

// Get full dashboard data (main endpoint)
dashboardRouter.get('/', authorize, dashboardController.getDashboardData);

// Get only stats (users, , progress)
dashboardRouter.get('/stats', authorize, dashboardController.getDashboardStats);

// Get insights (AI, analytics, recommendations summary)
dashboardRouter.get(
  '/insights',
  authorize,
  dashboardController.getDashboardInsights
);

// Get user progress breakdown
dashboardRouter.get(
  '/progress',
  authorize,
  dashboardController.getUserProgress
);

export default dashboardRouter;
