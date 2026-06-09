import { Router } from 'express';

import { assessmentController } from '../controller/pathway-assessment-controller';

import { authorize } from '../middleware/auth-middleware';

const pathwayAssessmentRouter = Router();

pathwayAssessmentRouter.post(
  '/submit',
  authorize,
  assessmentController.submitPathwayAssessment
);

pathwayAssessmentRouter.get(
  '/status',
  authorize,
  assessmentController.getPathwayAssessmentStatus
);

pathwayAssessmentRouter.delete(
  '/:id',
  authorize,
  assessmentController.deletePathwayAssessment
);

export default pathwayAssessmentRouter;
