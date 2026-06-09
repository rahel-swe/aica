import { RecommendationModel } from '../models/recommendation-model';

export class RecommendationRepository {
  async replaceForUser(userId: string, data: any[]) {
    await RecommendationModel.deleteMany({ userId });
    return await RecommendationModel.insertMany(data, { ordered: true });
  }

  async findByUserId(userId: string) {
    return await RecommendationModel.find({ userId }).sort({ rank: 1 }).lean();
  }

  async deleteMyRecommendations(userId: string) {
    return await RecommendationModel.deleteMany({ userId });
  }
}

export const recommendationRepository = new RecommendationRepository();
