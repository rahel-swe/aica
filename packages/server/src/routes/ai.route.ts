import { Router, type Request, type Response } from 'express';

const chatRouter = Router();

chatRouter.post('/session', (req: Request, res: Response) => {
  // Req: { initialCotect?: {...} }
  // Resp: { sessionId, createdAi }
  // Note: session belongs to req.user.id
  res.send({ success: true, message: 'start chat session' });
});

chatRouter.post(
  '/session/:sessionId/message',
  (req: Request, res: Response) => {
    // Req: { message: string, clientMsgId?: string }
    // Resp: 202 Accepted { messageId, status: "queued" }
    res.send({ success: true, message: 'send a message' });
  }
);

chatRouter.get('/session/:sessionId/history', (req: Request, res: Response) => {
  // Req: { sessionId, messages: [{id, role:user|why|system, text, timestamp, status}] }
  res.send({ success: true, message: 'get chat history' });
});

chatRouter.post('/session/:sessionId/rating', (req: Request, res: Response) => {
  // Req: { messageId, rating: 1-5, feedback?: string }
  // Resp: 202 Accepted { messageId, status: "queued" }
  //   Purpose: training data / improvem
  res.send({ success: true, message: 'user rates an answer' });
});

export default chatRouter;
