import { PathwayMatchProfileModel } from '../models/pathway-match-profile-model';

export const pathwayMatchProfileRepository = {
  async create(data: any) {
    return await PathwayMatchProfileModel.create(data);
  },

  async createMany(data: any[]) {
    return await PathwayMatchProfileModel.insertMany(data, { ordered: true });
  },

  async findAll() {
    return await PathwayMatchProfileModel.find().sort({ pathwayId: 1 });
  },

  async findByPathwayId(pathwayId: string) {
    return await PathwayMatchProfileModel.findOne({ pathwayId });
  },

  async deleteAll() {
    return await PathwayMatchProfileModel.deleteMany({});
  },
};
