import { TaxonomyNodeModel } from '../models/taxonomy-node-model';

export class TaxonomyNodeRepository {
  async create(data: any) {
    return await TaxonomyNodeModel.create(data);
  }

  async createMany(data: any[]) {
    return await TaxonomyNodeModel.insertMany(data, { ordered: true });
  }

  async findAll() {
    return await TaxonomyNodeModel.find().sort({ parentId: 1, order: 1 });
  }

  async findBySlug(slug: string) {
    return await TaxonomyNodeModel.findOne({ slug });
  }

  async deleteAll() {
    return await TaxonomyNodeModel.deleteMany({});
  }
}
