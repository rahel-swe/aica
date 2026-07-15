import type { Request, Response } from 'express';
import { advisorService } from '../services/advisor/advisor-chat-service';
import { advisorChatRequestSchema } from '@contracts/shared/schemas/advisor-schema';
import { ZodError } from 'zod';
import { advisorConversationService } from '../services/advisor/advisor-conversation-service';

class AdvisorController {
  // POST /chat
  // Sets SSE headers BEFORE calling the service — once headers are sent, you can't change them.
  // The service writes directly to res and calls res.end().
  chat = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id as string;
      const request = advisorChatRequestSchema.parse(req.body);

      // SSE setup — must happen before any async work that could throw
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no'); // disables Nginx buffering for SSE
      res.flushHeaders();

      await advisorService.chat(userId, request, res);
    } catch (err) {
      if (err instanceof ZodError) {
        // Headers may not be sent yet if Zod threw before we flushed
        if (!res.headersSent)
          res.status(400).json({
            success: false,
            message: 'Invalid request',
            errors: err.flatten().fieldErrors,
          });

        return;
      }

      // If headers were already sent (SSE started), the service handles cleanup
      if (!res.headersSent) {
        res
          .status(500)
          .json({ success: false, message: 'Internal server error' });
      }
    }
  };

  listConversations = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id as string;
      const data = await advisorConversationService.listConversations(userId);
      res.json({ success: true, data });
    } catch {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };

  getConversation = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id as string;
      const conversation = await advisorConversationService.getConversation(
        req.params.id as string,
        userId
      );

      if (!conversation) {
        res
          .status(404)
          .json({ success: false, message: 'Conversation not found' });

        return;
      }

      res.json({ success: true, data: conversation });
    } catch {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };

  deleteConversation = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id as string;
      const deleted = await advisorConversationService.deleteConversation(
        req.params.id as string,
        userId
      );

      if (!deleted) {
        res
          .status(404)
          .json({ success: false, message: 'Conversation not found' });

        return;
      }

      res.json({ success: true, message: 'Conversation deleted' });
    } catch {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  };
}

export const advisorController = new AdvisorController();
