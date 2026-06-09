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

  async findAllActiveWithCursor(
    search?: string,
    type?: string,
    cursor?: string,
    limit: number = 12
  ) {
    const query: any = {
      status: 'active',
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: 'i',
      };
    }

    if (type) {
      query.type = type;
    }

    if (cursor) {
      query._id = { $lt: cursor };
    }

    const items = await PathwayModel.find(query)
      .populate('taxonomyNodeIds', 'id name slug kind parentId')
      .populate('relatedPathwayIds', 'id title slug type summary')
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();

    let hasMore = false;
    let nextCursor: string | null = null;

    if (items.length > limit) {
      hasMore = true;
      const nextItem = items.pop();
      nextCursor = nextItem?._id.toString() || null;
    }

    return {
      items,
      nextCursor,
      hasMore,
    };
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
