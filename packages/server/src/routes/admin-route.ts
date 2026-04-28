import { Router, type Request, type Response } from 'express';

const adminRouter = Router();

adminRouter.get('/pathways', (_req: Request, res: Response) => {
  res.send({ success: true, data: [], message: 'Admin pathway list fetched.' });
});

adminRouter.post('/pathways', (req: Request, res: Response) => {
  res.send({
    success: true,
    data: req.body,
    message: 'Admin pathway created.',
  });
});

adminRouter.put('/pathways/:id', (req: Request, res: Response) => {
  res.send({
    success: true,
    data: { id: req.params.id, updates: req.body },
    message: 'Admin pathway updated.',
  });
});

export default adminRouter;
