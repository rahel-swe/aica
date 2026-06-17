import type { Response, NextFunction } from 'express';

import { recommendationService } from '../services/recommendation-service';
import { recommendationExplanationService } from '../services/recommendation-explanation-service';
import { recommendationReScoringService } from '../services/recommendation-rescoring-service';
import type { AuthRequest } from '../middleware/auth-middleware';

class RecommendationController {
  /**
     Runs the full scoring pipeline for the requesting user.
   */
  generate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const overview = await recommendationService.generate(userId);

      res.status(200).json({
        success: true,
        message: 'Recommendations generated.',
        data: overview,
      });
    } catch (err) {
      next(err);
    }
  };

  getOverview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const overview = await recommendationService.getOverview(userId);

      const hasData =
        overview.families.length > 0 || overview.pathways.length > 0;

      res.status(200).json({
        success: true,
        message: hasData
          ? 'Recommendations retrieved.'
          : 'No recommendations yet. Call POST /generate first.',
        data: overview,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
    Returns an LLM-generated explanation for one recommendation.
   */
  getExplanation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.id;
      const recommendationId = req.params.id as string;

      const result = await recommendationExplanationService.getOrGenerate(
        recommendationId,
        userId
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  // ── Admin: rescore one user

  rescoreUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.params as { id: string };

      const result = await recommendationReScoringService.rescoreUser(
        userId,
        'manual_admin_trigger'
      );

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  // ── Admin: rescore all users affected by a pathway profile change

  rescoreByPathway = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pathwaySlug } = req.body as { pathwaySlug: string };

      if (!pathwaySlug) {
        res.status(400).json({
          success: false,
          message: 'pathwaySlug is required in the request body.',
        });
        return;
      }

      const result = await recommendationReScoringService.rescoreByPathwaySlug(
        pathwaySlug,
        'pathway_profile_updated'
      );

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  // ── Admin: batch rescore stale recommendations

  rescoreStale = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const batchSize = Number(req.query.batchSize) || 20;

      const result = await recommendationReScoringService.rescoreStale(
        batchSize,
        'algorithm_version_changed'
      );

      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  // ── Admin: stale count health check

  getStaleCount = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const count = await recommendationReScoringService.getStaleCount();

      res.status(200).json({
        success: true,
        data: {
          staleCount: count,
          matchingVersion: (await import('../utils/pathway-scoring-engin'))
            .CURRENT_MATCHING_VERSION,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}

export const recommendationController = new RecommendationController();
