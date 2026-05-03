import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';
import type {
  Roadmap,
  RoadmapStep,
} from '@contracts/shared/types/roadmap-types';
import { pathwayRepository } from '../repositories/pathway-repository';
import { recommendationRepository } from '../repositories/recommendation-repository';
import { roadmapRepository } from '../repositories/roadmap-repository';
import { roadmapGuidanceService } from './roadmap-guidance-service';

type PathwayDetailRecord = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  keySkills: string[];
  learningRoute: string[];
  opportunities: string[];
};

export class RoadmapService {
  private readonly pathwayRepository = pathwayRepository;
  private readonly recommendationRepository = recommendationRepository;
  private readonly roadmapRepository = roadmapRepository;
  private readonly roadmapGuidanceService = roadmapGuidanceService;

  async generateRoadmap(userId: string, pathwayId: string) {
    const pathway =
      await this.pathwayRepository.findActiveDetailByIdOrSlug(pathwayId);

    if (!pathway) {
      throw new Error('Pathway not found.');
    }

    const savedRecommendations =
      await this.recommendationRepository.findByUserId(userId);
    const recommendation = savedRecommendations.find(
      (item) => String(item.pathwayId) === String(pathway._id)
    );

    const steps = this.buildSteps(pathway as unknown as PathwayDetailRecord);

    const guidanceNote = await this.roadmapGuidanceService.buildGuidanceNote({
      pathwayTitle: pathway.title,
      pathwaySummary: pathway.summary,
      keySkills: pathway.keySkills,
      learningRoute: pathway.learningRoute,
      opportunities: pathway.opportunities,
      recommendation: recommendation
        ? {
            pathwayId: String(recommendation.pathwayId),
            title: recommendation.title,
            slug: recommendation.slug,
            type: recommendation.type,
            summary: recommendation.summary,
            totalScore: recommendation.totalScore,
            dimensionScores: recommendation.dimensionScores,
            reasons: recommendation.reasons,
            explanation: recommendation.explanation,
            rank: recommendation.rank,
            matchingVersion: recommendation.matchingVersion,
          }
        : undefined,
    });

    const created = await this.roadmapRepository.create({
      userId,
      pathwayId: pathway._id,
      title: `${pathway.title} roadmap`,
      summary: `A practical roadmap for progressing toward ${pathway.title}.`,
      guidanceNote,
      steps,
      sourceRecommendation: recommendation
        ? {
            pathwayId: String(recommendation.pathwayId),
            reasons: recommendation.reasons,
            explanation: recommendation.explanation,
            totalScore: recommendation.totalScore,
          }
        : undefined,
    });

    return created;
  }

  async getRoadmaps(userId: string) {
    const roadmaps = await this.roadmapRepository.findByUserId(userId);

    return roadmaps[0];
  }

  private buildSteps(pathway: PathwayDetailRecord): RoadmapStep[] {
    const shortTerm = this.uniqueNonEmpty([
      pathway.learningRoute[0],
      pathway.keySkills[0]
        ? `Build foundation in ${pathway.keySkills[0]}.`
        : '',
      'Review what this pathway expects and identify your current gaps.',
    ]);

    const mediumTerm = this.uniqueNonEmpty([
      pathway.learningRoute[1],
      pathway.keySkills[1]
        ? `Practice ${pathway.keySkills[1]} through small projects or guided work.`
        : '',
      pathway.opportunities[0]
        ? `Explore realistic environments such as ${pathway.opportunities[0]}.`
        : '',
    ]);

    const longTerm = this.uniqueNonEmpty([
      pathway.learningRoute[2],
      'Create visible proof of progress through projects, coursework, or practical experience.',
      'Review progress, adjust goals, and choose the next specialization step.',
    ]);

    return [...shortTerm, ...mediumTerm, ...longTerm].map(
      (description, index) => {
        const phase =
          index < shortTerm.length
            ? 'short_term'
            : index < shortTerm.length + mediumTerm.length
              ? 'medium_term'
              : 'long_term';

        return {
          id: `step_${index + 1}`,
          title: this.buildStepTitle(phase, index + 1),
          description,
          phase,
          order: index + 1,
          status: 'pending',
        } satisfies RoadmapStep;
      }
    );
  }

  private uniqueNonEmpty(values: string[]): string[] {
    return [...new Set(values.map((value) => value?.trim()).filter(Boolean))];
  }

  private buildStepTitle(phase: RoadmapStep['phase'], order: number): string {
    if (phase === 'short_term') return `Short-term step ${order}`;
    if (phase === 'medium_term') return `Medium-term step ${order}`;
    return `Long-term step ${order}`;
  }
}

export const roadmapService = new RoadmapService();
