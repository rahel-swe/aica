import type { SignUpFormType } from '@contracts/shared/types/auth-types';
import { UserModel } from '../models/user-model';

export class UserService {
  async createUser(data: SignUpFormType) {
    const user = await UserModel.create(data);

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      isEmailVerified: user.isEmailVerified,
    };
  }

  async getUsers() {
    const users = await UserModel.find();

    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      isEmailVerified: user.isEmailVerified,
    }));
  }
}
