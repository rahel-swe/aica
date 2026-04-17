import { Router, type Request, type Response } from 'express';

const assessmentRouter = Router();

assessmentRouter.post('/submit', (req: Request, res: Response) => {
  res.send({
    success: true,
    data: req.body,
    message: 'Assessment responses saved.',
  });
});

assessmentRouter.get('/status', (_req: Request, res: Response) => {
  res.send({
    success: true,
    data: { completed: false, stepsCompleted: 0 },
    message: 'Assessment status fetched.',
  });
});

export default assessmentRouter;
