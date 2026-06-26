import mongoose from 'mongoose';
import { SavedResourceModel } from '../models/saved-resource-model';

const TAXONOMY_SELECT = 'slug kind parentId order translations';

export class SavedResourceRepository {
  async create(data: {
    userId: string;
    resourceType: string;
    resourceId: string;
  }) {
    return await SavedResourceModel.create(data);
  }

  async delete(userId: string, resourceId: string) {
    return await SavedResourceModel.findOneAndDelete({
      userId,
      resourceId,
    });
  }

  async findByUser(userId: string) {
    return await SavedResourceModel.find({
      userId,
    })
      .populate(
        'resourceId',
        'slug type status visibilityLayer durationProfile translations taxonomyNodeIds keySkills'
      )
      .populate({
        path: 'resourceId',
        populate: {
          path: 'taxonomyNodeIds',
          select: TAXONOMY_SELECT,
        },
      })
      .lean();
  }

  async findSavedPathwaysByUser(
    userId: string,
    cursor?: string,
    limit: number = 12
  ) {
    const query: Record<string, unknown> = {
      userId,
      resourceType: 'pathway',
    };

    if (cursor) query._id = { $lt: new mongoose.Types.ObjectId(cursor) };

    const docs = await SavedResourceModel.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .populate(
        'resourceId',
        'slug type status visibilityLayer durationProfile translations taxonomyNodeIds keySkills'
      )
      .populate({
        path: 'resourceId',
        populate: {
          path: 'taxonomyNodeIds',
          select: TAXONOMY_SELECT,
        },
      })
      .lean();

    const hasMore = docs.length > limit;
    const items = hasMore ? docs.slice(0, limit) : docs;
    const nextCursor =
      hasMore && items.length > 0
        ? String((items as any)[items.length - 1]._id)
        : null;

    return { items, nextCursor, hasMore };
  }

  async findOne(userId: string, resourceId: string) {
    return await SavedResourceModel.findOne({
      userId,
      resourceId,
    });
  }
}

export const savedResourceRepository = new SavedResourceRepository();
