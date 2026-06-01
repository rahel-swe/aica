import { Router } from 'express';
import { advisorController } from '../controller/advisor-controller';
import { authorize } from '../middleware/auth-middleware';

const advisorRouter = Router();

advisorRouter.post('/chat', authorize, advisorController.chat);
advisorRouter.get('/history', authorize, advisorController.history);

export default advisorRouter;
