import { Router, type Request, type Response } from 'express';

const dashboardRouter = Router();

dashboardRouter.get('/', (req: Request, res: Response) => {
  // Res { welcome, topRecommendations: [...], status: {...} }
  res.send({ success: true, messages: 'Get dashboard mitrics' });
});

dashboardRouter.get('/roadmap-preview', (req: Request, res: Response) => {
  // Short roadmap preview for UI
  res.send({ success: true, message: 'Get short roadmap' });
});

export default dashboardRouter;
