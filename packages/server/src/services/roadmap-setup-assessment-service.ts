import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';

export class RoadmapSetupAssessmentService {
  private static readonly roadmapSetupRepo = roadmapSetupAssessmentRepository;

  static async submitRoadmapSetupAssessment(
    userId: string,
    data: RoadmapSetupAssessmentFormValues
  ) {
    const existing = await this.roadmapSetupRepo.findByUserId(userId);

    if (existing) {
      return await this.roadmapSetupRepo.updateByUserId(userId, {
        ...data,
        completed: true,
        stepsCompleted: 8,
      });
    }

    return await this.roadmapSetupRepo.create({
      userId,
      ...data,
      completed: true,
      stepsCompleted: 8,
    });
  }

  static async getRoadmapSetupStatus(userId: string) {
    return await this.roadmapSetupRepo.findByUserId(userId);
  }

  static async deleteRoadmapSetup(roadmapSetupId: string, userId: string) {
    return await this.roadmapSetupRepo.deleteByUserId(roadmapSetupId, userId);
  }
}
