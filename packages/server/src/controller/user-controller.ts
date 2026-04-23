import type { Request, Response } from 'express';
import { UserService } from '../services/user-service';

const service = new UserService();

export const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const user = await service.createUser(data);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Invalid user data',
      });
    }
  },

  getUsers: async (_req: Request, res: Response) => {
    const users = await service.getUsers();

    res.json({
      success: true,
      data: users,
    });
  },
};
