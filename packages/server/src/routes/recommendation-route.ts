import { Router, type Request, type Response } from 'express';

const recommendationRouter = Router();

recommendationRouter.post('/generate', (req: Request, res: Response) => {
  res.send({
    success: true,
    data: req.body,
    message: 'Recommendations generated.',
  });
});

recommendationRouter.get('/me', (_req: Request, res: Response) => {
  res.send({
    success: true,
    data: [],
    message: 'Current user recommendations fetched.',
  });
});

export default recommendationRouter;
