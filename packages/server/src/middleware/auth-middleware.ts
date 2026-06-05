import type { Request, Response, NextFunction } from 'express';
import { auth } from '../utils/auth';
import { fromNodeHeaders } from 'better-auth/node';
import type { User } from 'better-auth';

export interface AuthRequest extends Request {
  user?: User;
}

export const authorize = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !session.user) {
    res.status(401).json({
      success: false,
      data: null,
      message: 'UNAUTHORIZED',
    });

    return;
  }

  req.user = session.user;

  next();
};
