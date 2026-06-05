import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth-middleware';
import { profileService } from '../services/profile-service';

export class ProfileController {
  getMe = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user)
        return res.status(401).json({
          success: false,
          message: 'You are not logged in.',
        });

      const profile = await profileService.getProfileStatus(req.user);

      return res.json({
        success: true,
        message: 'Current user profile fetched.',
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export const profileController = new ProfileController();
