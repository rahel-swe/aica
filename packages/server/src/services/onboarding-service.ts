import { onboardingRepository } from '../repositories/onboarding-repository';

export class OnboardingService {
  private readonly repository = onboardingRepository;

  async submitOnboarding(userId: string, data: any) {
    const existing = await this.repository.findByUserId(userId);

    if (existing) {
      return await this.repository.updateByUserId(userId, {
        ...data,
        completed: true,
        stepsCompleted: 8,
      });
    }

    // create new
    return await this.repository.create({
      userId,
      ...data,
      completed: true,
      stepsCompleted: 8,
    });
  }
}
