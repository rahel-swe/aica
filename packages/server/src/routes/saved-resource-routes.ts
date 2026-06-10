import { Router } from 'express';
import { savedResourceController } from '../controller/saved-resource-controller';

const router = Router();

router.post('/', savedResourceController.saveResource);

router.get('/', savedResourceController.getSavedResources);

router.delete('/:resourceId', savedResourceController.removeResource);

export default router;
