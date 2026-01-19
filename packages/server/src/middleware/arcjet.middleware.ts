import aj from '../config/arcjet-config';
import { isSpoofedBot } from '@arcjet/inspect';
import type { NextFunction, Request, Response } from 'express';

const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const url = `http://${req.headers.host}${req.originalUrl}`;

    const webReq = new Request(url, {
      method: req.method,
      headers: req.headers as HeadersInit,
    });

    const decision = await aj.protect(webReq, { requested: 5 });
    console.log('Arcjet decision', decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: 'Too Many Requests' });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: 'NO Bot Allowed' });
      }
      return res.status(403).json({ error: 'Access Denied' });
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: 'Spoofed Bots are not allowed' });
    }

    next();
  } catch (error) {
    console.error('Arcjet middleware error:', error);
    next(error);
  }
};

export default arcjetMiddleware;
