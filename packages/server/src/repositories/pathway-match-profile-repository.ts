import { PathwayMatchProfileModel } from '../models/pathway-match-profile-model';

export class PathwayMatchProfileRepository {
  async createMany(data: any[]) {
    return await PathwayMatchProfileModel.insertMany(data, { ordered: true });
  }

  async deleteAll() {
    return await PathwayMatchProfileModel.deleteMany({});
  }

  async findAllActive() {
    return await PathwayMatchProfileModel.find({ status: 'active' });
  }
}

export const pathwayMatchProfileRepository =
  new PathwayMatchProfileRepository();
