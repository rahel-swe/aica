import { Router } from 'express';

import { authorize } from '../middleware/auth-middleware';
import pathwayAssessmentRouter from './pathway-assessment-route';
import { roadmapSetupAssessmentController } from '../controller/roadmap-setup-assessment-controller';

const roadmapSetupAssessmentRouter = Router();

pathwayAssessmentRouter.post(
  '/submit',
  authorize,
  roadmapSetupAssessmentController.submitRoadmapSetupAssessment
);

pathwayAssessmentRouter.put(
  '/update',
  authorize,
  roadmapSetupAssessmentController.updateRoadmapSetupAssessment
);

pathwayAssessmentRouter.get(
  '/status',
  authorize,
  roadmapSetupAssessmentController.getRoadmapSetupAssessmentStatus
);

export default roadmapSetupAssessmentRouter;
