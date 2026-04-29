import type { OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import type { RecommendationResult } from '@contracts/shared/types/pathway-domain-types';
import { llmClient } from '../llm/llm-client';

export class RecommendationExplanationService {
  async enrichRecommendations(
    recommendations: RecommendationResult[],
    profile: OnboardingFormValues
  ): Promise<RecommendationResult[]> {
    if (!process.env.HF_TOKEN) {
      return recommendations;
    }

    // Explanations are optional enrichment, not part of core matching.
    return await Promise.all(
      recommendations.map(async (recommendation) => {
        try {
          const explanation = await llmClient.createTextCompletion(
            this.buildPrompt(recommendation, profile)
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

  private buildPrompt(
    recommendation: RecommendationResult,
    profile: OnboardingFormValues
  ) {
    return [
      'You are writing a short AICA pathway explanation.',
      'Write 2 to 3 sentences only.',
      'Be practical, clear, and grounded in the provided data.',
      `Pathway title: ${recommendation.title}`,
      `Pathway summary: ${recommendation.summary}`,
      `System reasons: ${recommendation.reasons.join(' ')}`,
      `User strengths: ${profile.strengths.join(', ') || 'none'}`,
      `User subject: ${profile.subjects}`,
      `User passions: ${profile.passions.join(', ') || 'none'}`,
      `User work style: ${profile.workStyle}`,
      `User impact: ${profile.impact}`,
      `User goals: ${profile.goals}`,
      'Explain why this pathway is a good fit.',
    ].join('\n');
  }
}
