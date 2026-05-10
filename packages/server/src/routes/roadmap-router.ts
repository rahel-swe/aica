import { Router } from 'express';
import { roadmapController } from '../controller/roadmap-controller';
import { authorize } from '../middleware/auth-middleware';

const roadmapRouter = Router();

roadmapRouter.post('/generate', authorize, roadmapController.generateRoadmap);

roadmapRouter.put(
  '/:id/steps/:stepId',
  authorize,
  roadmapController.changeStepStatus
);

roadmapRouter.get('/me', authorize, roadmapController.getMyRoadmaps);

export default roadmapRouter;
