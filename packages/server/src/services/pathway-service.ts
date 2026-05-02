import { pathwayRepository } from '../repositories/pathway-repository';

export class PathwayService {
  private readonly repository = pathwayRepository;

  async getPathways() {
    const pathways = await this.repository.findAllActiveWithDetails();

    return pathways;
  }

  async getPathwayDetail(idOrSlug: string) {
    const pathway = await this.repository.findActiveDetailByIdOrSlug(idOrSlug);

    if (!pathway) throw new Error('Pathway not found.');

    return pathway;
  }
}

export const pathwayService = new PathwayService();
