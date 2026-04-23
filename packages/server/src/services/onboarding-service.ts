import { OnboardingRepository } from '../reposetories/onboarding-repository';

const repo = new OnboardingRepository();

export class OnboardingService {
  async submitOnboarding(userId: string, data: any) {
    const existing = await repo.findByUserId(userId);

    if (existing) {
      return await repo.updateByUserId(userId, {
        ...data,
        completed: true,
        stepsCompleted: 8,
      });
    }

    // create new
    return await repo.create({
      userId,
      ...data,
      completed: true,
      stepsCompleted: 8,
    });
  }
}
