import { Router } from 'express';
import { recommendationController } from '../controller/recommendation-controller';
import { requireAuth } from '../middleware/auth-middleware';

const recommendationRouter = Router();

recommendationRouter.post(
  '/generate',
  requireAuth,
  recommendationController.generateRecommendations
);

recommendationRouter.get(
  '/me',
  requireAuth,
  recommendationController.getMyRecommendations
);

export default recommendationRouter;
