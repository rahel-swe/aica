import { RoadmapModel } from '../models/roadmap-model';

export class RoadmapRepository {
  async create(data: any) {
    return await RoadmapModel.create(data);
  }

  async replaceActiveForUserPathway(
    userId: string,
    pathwayId: string,
    data: any
  ) {
    return await RoadmapModel.findOneAndUpdate(
      {
        userId,
        pathwayId,
        status: 'active',
      },
      {
        $set: data,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  async findByUserId(userId: string) {
    return await RoadmapModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }
}

export const roadmapRepository = new RoadmapRepository();
