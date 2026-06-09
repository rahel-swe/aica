import type {
  PathwayDurationProfile,
  PathwayJourneyPhase,
  RecommendationItem,
} from '@contracts/shared/types/pathway-domain-types';
import type {
  RoadmapPhase,
  RoadmapResource,
  RoadmapStep,
} from '@contracts/shared/types/roadmap-types';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import roadmapGenerationPrompt from '@/src/llm/prompts/roadmap-generation-prompt.txt';
import {
  roadmapSourceRefreshService,
  type RoadmapSourceNote,
} from './roadmap-source-refresh-service';
import { createTextCompletion } from '../llm/llm-client';

type PathwayRoadmapContext = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  keySkills: string[];
  opportunities: string[];
  durationProfile: PathwayDurationProfile;
  journeyPhases: PathwayJourneyPhase[];
  verificationNote?: string;
};

type GeneratedRoadmap = {
  title: string;
  summary: string;
  phases: RoadmapPhase[];
  steps: RoadmapStep[];
};

type RoadmapGenerationInput = {
  pathway: PathwayRoadmapContext;
  setup: RoadmapSetupAssessmentFormValues;
  recommendation?: RecommendationItem;
};

type RoadmapTargetContext = {
  level: 'pathway';
  title: string;
  slug: string;
  timelineType: PathwayDurationProfile['timelineType'];
  commitmentLevel: PathwayDurationProfile['commitmentLevel'];
  degreeRequirement: PathwayDurationProfile['degreeRequirement'];
  requiresLicense: boolean;
  localRulesRequired: boolean;
  roadmapWindowLabel: string;
};

export class RoadmapGenerationService {
  private readonly sourceRefreshService = roadmapSourceRefreshService;

  async generateStructuredRoadmap(
    input: RoadmapGenerationInput
  ): Promise<GeneratedRoadmap> {
    const targetContext = this.buildTargetContext(input.pathway);

    const sourceNotes = await this.sourceRefreshService.getSourceNotes(
      input.pathway
    );

    const response = await createTextCompletion(
      this.renderPrompt({ ...input, targetContext, sourceNotes })
    );

    if (!response) throw new Error('Roadmap generation faild');

    const parsed = this.parseGeneratedRoadmap(response);

    if (!parsed) throw new Error('Roadmap parsing failed');

    return parsed;
  }

  private renderPrompt(
    input: RoadmapGenerationInput & {
      targetContext: RoadmapTargetContext;
      sourceNotes: RoadmapSourceNote[];
    }
  ) {
    return roadmapGenerationPrompt
      .replace(
        '{{pathway_json}}',
        JSON.stringify(input.pathway, null, 2) || '{}'
      )
      .replace(
        '{{target_context_json}}',
        JSON.stringify(input.targetContext, null, 2) || '{}'
      )
      .replace('{{setup_json}}', JSON.stringify(input.setup, null, 2) || '{}')
      .replace(
        '{{recommendation_json}}',
        JSON.stringify(input.recommendation ?? null, null, 2)
      )
      .replace(
        '{{source_notes_json}}',
        JSON.stringify(input.sourceNotes, null, 2) || '[]'
      );
  }

  private buildTargetContext(
    pathway: PathwayRoadmapContext
  ): RoadmapTargetContext {
    return {
      level: 'pathway',
      title: pathway.title,
      slug: pathway.slug,
      timelineType: pathway.durationProfile.timelineType,
      commitmentLevel: pathway.durationProfile.commitmentLevel,
      degreeRequirement: pathway.durationProfile.degreeRequirement,
      requiresLicense: pathway.durationProfile.requiresLicense,
      localRulesRequired: pathway.durationProfile.localRulesRequired,
      roadmapWindowLabel: pathway.durationProfile.roadmapWindowLabel,
    };
  }

  private parseGeneratedRoadmap(response: string): GeneratedRoadmap | null {
    const normalized = response.trim();
    const fenced = normalized.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const jsonText = fenced?.[1]?.trim() ?? normalized;
    const startIndex = jsonText.indexOf('{');
    const endIndex = jsonText.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1) return null;

    try {
      const parsed = JSON.parse(jsonText.slice(startIndex, endIndex + 1)) as {
        title?: string;
        summary?: string;
        phases?: Array<{
          id?: string;
          phase?: string;
          title?: string;
          objective?: string;
          order?: number;
        }>;
        steps?: Array<{
          id?: string;
          phaseId?: string;
          title?: string;
          why?: string;
          estimatedTime?: string;
          difficulty?: RoadmapStep['difficulty'];
          prerequisites?: string[];
          resources?: RoadmapResource[];
          evidenceOfCompletion?: string;
          status?: RoadmapStep['status'];
          order?: number;
        }>;
      };

      if (
        !parsed.title ||
        !parsed.summary ||
        !parsed.phases?.length ||
        parsed.phases.length !== 3 ||
        !parsed.steps?.length
      ) {
        return null;
      }

      const phases = parsed.phases
        .map((phase, phaseIndex) => {
          if (!phase.id || !phase.phase || !phase.title || !phase.objective) {
            return null;
          }

          return {
            id: phase.id,
            phase: phase.phase,
            title: phase.title,
            objective: phase.objective,
            order: phase.order ?? phaseIndex + 1,
            status: 'pending',
          } satisfies RoadmapPhase;
        })
        .filter((phase): phase is RoadmapPhase => phase !== null);

      const phaseIds = new Set(phases.map((phase) => phase.id));
      const steps = parsed.steps
        .map((step, stepIndex) => {
          if (
            !step.id ||
            !step.phaseId ||
            !step.title ||
            !step.why ||
            !phaseIds.has(step.phaseId)
          ) {
            return null;
          }

          return {
            id: step.id,
            phaseId: step.phaseId,
            title: step.title,
            why: step.why,
            estimatedTime: step.estimatedTime,
            difficulty: this.normalizeStepDifficulty(step.difficulty),
            prerequisites: step.prerequisites ?? [],
            resources: this.normalizeResources(step.resources),
            evidenceOfCompletion: step.evidenceOfCompletion,
            status: this.normalizeStepStatus(step.status),
            order: step.order ?? stepIndex + 1,
          } satisfies RoadmapStep;
        })
        .filter((step): step is RoadmapStep => step !== null);

      if (phases.length !== 3 || !steps.length) return null;

      return {
        title: parsed.title,
        summary: parsed.summary,
        phases,
        steps: steps.sort((a, b) => {
          if (a.phaseId !== b.phaseId) {
            return a.phaseId.localeCompare(b.phaseId);
          }

          return a.order - b.order;
        }),
      };
    } catch {
      return null;
    }
  }

  private normalizeStepDifficulty(value?: RoadmapStep['difficulty']) {
    if (value === 'easy' || value === 'medium' || value === 'hard')
      return value;

    return 'medium';
  }

  private normalizeStepStatus(value?: RoadmapStep['status']) {
    if (value === 'pending' || value === 'in_progress' || value === 'completed')
      return value;

    return 'pending';
  }

  private normalizeResources(resources?: RoadmapResource[]) {
    const allowedTypes = new Set<RoadmapResource['type']>([
      'course',
      'video',
      'article',
      'project',
      'tool',
      'other',
    ]);

    return (resources ?? [])
      .filter((resource) => !!resource?.title)
      .map((resource) => ({
        title: resource.title,
        url: resource.url,
        type: allowedTypes.has(resource.type) ? resource.type : 'other',
      }));
  }
}

export const roadmapGenerationService = new RoadmapGenerationService();
