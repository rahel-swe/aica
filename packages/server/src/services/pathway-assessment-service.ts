import { PathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';

export class PathwayAssessmentService {
  private static readonly repository = PathwayAssessmentRepository;

  static async submitPathwayAssessment(userId: string, data: any) {
    const existing = await PathwayAssessmentRepository.findByUserId(userId);

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
  static getPathwayAssessmentStatus(userId: string) {
    return this.repository.findByUserId(userId);
  }

  static async deletePathwayAssessment(
    pathwayAssessmentId: string,
    userId: string
  ) {
    return await this.repository.deleteByUserId(pathwayAssessmentId, userId);
  }
}
