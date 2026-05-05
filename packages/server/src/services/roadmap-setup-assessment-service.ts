import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';

export class RoadmapSetupAssessmentService {
  private readonly repository = roadmapSetupAssessmentRepository;

  async submitRoadmapSetupAssessment(userId: string, data: any) {
    const existing = await this.repository.findByUserId(userId);

    if (existing) {
      return await this.repository.updateByUserId(userId, {
        ...data,
        completed: true,
        stepsCompleted: 8,
      });
    }

    console.log(data);

    return await this.repository.create({
      userId,
      ...data,
      completed: true,
      stepsCompleted: 8,
    });
  }

  async updateRoadmapSetupAssessment(userId: string, data: any) {
    const existing = await this.repository.findByUserId(userId);

    if (!existing) {
      return await this.repository.create({
        userId,
        ...data,
        completed: true,
        stepsCompleted: 8,
      });
    }

    return await this.repository.updateByUserId(userId, {
      ...data,
      completed: true,
      stepsCompleted: 8,
    });
  }

  getRoadmapSetupStatus(userId: string) {
    return this.repository.findByUserId(userId);
  }
}
