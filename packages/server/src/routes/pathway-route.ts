import { Router } from 'express';
import { pathwayController } from '../controller/pathway-controller';
import { authorize } from '../middleware/auth-middleware';

const pathwayRouter = Router();

pathwayRouter.get('/', authorize, pathwayController.getPathways);

pathwayRouter.get('/:id', authorize, pathwayController.getPathwayDetail);

export default pathwayRouter;
