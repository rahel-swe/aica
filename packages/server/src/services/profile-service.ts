import type { User } from 'better-auth';
import { PathwayAssessmentRepository } from '../repositories/pathway-assessment-repository';
import { roadmapSetupAssessmentRepository } from '../repositories/roadmap-setup-assessment-repository';

export class ProfileService {
  private readonly pathwayAssessmentRepo = PathwayAssessmentRepository;
  private readonly roadmapSetupAssessmentRepository =
    roadmapSetupAssessmentRepository;

  async getProfileStatus(user: User) {
    const [pathwayAssessment, roadmapSetupAssessment] = await Promise.all([
      this.pathwayAssessmentRepo.findByUserId(user.id),
      this.roadmapSetupAssessmentRepository.findByUserId(user.id),
    ]);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      assessments: {
        pathwayAssessmentCompleted: !!pathwayAssessment?.completed,
        pathwayAssessmentId: pathwayAssessment?._id,
        roadmapSetupAssessmentId: roadmapSetupAssessment?._id,
        roadmapSetupCompleted: !!roadmapSetupAssessment?.completed,
      },
    };
  }
}

export const profileService = new ProfileService();
