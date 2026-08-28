import { Router } from 'express';
import { authorize } from '../middleware/auth-middleware';
import { DashboardController } from '../controller/dashboard-controller';

const dashboardRouter = Router();

dashboardRouter.get('/', authorize, DashboardController.getDashboardData);

export default dashboardRouter;
