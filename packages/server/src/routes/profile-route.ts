import { Router } from 'express';
import { authorize } from '../middleware/auth-middleware';
import { profileController } from '../controller/profile-controller';

const profileRouter = Router();

profileRouter.get('/me', authorize, profileController.getMe);

export default profileRouter;
