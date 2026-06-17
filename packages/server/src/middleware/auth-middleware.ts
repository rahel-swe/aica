import type { Request, Response, NextFunction } from 'express';
import { auth } from '../utils/auth';
import { fromNodeHeaders } from 'better-auth/node';
import type { User } from 'better-auth';

import { parse } from 'cookie';
import {
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '@contracts/shared/schemas/i18n';

export interface AuthRequest extends Request {
  user?: User;
  locale: SupportedLocale;
}

export const authorize = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  const cookies = parse(req.headers.cookie ?? '');
  const locale = cookies.PARAGLIDE_LOCALE as SupportedLocale;

  if (!session || !session.user) {
    res.status(401).json({
      success: false,
      data: null,
      message: 'UNAUTHORIZED',
    });

    return;
  }

  req.user = session.user;

  req.locale = SUPPORTED_LOCALES.includes(locale) ? locale : 'en';

  next();
};
