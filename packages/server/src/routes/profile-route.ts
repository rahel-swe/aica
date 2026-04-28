import { Router, type Request, type Response } from 'express';

const profileRouter = Router();

profileRouter.get('/me', (_req: Request, res: Response) => {
  res.send({
    success: true,
    data: { profileStatus: 'draft' },
    message: 'Current user profile fetched.',
  });
});

profileRouter.put('/me/profile', (req: Request, res: Response) => {
  res.send({
    success: true,
    data: req.body,
    message: 'Current user profile updated.',
  });
});

profileRouter.delete('/me', (_req: Request, res: Response) => {
  res.send({ success: true, message: 'Current user account deleted.' });
});

export default profileRouter;
