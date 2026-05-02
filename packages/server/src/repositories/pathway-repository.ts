import mongoose from 'mongoose';
import '../models/taxonomy-node-model';
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

  async findAllActiveWithDetails() {
    return await PathwayModel.find({ status: 'active' })
      .populate('taxonomyNodeIds', 'id name slug kind parentId')
      .populate('relatedPathwayIds', 'id title slug type summary')
      .sort({ title: 1 })
      .lean();
  }

  async findActiveDetailByIdOrSlug(idOrSlug: string) {
    const orConditions: { slug?: string; _id?: string }[] = [
      { slug: idOrSlug },
    ];

    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      orConditions.push({ _id: idOrSlug });
    }

    return await PathwayModel.findOne({
      status: 'active',
      $or: orConditions,
    })
      .populate('taxonomyNodeIds', 'id name slug kind parentId')
      .populate('relatedPathwayIds', 'id title slug type summary')
      .lean();
  }
}

export const pathwayRepository = new PathwayRepository();
