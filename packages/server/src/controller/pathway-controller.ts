/**
 * pathway.controller.ts
 *
 * HTTP boundary only. No logic, no type coercion, no translation here.
 * Locale is read from req.locale — set by your i18n middleware before these
 * handlers run. Falls back to DEFAULT_LOCALE if middleware hasn't set it.
 *
 * Error handling:
 *   Service throws typed errors with optional statusCode property.
 *   Unknown errors default to 500. All errors go through next(err) so
 *   your global error handler middleware manages the response shape.
 *
 * Route change: detail endpoint now uses :slug not :id.
 * Frontend should call GET /pathways/frontend-development, not by ObjectId.
 */

import type { Request, Response, NextFunction } from 'express';
import { pathwayService } from '../services/pathway-service';
import type { SupportedLocale } from '@contracts/shared/schemas/i18n';
import type { AuthRequest } from '../middleware/auth-middleware';

function getLocale(req: AuthRequest): SupportedLocale {
  return req.locale;
}

// ── Typed error narrowing ─────────────────────────────────────────────────────

function resolveStatusCode(err: unknown): number {
  if (
    err !== null &&
    typeof err === 'object' &&
    'statusCode' in err &&
    typeof (err as { statusCode: unknown }).statusCode === 'number'
  ) {
    return (err as { statusCode: number }).statusCode;
  }
  return 500;
}

function resolveMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'An unexpected error occurred.';
}

// ── Controller ────────────────────────────────────────────────────────────────

class PathwayController {
  getPathways = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const locale = getLocale(req);
      const { search, type, cursor, limit } = req.query as Record<
        string,
        string | undefined
      >;

      const result = await pathwayService.getPathways(
        locale,
        search,
        type,
        cursor,
        limit !== undefined ? Number(limit) : 12
      );

      res.json({
        success: true,
        message: 'Pathways retrieved.',
        data: result,
      });
    } catch (err) {
      const status = resolveStatusCode(err);
      const message = resolveMessage(err);

      // Pass to global error handler — but also send inline for 4xx
      // to prevent Express from sending a generic HTML response.
      if (status < 500) {
        res.status(status).json({ success: false, message });
        return;
      }

      next(err);
    }
  };

  /**
   * GET /pathways/:slug
   * Uses slug (e.g. "frontend-development") — not MongoDB ObjectId.
   */
  getPathwayDetail = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const locale = getLocale(req);
      const { slug } = req.params as { slug: string };

      const result = await pathwayService.getPathwayDetail(slug, locale);

      res.json({
        success: true,
        message: 'Pathway retrieved.',
        data: result,
      });
    } catch (err) {
      const status = resolveStatusCode(err);
      const message = resolveMessage(err);

      if (status < 500) {
        res.status(status).json({ success: false, message });
        return;
      }

      next(err);
    }
  };
}

export const pathwayController = new PathwayController();
