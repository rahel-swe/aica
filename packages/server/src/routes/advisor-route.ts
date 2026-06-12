import { Router } from 'express';
import { advisorController } from '../controller/advisor-controller';
import { authorize } from '../middleware/auth-middleware';

const advisorRouter = Router();

// All advisor routes require an authenticated user.
advisorRouter.use(authorize);

// POST /chat → SSE stream (Content-Type: text/event-stream)
// Client must read the stream and parse 'data: {...}' SSE events.
advisorRouter.post('/chat', advisorController.chat);

// GET /conversations → list of conversation summaries (no full messages)
advisorRouter.get('/conversations', advisorController.listConversations);

// GET /conversations/:id → full conversation with all messages
advisorRouter.get('/conversations/:id', advisorController.getConversation);

// DELETE /conversations/:id → delete conversation (only owner can delete)
advisorRouter.delete(
  '/conversations/:id',
  advisorController.deleteConversation
);

export default advisorRouter;
