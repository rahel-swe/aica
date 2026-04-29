import { RecommendationModel } from '../models/recommendation-model';

export class RecommendationRepository {
  async replaceForUser(userId: string, data: any[]) {
    await RecommendationModel.deleteMany({ userId });
    return await RecommendationModel.insertMany(data, { ordered: true });
  }

  async findByUserId(userId: string) {
    return await RecommendationModel.find({ userId }).sort({ rank: 1 });
  }
}

export const recommendationRepository = new RecommendationRepository();
