import { Router } from 'express';
import { authorize } from '../middleware/auth-middleware';
import { savedResourceController } from '../controller/saved-resource-controller';

const router = Router();

router.post('/', authorize, savedResourceController.saveResource);

router.get('/', authorize, savedResourceController.getSavedResources);

router.get('/pathways', authorize, savedResourceController.getSavedPathways);

router.delete(
  '/:resourceId',
  authorize,
  savedResourceController.removeResource
);

export default router;
