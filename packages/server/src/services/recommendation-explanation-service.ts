import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import type {
  PathwayMatchProfile,
  RecommendationItem,
} from '@contracts/shared/types/pathway-domain-types';
import explainRecommendationPrompt from '@/src/llm/prompts/recommendation-explanation-prompt.txt';
import { createTextCompletion } from '../llm/llm-client';

export class RecommendationExplanationService {
  async enrichRecommendations(
    recommendations: RecommendationItem[],
    profile: PathwayAssessmentFormValues
  ): Promise<RecommendationItem[]> {
    // Explanations are optional enrichment, not part of core matching.
    return await Promise.all(
      recommendations.map(async (recommendation) => {
        try {
          const explanation = await createTextCompletion(
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
    recommendation: RecommendationItem,
    profile: PathwayAssessmentFormValues
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

  buildReasons(
    onboarding: PathwayAssessmentFormValues,
    profile: PathwayMatchProfile
  ) {
    const reasons: string[] = [];

    const strongestStrength = profile.strengths
      .filter((item) => onboarding.strengths.includes(item.value))
      .sort((a, b) => b.weight - a.weight)[0];

    if (strongestStrength) {
      reasons.push(
        `Matches your strength in ${strongestStrength.value.replaceAll('_', ' ')}.`
      );
    }

    const subjectMatch = profile.subjects.find(
      (item) => item.value === onboarding.subjects
    );

    if (subjectMatch) {
      reasons.push(
        `Aligns with your subject preference in ${subjectMatch.value}.`
      );
    }

    const passionMatch = profile.passions.find((item) =>
      onboarding.passions.includes(item.value)
    );

    if (passionMatch) {
      reasons.push(`Connects with your interest in ${passionMatch.value}.`);
    }

    const workStyleMatch = profile.workStyle.find(
      (item) => item.value === onboarding.workStyle
    );

    if (workStyleMatch) {
      reasons.push(
        `Fits your preferred work style: ${workStyleMatch.value.replaceAll('_', ' ')}.`
      );
    }

    const impactMatch = profile.impact.find(
      (item) => item.value === onboarding.impact
    );

    if (impactMatch) {
      reasons.push(
        `Supports the kind of impact you value: ${impactMatch.value}.`
      );
    }

    return reasons.slice(0, 4);
  }
}

export const recommendationExplanationService =
  new RecommendationExplanationService();
