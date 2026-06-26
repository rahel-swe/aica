import { savedResourceRepository } from '../repositories/saved-resource-repository';
import { toListView } from './pathway-service';

import type { PathwayListView } from '../../../contracts/src/types/pathway-domain-types';

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

  async getSavedPathways(
    userId: string,
    cursor?: string,
    limit = 12
  ): Promise<{
    items: PathwayListView[];
    nextCursor?: string | null;
    hasMore: boolean;
  }> {
    const docs = await this.repository.findSavedPathwaysByUser(
      userId,
      cursor,
      limit
    );

    const items: PathwayListView[] = docs.items.map((d) =>
      toListView(d.resourceId as any, 'en')
    );

    return { items, nextCursor: docs.nextCursor, hasMore: docs.hasMore };
  }
}

export const savedResourceService = new SavedResourceService();
