import type {
  PathwayDurationProfile,
  PathwayJourneyPhase,
  RecommendationResult,
} from '@contracts/shared/types/pathway-domain-types';
import { llmClient } from '../llm/llm-client';
import roadmapGuidancePrompt from '@/src/llm/prompts/roadmap-guidance-prompt.txt';

type RoadmapPromptInput = {
  pathwayTitle: string;
  pathwaySummary: string;
  keySkills: string[];
  opportunities: string[];
  durationProfile: PathwayDurationProfile;
  journeyPhases: PathwayJourneyPhase[];
  verificationNote?: string;
  recommendation?: RecommendationResult;
};

export class RoadmapGuidanceService {
  private readonly llmClient = llmClient;

  async buildGuidanceNote(
    input: RoadmapPromptInput
  ): Promise<string | undefined> {
    if (!process.env.HF_TOKEN) {
      return undefined;
    }

    try {
      const prompt = this.renderPrompt(roadmapGuidancePrompt, input);
      const response = await this.llmClient.createTextCompletion(prompt);
      return response.trim() || undefined;
    } catch {
      return undefined;
    }
  }

  private renderPrompt(template: string, input: RoadmapPromptInput): string {
    return template
      .replace('{{pathway_title}}', input.pathwayTitle)
      .replace('{{pathway_summary}}', input.pathwaySummary)
      .replace(
        '{{recommendation_reasons}}',
        input.recommendation?.reasons.join(' ') || 'none'
      )
      .replace(
        '{{recommendation_explanation}}',
        input.recommendation?.explanation || 'none'
      )
      .replace('{{key_skills}}', input.keySkills.join(', ') || 'none')
      .replace('{{opportunities}}', input.opportunities.join(', ') || 'none')
      .replace(
        '{{timeline_type}}',
        input.durationProfile.timelineType || 'unknown'
      )
      .replace(
        '{{roadmap_window_label}}',
        input.durationProfile.roadmapWindowLabel || 'Next 12 months'
      )
      .replace(
        '{{journey_phases}}',
        input.journeyPhases
          .map((phase) => `${phase.name} (${phase.duration}): ${phase.focus}`)
          .join(' | ') || 'none'
      )
      .replace('{{verification_note}}', input.verificationNote || 'none');
  }
}

export const roadmapGuidanceService = new RoadmapGuidanceService();
