/**
 * Changed: detail route param is now :slug not :id.
 * Locale middleware must run before these routes so req.locale is available.
 * Mount order in your app.ts: localeMiddleware → authorize → pathwayRouter.
 */

import { Router } from 'express';
import { pathwayController } from '../controller/pathway-controller';
import { authorize } from '../middleware/auth-middleware';

const pathwayRouter = Router();

pathwayRouter.get('/', authorize, pathwayController.getPathways);
pathwayRouter.get('/:slug', authorize, pathwayController.getPathwayDetail);

export default pathwayRouter;
