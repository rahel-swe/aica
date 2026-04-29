import { Router } from 'express';
import assessmentRouter from './assessment-route';
import advisorRouter from './advisor-route';
import adminRouter from './admin-route';
import pathwayRouter from './pathway-route';
import profileRouter from './profile-route';
import recommendationRouter from './recommendation-route';
import roadmapRouter from './roadmap-route';
import { llmClient } from '../llm/llm-client';

const apiRouter = Router();

apiRouter.use('/users', profileRouter);
apiRouter.use('/assessment', assessmentRouter);
apiRouter.use('/pathways', pathwayRouter);
apiRouter.use('/recommendations', recommendationRouter);
apiRouter.use('/roadmaps', roadmapRouter);
apiRouter.use('/advisor', advisorRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.post('/test-llm', llmClient.testLLMClient);

export default apiRouter;
