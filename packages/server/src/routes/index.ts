import { Router } from 'express';
import pathwayAssessmentRouter from './pathway-assessment-route';
import advisorRouter from './advisor-route';
import adminRouter from './admin-route';
import pathwayRouter from './pathway-route';
import profileRouter from './profile-route';
import recommendationRouter from './recommendation-route';
import roadmapRouter from './roadmap-router';
import dashboardRouter from './dashboard-router';
import { llmClient } from '../llm/llm-client';
import roadmapSetupAssessmentRouter from './roadmap-setup-assessment-router';

const apiRouter = Router();

apiRouter.use('/users', profileRouter);
apiRouter.use('/pathway-assessment', pathwayAssessmentRouter);
apiRouter.use('/roadmap-setup-assessment', roadmapSetupAssessmentRouter);
apiRouter.use('/pathways', pathwayRouter);
apiRouter.use('/recommendations', recommendationRouter);
apiRouter.use('/roadmaps', roadmapRouter);
apiRouter.use('/advisor', advisorRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.post('/test-llm', llmClient.testLLMClient);

export default apiRouter;
