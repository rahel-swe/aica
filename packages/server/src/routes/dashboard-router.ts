import { Router } from 'express';
import { dashboardController } from '../controller/dashboard-controller';
import { authorize } from '../middleware/auth-middleware';

const dashboardRouter = Router();

dashboardRouter.get('/', authorize, dashboardController.getDashboardData);

export default dashboardRouter;
