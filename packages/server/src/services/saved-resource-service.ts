import { savedResourceRepository } from '../repositories/saved-resource-repository';

export class SavedResourceService {
  private readonly repository = savedResourceRepository;

  async saveResource(userId: string, resourceType: string, resourceId: string) {
    const existing = await this.repository.findOne(userId, resourceId);

    if (existing) {
      return existing;
    }

    return await this.repository.create({
      userId,
      resourceType,
      resourceId,
    });
  }

  async removeResource(userId: string, resourceId: string) {
    return await this.repository.delete(userId, resourceId);
  }

  async getSavedResources(userId: string) {
    return await this.repository.findByUser(userId);
  }
}

export const savedResourceService = new SavedResourceService();
