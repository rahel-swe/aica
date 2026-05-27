import type {
  PathwayDurationProfile,
  PathwayJourneyPhase,
  RecommendationResult,
} from '@contracts/shared/types/pathway-domain-types';
import type {
  RoadmapPhase,
  RoadmapResource,
  RoadmapStep,
} from '@contracts/shared/types/roadmap-types';
import type { RoadmapSetupAssessmentFormValues } from '@contracts/shared/types/roadmap-setup-assessment-types';
import { llmClient } from '../llm/llm-client';
import roadmapGenerationPrompt from '@/src/llm/prompts/roadmap-generation-prompt.txt';

type PathwayRoadmapContext = {
  title: string;
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

export class RoadmapGenerationService {
  private readonly llmClient = llmClient;

  async generateStructuredRoadmap(input: {
    pathway: PathwayRoadmapContext;
    setup: RoadmapSetupAssessmentFormValues;
    recommendation?: RecommendationResult;
  }): Promise<GeneratedRoadmap> {
    if (!process.env.HF_TOKEN) {
      return this.buildFallbackRoadmap(input);
    }

    try {
      const response = await this.llmClient.createTextCompletion(
        this.renderPrompt(input)
      );
      const parsed = this.parseGeneratedRoadmap(response);

      if (!parsed) {
        return this.buildFallbackRoadmap(input);
      }

      return parsed;
    } catch {
      return this.buildFallbackRoadmap(input);
    }
  }

  private renderPrompt(input: {
    pathway: PathwayRoadmapContext;
    setup: RoadmapSetupAssessmentFormValues;
    recommendation?: RecommendationResult;
  }) {
    return roadmapGenerationPrompt
      .replace(
        '{{pathway_json}}',
        JSON.stringify(input.pathway, null, 2) || '{}'
      )
      .replace('{{setup_json}}', JSON.stringify(input.setup, null, 2) || '{}')
      .replace(
        '{{recommendation_json}}',
        JSON.stringify(input.recommendation ?? null, null, 2)
      );
  }

  private parseGeneratedRoadmap(response: string): GeneratedRoadmap | null {
    const normalized = response.trim();
    const fenced = normalized.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const jsonText = fenced?.[1]?.trim() ?? normalized;
    const startIndex = jsonText.indexOf('{');
    const endIndex = jsonText.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1) {
      return null;
    }

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
            difficulty: step.difficulty ?? 'medium',
            prerequisites: step.prerequisites ?? [],
            resources: (step.resources ?? []).filter(
              (resource) => !!resource?.title
            ),
            evidenceOfCompletion: step.evidenceOfCompletion,
            status: step.status ?? 'pending',
            order: step.order ?? stepIndex + 1,
          } satisfies RoadmapStep;
        })
        .filter((step): step is RoadmapStep => step !== null);

      if (phases.length !== 3 || !steps.length) {
        return null;
      }

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

  private buildFallbackRoadmap(input: {
    pathway: PathwayRoadmapContext;
    setup: RoadmapSetupAssessmentFormValues;
    recommendation?: RecommendationResult;
  }): GeneratedRoadmap {
    const journeyPhases = input.pathway.journeyPhases.slice(0, 3);
    const phaseNames = ['foundation', 'practice', 'positioning'];

    const steps = journeyPhases.flatMap((journeyPhase, index) =>
      this.buildFallbackSteps({
        pathway: input.pathway,
        setup: input.setup,
        journeyPhase,
        phaseIndex: index,
      })
    );

    const phases = journeyPhases.map((journeyPhase, index) => {
      return {
        id: `phase_${index + 1}`,
        phase: phaseNames[index] ?? `phase_${index + 1}`,
        title: journeyPhase.name,
        objective: journeyPhase.focus,
        order: index + 1,
        status: 'pending',
      } satisfies RoadmapPhase;
    });

    return {
      title:
        input.pathway.durationProfile.commitmentLevel === 'long'
          ? `${input.pathway.title} next action plan`
          : `${input.pathway.title} roadmap`,
      summary: this.buildFallbackSummary(input.pathway, input.setup),
      phases,
      steps,
    };
  }

  private buildFallbackSteps(input: {
    pathway: PathwayRoadmapContext;
    setup: RoadmapSetupAssessmentFormValues;
    journeyPhase: PathwayJourneyPhase;
    phaseIndex: number;
  }): RoadmapStep[] {
    const estimatedTime = this.mapTimeBudget(input.setup.weeklyTime);
    const beginnerMode = input.setup.constraints.includes('beginner');
    const noLaptop = input.setup.constraints.includes('no_laptop');
    const lowBudget = input.setup.constraints.includes('low_budget');
    const phaseId = `phase_${input.phaseIndex + 1}`;
    const primarySkill =
      input.pathway.keySkills[input.phaseIndex] ??
      input.pathway.keySkills[0] ??
      'core pathway skill';
    const opportunity =
      input.pathway.opportunities[input.phaseIndex] ??
      input.pathway.opportunities[0] ??
      input.pathway.title;
    const proofFormat = noLaptop
      ? 'a one-page notebook summary or phone note'
      : 'a one-page case study or short digital note';

    const baseSteps = [
      {
        id: `step_${input.phaseIndex + 1}_1`,
        phaseId,
        title: this.buildFirstFallbackStepTitle(input),
        why:
          input.phaseIndex === 0
            ? 'You need a clear view of entry requirements, time commitment, cost, and local expectations before investing deeper effort.'
            : `This turns the ${input.journeyPhase.name.toLowerCase()} phase into one visible output instead of vague study.`,
        estimatedTime,
        difficulty: beginnerMode ? 'easy' : 'medium',
        prerequisites: [],
        resources: this.buildFallbackResources(lowBudget, noLaptop),
        evidenceOfCompletion:
          input.phaseIndex === 0
            ? `You have ${proofFormat} listing requirements, likely duration, cost concerns, and the next checkpoint.`
            : `You have ${proofFormat} that shows the milestone, what you produced, and what you learned.`,
        status: 'pending',
        order: 1,
      },
      {
        id: `step_${input.phaseIndex + 1}_2`,
        phaseId,
        title: `Create one proof item for ${primarySkill}`,
        why:
          input.setup.roadmapStyle === 'fast_track'
            ? 'A small visible output is the fastest way to test whether the work feels real and worth continuing.'
            : 'Skill proof makes the roadmap practical instead of just a list of intentions.',
        estimatedTime,
        difficulty: input.setup.roadmapStyle === 'deep' ? 'medium' : 'easy',
        prerequisites: [],
        resources: this.buildFallbackResources(lowBudget, noLaptop),
        evidenceOfCompletion: `You finish ${proofFormat} that explains what you tried, what you learned, and one next improvement.`,
        status: 'pending',
        order: 2,
      },
      {
        id: `step_${input.phaseIndex + 1}_3`,
        phaseId,
        title:
          input.phaseIndex === 2
            ? `Choose your next move toward ${opportunity}`
            : 'Write a continue, change, or stop decision',
        why:
          input.phaseIndex === 2
            ? 'The final phase should turn learning into a clear next action, not leave the user with unfinished notes.'
            : 'A useful roadmap should change based on real time, access, budget, and confidence instead of assuming perfect conditions.',
        estimatedTime: '1 week',
        difficulty: 'easy',
        prerequisites: [],
        resources: [],
        evidenceOfCompletion:
          input.phaseIndex === 2
            ? 'You choose one concrete next move, write why it fits, and define the first action date.'
            : 'You write one continue/change/stop decision for the next phase based on actual progress.',
        status: 'pending',
        order: 3,
      },
    ] satisfies RoadmapStep[];

    return baseSteps;
  }

  private buildFirstFallbackStepTitle(input: {
    pathway: PathwayRoadmapContext;
    journeyPhase: PathwayJourneyPhase;
    phaseIndex: number;
  }) {
    if (input.phaseIndex === 0) {
      return `Map what ${input.pathway.title} requires in your area`;
    }

    if (input.phaseIndex === 1) {
      return `Finish one ${input.journeyPhase.name.toLowerCase()} milestone`;
    }

    return `Prepare one entry move for ${input.pathway.title}`;
  }

  private buildFallbackResources(lowBudget: boolean, noLaptop: boolean) {
    const resources: RoadmapResource[] = [];

    if (lowBudget) {
      resources.push({
        title: 'Prefer free or low-cost learning resources for this step',
        type: 'other',
      });
    }

    if (noLaptop) {
      resources.push({
        title: 'Use mobile-friendly or offline-light materials where possible',
        type: 'other',
      });
    }

    return resources;
  }

  private buildFallbackSummary(
    pathway: PathwayRoadmapContext,
    setup: RoadmapSetupAssessmentFormValues
  ) {
    return `A ${setup.timeline}-window roadmap for ${pathway.title}, tailored to your ${setup.currentStage.replaceAll('_', ' ')} stage and ${this.mapTimeBudget(setup.weeklyTime).toLowerCase()} weekly pace.`;
  }

  private mapTimeBudget(
    weeklyTime: RoadmapSetupAssessmentFormValues['weeklyTime']
  ) {
    if (weeklyTime === 'low') return '2-4 hours per week';
    if (weeklyTime === 'medium') return '5-7 hours per week';
    if (weeklyTime === 'high') return '8-12 hours per week';
    return '13+ hours per week';
  }
}

export const roadmapGenerationService = new RoadmapGenerationService();
