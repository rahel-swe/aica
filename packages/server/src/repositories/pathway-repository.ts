import { PathwayModel } from '../models/pathway-model';

export class PathwayRepository {
  async createMany(data: any[]) {
    return await PathwayModel.insertMany(data, { ordered: true });
  }

  async deleteAll() {
    return await PathwayModel.deleteMany({});
  }

  async findActiveByIds(ids: string[]) {
    return await PathwayModel.find({
      _id: { $in: ids },
      status: 'active',
    });
  }

  async findAllActive() {
    return await PathwayModel.find({ status: 'active' });
  }
}

export const pathwayRepository = new PathwayRepository();
