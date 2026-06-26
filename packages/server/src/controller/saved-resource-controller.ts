import type { Request, Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { savedResourceService } from '../services/saved-resource-service';

export class SavedResourceController {
  private readonly service = savedResourceService;

  saveResource = async (req: AuthRequest, res: Response) => {
    try {
      const { resourceType, resourceId } = req.body;
      const userId = req.user?.id;

      if (!userId) throw new Error('Unauthorized user.');

      const result = await this.service.saveResource(
        userId,
        resourceType as string,
        resourceId as string
      );

      res.json({
        success: true,
        data: result,
        message: 'Resource saved.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  removeResource = async (req: AuthRequest, res: Response) => {
    try {
      const { resourceId } = req.params as {
        resourceId: string;
      };
      const userId = req.user?.id;

      if (!userId) throw new Error('Unauthorized user.');

      const result = await this.service.removeResource(userId, resourceId);

      res.json({
        success: true,
        data: result,
        message: 'Resource removed.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getSavedResources = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw new Error('Unauthorized user.');
      }

      const result = await this.service.getSavedResources(userId);

      res.json({
        success: true,
        data: result,
        message: 'Saved resources fetched.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getSavedPathways = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id || (req.query.userId as string) || '';
      const { cursor, limit } = req.query as Record<string, string | undefined>;

      const pageLimit = limit !== undefined ? Number(limit) : 12;

      const result = await this.service.getSavedPathways(
        userId,
        cursor,
        pageLimit
      );

      res.json({
        success: true,
        data: result,
        message: 'Saved pathways fetched.',
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}

export const savedResourceController = new SavedResourceController();
