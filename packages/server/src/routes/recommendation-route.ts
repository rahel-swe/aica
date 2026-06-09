import { Router } from 'express';
import { recommendationController } from '../controller/recommendation-controller';
import { authorize } from '../middleware/auth-middleware';

const recommendationRouter = Router();

recommendationRouter.post(
  '/generate',
  authorize,
  recommendationController.generateRecommendations
);

recommendationRouter.get(
  '/me',
  authorize,
  recommendationController.getMyRecommendations
);

recommendationRouter.delete(
  '/',
  authorize,
  recommendationController.deleteMyRecommendations
);

export default recommendationRouter;
