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
  goal?: string;
  aiSummary?: string;
  guidanceNote?: string;
  phases: RoadmapPhase[];
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
        goal?: string;
        aiSummary?: string;
        guidanceNote?: string;
        phases?: Array<{
          id?: string;
          phase?: string;
          title?: string;
          objective?: string;
          order?: number;
          steps?: Array<{
            id?: string;
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
        }>;
      };

      if (
        !parsed.title ||
        !parsed.summary ||
        !parsed.phases?.length ||
        parsed.phases.length !== 3
      ) {
        return null;
      }

      const phases = parsed.phases
        .map((phase, phaseIndex) => {
          if (
            !phase.id ||
            !phase.phase ||
            !phase.title ||
            !phase.objective ||
            !phase.steps?.length
          ) {
            return null;
          }

          const steps = phase.steps
            .map((step, stepIndex) => {
              if (!step.id || !step.title || !step.why) {
                return null;
              }

              return {
                id: step.id,
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

          if (!steps.length) {
            return null;
          }

          return {
            id: phase.id,
            phase: phase.phase,
            title: phase.title,
            objective: phase.objective,
            order: phase.order ?? phaseIndex + 1,
            steps,
          } satisfies RoadmapPhase;
        })
        .filter((phase): phase is RoadmapPhase => phase !== null);

      if (phases.length !== 3) {
        return null;
      }

      return {
        title: parsed.title,
        summary: parsed.summary,
        goal: parsed.goal,
        aiSummary: parsed.aiSummary,
        guidanceNote: parsed.guidanceNote,
        phases,
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

    const phases = journeyPhases.map((journeyPhase, index) => {
      const steps = this.buildFallbackSteps({
        pathway: input.pathway,
        setup: input.setup,
        journeyPhase,
        phaseIndex: index,
      });

      return {
        id: `phase_${index + 1}`,
        phase: phaseNames[index] ?? `phase_${index + 1}`,
        title: journeyPhase.name,
        objective: journeyPhase.focus,
        order: index + 1,
        steps,
      } satisfies RoadmapPhase;
    });

    return {
      title:
        input.pathway.durationProfile.commitmentLevel === 'long'
          ? `${input.pathway.title} next action plan`
          : `${input.pathway.title} roadmap`,
      summary: this.buildFallbackSummary(input.pathway, input.setup),
      goal: this.buildGoal(input.pathway, input.setup),
      aiSummary: `This roadmap is tailored to your current stage, weekly capacity, and preferred pace for progressing toward ${input.pathway.title}.`,
      guidanceNote: input.pathway.verificationNote,
      phases,
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

    const baseSteps = [
      {
        id: `step_${input.phaseIndex + 1}_1`,
        title:
          input.phaseIndex === 0
            ? `Clarify what ${input.pathway.title} really requires`
            : `Advance the ${input.journeyPhase.name.toLowerCase()} phase`,
        why: input.journeyPhase.focus,
        estimatedTime,
        difficulty: beginnerMode ? 'easy' : 'medium',
        prerequisites: [],
        resources: this.buildFallbackResources(lowBudget, noLaptop),
        evidenceOfCompletion:
          input.phaseIndex === 0
            ? 'You can explain the pathway requirements, commitment level, and next realistic checkpoint.'
            : 'You complete one concrete milestone related to this phase.',
        status: 'pending',
        order: 1,
      },
      {
        id: `step_${input.phaseIndex + 1}_2`,
        title: `Build progress in ${input.pathway.keySkills[input.phaseIndex] ?? input.pathway.keySkills[0] ?? 'core pathway skills'}`,
        why:
          input.setup.roadmapStyle === 'fast_track'
            ? 'This keeps the roadmap practical and momentum-driven.'
            : 'This creates usable skill proof before the next stage.',
        estimatedTime,
        difficulty: input.setup.roadmapStyle === 'deep' ? 'medium' : 'easy',
        prerequisites: [],
        resources: this.buildFallbackResources(lowBudget, noLaptop),
        evidenceOfCompletion:
          'You finish one visible output, reflection, or proof-of-work item.',
        status: 'pending',
        order: 2,
      },
      {
        id: `step_${input.phaseIndex + 1}_3`,
        title:
          input.phaseIndex === 2
            ? 'Review fit and choose the next serious move'
            : 'Check constraints and adjust the plan early',
        why: 'A realistic roadmap should adapt to your time, access, and current stage instead of assuming perfect conditions.',
        estimatedTime: '1 week',
        difficulty: 'easy',
        prerequisites: [],
        resources: [],
        evidenceOfCompletion:
          'You update the next step based on real progress, not just intention.',
        status: 'pending',
        order: 3,
      },
    ] satisfies RoadmapStep[];

    return baseSteps;
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

  private buildGoal(
    pathway: PathwayRoadmapContext,
    setup: RoadmapSetupAssessmentFormValues
  ) {
    if (pathway.durationProfile.commitmentLevel === 'long') {
      return `Use the next ${setup.timeline} planning window to prepare for entry into ${pathway.title}.`;
    }

    return `Use the next ${setup.timeline} planning window to move closer to realistic entry into ${pathway.title}.`;
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
