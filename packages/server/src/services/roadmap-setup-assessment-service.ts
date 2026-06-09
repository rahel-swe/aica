import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';

export class RoadmapSetupAssessmentService {
  private readonly roadmapSetupRepository = roadmapSetupAssessmentRepository;

  async submitRoadmapSetupAssessment(
    userId: string,
    data: RoadmapSetupAssessmentFormValues
  ) {
    const existing = await this.roadmapSetupRepository.findByUserId(userId);

    if (existing) {
      return await this.roadmapSetupRepository.updateByUserId(userId, {
        ...data,
        completed: true,
        stepsCompleted: 8,
      });
    }

    return await this.roadmapSetupRepository.create({
      userId,
      ...data,
      completed: true,
      stepsCompleted: 8,
    });
  }

  async getRoadmapSetupStatus(userId: string) {
    return await this.roadmapSetupRepository.findByUserId(userId);
  }

  async deleteRoadmapSetup(roadmapSetupId: string, userId: string) {
    return await this.roadmapSetupRepository.deleteByUserId(
      roadmapSetupId,
      userId
    );
  }
}
