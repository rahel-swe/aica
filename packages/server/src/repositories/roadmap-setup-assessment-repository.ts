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
      { returnDocument: 'after' }
    ).lean();
  }

  async deleteByUserId(id: string, userId: string) {
    return await RoadmapSetupAssessmentModel.deleteOne({
      _id: id,
      userId,
    });
  }
}

export const roadmapSetupAssessmentRepository =
  new RoadmapSetupAssessmentRepository();
