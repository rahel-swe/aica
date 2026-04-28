import type { Request, Response, NextFunction } from 'express';
import { auth } from '../utils/auth';
import { fromNodeHeaders } from 'better-auth/node';

export interface AuthRequest extends Request {
  user?: any;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !session.user) {
    return res.status(401).json({
      message: 'You are not logged in',
    });
  }

  req.user = session.user;

  next();
};
