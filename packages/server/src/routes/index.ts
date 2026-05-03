import { Router } from 'express';
import pathwayAssessmentRouter from './pathway-assessment-route';
import advisorRouter from './advisor-route';
import adminRouter from './admin-route';
import pathwayRouter from './pathway-route';
import profileRouter from './profile-route';
import recommendationRouter from './recommendation-route';
import roadmapRouter from './roadmap-router';
import { llmClient } from '../llm/llm-client';

const apiRouter = Router();

apiRouter.use('/users', profileRouter);
apiRouter.use('/pathway-assessment', pathwayAssessmentRouter);
apiRouter.use('/pathways', pathwayRouter);
apiRouter.use('/recommendations', recommendationRouter);
apiRouter.use('/roadmaps', roadmapRouter);
apiRouter.use('/advisor', advisorRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.post('/test-llm', llmClient.testLLMClient);

export default apiRouter;
