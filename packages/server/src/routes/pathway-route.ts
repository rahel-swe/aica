import { Router, type Request, type Response } from 'express';

const pathwayRouter = Router();

pathwayRouter.get('/', (_req: Request, res: Response) => {
  res.send({ success: true, data: [], message: 'Pathway list fetched.' });
});

pathwayRouter.get('/:id', (req: Request, res: Response) => {
  res.send({
    success: true,
    data: { id: req.params.id },
    message: 'Pathway detail fetched.',
  });
});

export default pathwayRouter;
