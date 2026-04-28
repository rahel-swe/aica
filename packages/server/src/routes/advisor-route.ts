import { Router, type Request, type Response } from 'express';

const advisorRouter = Router();

advisorRouter.post('/chat', (req: Request, res: Response) => {
  res.send({
    success: true,
    data: req.body,
    message: 'Advisor message accepted.',
  });
});

export default advisorRouter;
