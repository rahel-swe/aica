// This ties to the /processing UI

import { Router, type Request, type Response } from 'express';

const processRouter = Router();

processRouter.post('/start', (req: Request, res: Response) => {
  // Req: { userId, onBoarding }
  // Res: { jobId }

  res.send({ success: true, message: 'Process start ' });
});

processRouter.post('/:jobId', (req: Request, res: Response) => {
  // Res: { status: 'queued\running\done\failed', progress: 0-100, message }

  res.send({ success: true, message: 'Process status ' });
});

processRouter.post('/:jobId/result', (req: Request, res: Response) => {
  // Res: { recommendations: [...], summary, metadata }

  res.send({ success: true, message: 'Process status ' });
});

// Best practice

// Use a real queue (BullMQ + Redis or RabbitMQ).

// Expose status polling or SSE/WebSocket for live progress updates.

// Persist job results for re-fetching and auditing.

export default processRouter;
