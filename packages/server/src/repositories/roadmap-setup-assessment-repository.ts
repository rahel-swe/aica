import { RoadmapSetupAssessmentModel } from '../models/roadmap-setup-assessment-model';

export class RoadmapSetupAssessmentRepository {
  async create(data: any) {
    return await RoadmapSetupAssessmentModel.create(data);
  }

  async findByUserId(userId: string) {
    return await RoadmapSetupAssessmentModel.findOne({ userId }).lean();
  }

  async updateByUserId(userId: string, data: any) {
    return await RoadmapSetupAssessmentModel.findOneAndUpdate(
      { userId },
      { $set: data },
      { new: true }
    ).lean();
  }

  async deleteByUserId(userId: string) {
    return await RoadmapSetupAssessmentModel.deleteOne({ userId });
  }
}

export const roadmapSetupAssessmentRepository =
  new RoadmapSetupAssessmentRepository();
