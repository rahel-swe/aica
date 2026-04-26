import { Types } from 'mongoose';
import { PathwayMatchProfileModel } from '../models/pathway-match-profile-model';

export class PathwayMatchProfileRepository {
  async create(data: any) {
    return await PathwayMatchProfileModel.create(data);
  }

  async createMany(data: any[]) {
    return await PathwayMatchProfileModel.insertMany(data, { ordered: true });
  }

  async findAll() {
    return await PathwayMatchProfileModel.find().sort({ pathwayId: 1 });
  }

  async findByPathwayId(pathwayId: string) {
    return await PathwayMatchProfileModel.findOne({ pathwayId });
  }

  async deleteAll() {
    return await PathwayMatchProfileModel.deleteMany({});
  }
}
