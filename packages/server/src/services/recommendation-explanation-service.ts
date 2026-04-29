import type { OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';
import { llmClient } from '../llm/llm-client';
import explainRecommendationPrompt from '@/src/llm/prompts/recommendation-explanation-prompt.txt';

export class RecommendationExplanationService {
  private readonly llmClient = llmClient;

  async enrichRecommendations(
    recommendations: RecommendationResult[],
    profile: OnboardingFormValues
  ): Promise<RecommendationResult[]> {
    if (!Bun.env.HF_TOKEN) return recommendations;

    // Explanations are optional enrichment, not part of core matching.
    return await Promise.all(
      recommendations.map(async (recommendation) => {
        try {
          const explanation = await this.llmClient.createTextCompletion(
            this.renderPrompt(
              explainRecommendationPrompt,
              recommendation,
              profile
            )
          );

          return {
            ...recommendation,
            explanation: explanation.trim() || undefined,
          };
        } catch {
          return recommendation;
        }
      })
    );
  }

  private renderPrompt(
    template: string,
    recommendation: RecommendationResult,
    profile: OnboardingFormValues
  ): string {
    return template
      .replace('{{pathway_title}}', recommendation.title)
      .replace('{{pathway_summary}}', recommendation.summary)
      .replace('{{system_reasons}}', recommendation.reasons.join(' '))
      .replace('{{user_strengths}}', profile.strengths.join(', ') || 'none')
      .replace('{{user_subject}}', profile.subjects)
      .replace('{{user_passions}}', profile.passions.join(', ') || 'none')
      .replace('{{user_work_style}}', profile.workStyle)
      .replace('{{user_impact}}', profile.impact)
      .replace('{{user_goals}}', profile.goals);
  }
}
