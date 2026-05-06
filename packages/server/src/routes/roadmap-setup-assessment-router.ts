import { Router } from 'express';

import { authorize } from '../middleware/auth-middleware';
import { roadmapSetupAssessmentController } from '../controller/roadmap-setup-assessment-controller';

const roadmapSetupAssessmentRouter = Router();

roadmapSetupAssessmentRouter.post(
  '/submit',
  authorize,
  roadmapSetupAssessmentController.submitRoadmapSetupAssessment
);

roadmapSetupAssessmentRouter.get(
  '/status',
  authorize,
  roadmapSetupAssessmentController.getRoadmapSetupAssessmentStatus
);

export default roadmapSetupAssessmentRouter;
