import { PathwayAssessmentModel } from '../models/pathway-assessment-model';

export class PathwayAssessmentRepository {
  async create(data: any) {
    return await PathwayAssessmentModel.create(data);
  }

  async findByUserId(userId: string) {
    return await PathwayAssessmentModel.findOne({ userId });
  }

  async updateByUserId(userId: string, data: any) {
    return await PathwayAssessmentModel.findOneAndUpdate({ userId }, data, {
      new: true,
    });
  }

  async deleteByUserId(id: string, userId: string) {
    return await PathwayAssessmentModel.deleteOne({
      _id: id,
      userId,
    });
  }
}

export const pathwayAssessmentRepository = new PathwayAssessmentRepository();
