import { pathwayRepository } from '../repositories/pathway-repository';

export class PathwayService {
  private readonly repository = pathwayRepository;

  async getPathways(
    search?: string,
    type?: string,
    cursor?: string,
    limit: number = 12
  ) {
    return this.repository.findAllActiveWithCursor(search, type, cursor, limit);
  }

  async getPathwayDetail(idOrSlug: string) {
    const pathway = await this.repository.findActiveDetailByIdOrSlug(idOrSlug);

    if (!pathway) throw new Error('Pathway not found.');

    return pathway;
  }
}

export const pathwayService = new PathwayService();
