import { Router, type Request, type Response } from 'express';

const roadmapRouter = Router();

roadmapRouter.post('/generate', (req: Request, res: Response) => {
  res.send({ success: true, data: req.body, message: 'Roadmap generated.' });
});

roadmapRouter.get('/me', (_req: Request, res: Response) => {
  res.send({
    success: true,
    data: [],
    message: 'Current user roadmap fetched.',
  });
});

export default roadmapRouter;
