import { SavedResourceModel } from '../models/saved-resource-model';

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
        'title slug type summary durationProfile taxonomyNodeIds keySkills'
      )
      .lean();
  }

  async findOne(userId: string, resourceId: string) {
    return await SavedResourceModel.findOne({
      userId,
      resourceId,
    });
  }
}

export const savedResourceRepository = new SavedResourceRepository();
