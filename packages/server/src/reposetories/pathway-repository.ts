import { PathwayModel } from '../models/pathway-model';

export class PathwayRepository {
  async create(data: any) {
    return await PathwayModel.create(data);
  }

  async createMany(data: any[]) {
    return await PathwayModel.insertMany(data, { ordered: true });
  }

  async findAll() {
    return await PathwayModel.find().sort({ title: 1 });
  }

  async findBySlug(slug: string) {
    return await PathwayModel.findOne({ slug });
  }

  async deleteAll() {
    return await PathwayModel.deleteMany({});
  }
}
