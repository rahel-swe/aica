import { Onboarding } from '../models/onboarding-model';

export class OnboardingRepository {
  async create(data: any) {
    return await Onboarding.create(data);
  }

  async findByUserId(userId: string) {
    return await Onboarding.findOne({ userId });
  }

  async updateByUserId(userId: string, data: any) {
    return await Onboarding.findOneAndUpdate({ userId }, data, { new: true });
  }
}
