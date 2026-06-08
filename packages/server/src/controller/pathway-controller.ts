import type { Request, Response } from 'express';
import { pathwayService } from '../services/pathway-service';

export class PathwayController {
  private readonly service = pathwayService;

  getPathways = async (req: Request, res: Response) => {
    try {
      const { search, type, cursor, limit } = req.query;

      const result = await this.service.getPathways(
        search as string,
        type as string,
        cursor as string,
        Number(limit) || 12
      );

      res.json({
        success: true,
        data: result,
        message: 'Pathway list fetched.',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getPathwayDetail = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    try {
      const result = await this.service.getPathwayDetail(id);

      res.json({
        success: true,
        data: result,
        message: 'Pathway detail fetched.',
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export const pathwayController = new PathwayController();
