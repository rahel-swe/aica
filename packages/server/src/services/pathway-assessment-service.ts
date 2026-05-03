import { pathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';

export class PathwayAssessmentService {
  private readonly repository = pathwayAssessmentRepository;

  async submitPathwayAssessment(userId: string, data: any) {
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
  getPathwayAssessmentStatus(userId: string) {
    return this.repository.findByUserId(userId);
  }
}
