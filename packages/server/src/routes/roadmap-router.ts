import { Router } from 'express';
import { roadmapController } from '../controller/roadmap-controller';
import { authorize } from '../middleware/auth-middleware';

const roadmapRouter = Router();

roadmapRouter.post('/generate', authorize, roadmapController.generateRoadmap);

// roadmapRouter.put(
//   '/steps/:stepId',
//   authorize,
//   roadmapController.markStepComplete
// );

roadmapRouter.get('/me', authorize, roadmapController.getMyRoadmaps);

export default roadmapRouter;
