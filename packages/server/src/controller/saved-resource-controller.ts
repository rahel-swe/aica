import type { Request, Response } from 'express';
import { savedResourceService } from '../services/saved-resource-service';

export class SavedResourceController {
  private readonly service = savedResourceService;

  saveResource = async (req: Request, res: Response) => {
    try {
      const { userId, resourceType, resourceId } = req.body;

      const result = await this.service.saveResource(
        userId as string,
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

  removeResource = async (req: Request, res: Response) => {
    try {
      const { resourceId } = req.params as {
        resourceId: string;
      };

      const { userId } = req.body;

      const result = await this.service.removeResource(
        userId as string,
        resourceId
      );

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

  getSavedResources = async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;

      const result = await this.service.getSavedResources(userId as string);

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
}

export const savedResourceController = new SavedResourceController();
