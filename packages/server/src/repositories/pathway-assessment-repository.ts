import { PathwayAssessmentModel } from '../models/pathway-assessment-model';

export class PathwayAssessmentRepository {
  static async create(data: any) {
    return await PathwayAssessmentModel.create(data);
  }

  static async findByUserId(userId: string) {
    return await PathwayAssessmentModel.findOne({ userId });
  }

  static async updateByUserId(userId: string, data: any) {
    return await PathwayAssessmentModel.findOneAndUpdate({ userId }, data, {
      returnDocument: 'after',
    });
  }

  static async deleteByUserId(id: string, userId: string) {
    return await PathwayAssessmentModel.deleteOne({
      _id: id,
      userId,
    });
  }
}
