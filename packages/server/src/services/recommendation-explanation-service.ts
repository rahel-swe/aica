/**
 * recommendation-explanation.service.ts
 *
 * LLM-generated explanation for a single recommendation.
 * Called ONLY when the user explicitly clicks "Why?" — never at scoring time.
 * Result is cached in the recommendation document after first generation.
 *
 * Cost model:
 *   - First "Why?" request: ~400 tokens (prompt + response)
 *   - Subsequent requests: 0 tokens (served from DB cache)
 *   - Scoring time: 0 tokens (reasons[] are rule-based, no LLM)
 */

import { createTextCompletion, LLM_MODEL } from '../llm/llm-client';
import { PathwayModel } from '../models/pathway-model';
import { recommendationRepository } from '../repositories/recommendation-repository';

import type { RecommendationExplanationResponse } from '@contracts/shared/schemas/recommendation-schema';
import { withRetry } from '../utils/retry-utility';

// ── Prompt template ───────────────────────────────────────────────────────────
// Lean and focused. No filler. The model's job is to connect
// the specific user profile signals to the specific pathway — not to
// write a generic career overview.

function buildExplanationPrompt(params: {
  pathwayTitle: string;
  pathwaySummary: string;
  strengths: string[];
  passions: string[];
  workStyle: string[];
  impact: string[];
  goals: string;
  collaborationStyle: string;
  learningPreference: string[];
  matchPercent: number;
  reasons: string[];
}): string {
  const {
    pathwayTitle,
    pathwaySummary,
    strengths,
    passions,
    workStyle,
    impact,
    goals,
    collaborationStyle,
    learningPreference,
    matchPercent,
    reasons,
  } = params;

  return `You are AICA's career guidance system. Write a short, honest explanation of why a specific career path was recommended to a specific user.

PATHWAY
Title: ${pathwayTitle}
Summary: ${pathwaySummary}

USER PROFILE
Strengths: ${strengths.join(', ') || 'not specified'}
Passions: ${passions.join(', ') || 'not specified'}
Work style: ${workStyle.join(', ') || 'not specified'}
Impact preference: ${impact.join(', ') || 'not specified'}
Primary goal: ${goals}
Collaboration preference: ${collaborationStyle}
Learning preference: ${learningPreference.join(', ') || 'not specified'}

MATCH
Score: ${matchPercent}%
Top signals already identified: ${reasons.join(' | ')}

INSTRUCTIONS
- Write 3–4 sentences maximum.
- Reference the user's specific traits — do not write generic career advice.
- Be honest: if the match is moderate (below 65%), acknowledge what is uncertain.
- Never use phrases like "exciting opportunity" or "rewarding career".
- End with one concrete reason why this path is worth exploring for this specific person.
- Do not repeat the top signals verbatim — add depth to them.
- Write in second person ("Your analytical strength...").

Return only the explanation text. No headers. No bullet points.`;
}

// ── Service ───────────────────────────────────────────────────────────────────

class RecommendationExplanationService {
  /**
   * Returns a cached explanation if one exists.
   * If not cached, calls the LLM, caches the result, and returns it.
   *
   * The recommendation must belong to the requesting user — the repository
   * query enforces ownership before this is called.
   */
  async getOrGenerate(
    recommendationId: string,
    userId: string
  ): Promise<RecommendationExplanationResponse> {
    // ── 1. Load recommendation (ownership verified) ────────────────────────
    const rec = await recommendationRepository.findOneByIdAndUserId(
      recommendationId,
      userId
    );

    if (!rec) throw new Error('Recommendation not found.');

    // ── 2. Return cached explanation if available ─────────────────────────
    if (rec.explanation && rec.explanationGeneratedAt)
      return {
        success: true,
        message: 'Explanation retrieved from cache.',
        data: {
          recommendationId,
          pathwaySlug: rec.pathwaySlug,
          explanation: rec.explanation,
          generatedAt: rec.explanationGeneratedAt.toISOString(),
          generatedByModel: rec.explanationModel ?? LLM_MODEL,
        },
      };

    // ── 3. Load pathway English content for prompt context ─────────────────
    const pathway = await PathwayModel.findOne(
      { slug: rec.pathwaySlug },
      { 'translations.en.title': 1, 'translations.en.summary': 1 }
    ).lean();

    const titleEn =
      pathway?.translations?.get?.('en')?.title ?? rec.pathwaySlug;
    const summaryEn = pathway?.translations?.get?.('en')?.summary ?? '';

    // ── 4. Extract profile values from snapshot ────────────────────────────
    const snapshot = rec.sourceProfileSnapshot;

    const prompt = buildExplanationPrompt({
      pathwayTitle: titleEn,
      pathwaySummary: summaryEn,
      strengths: (snapshot.strengths as string[]) ?? [],
      passions: (snapshot.passions as string[]) ?? [],
      workStyle: (snapshot.workStyle as string[]) ?? [],
      impact: (snapshot.impact as string[]) ?? [],
      goals: (snapshot.goals as string) ?? '',
      collaborationStyle: (snapshot.collaborationStyle as string) ?? '',
      learningPreference: (snapshot.learningPreference as string[]) ?? [],
      matchPercent: rec.matchPercent,
      reasons: rec.reasons,
    });

    // ── 5. Call LLM with retry ─────────────────────────────────────────────
    let explanation: string | null | undefined;

    try {
      explanation = await withRetry(
        () => createTextCompletion(prompt, { maxTokens: 300 }),
        { attempts: 3, baseDelayMs: 700 }
      );
    } catch (err) {
      throw new Error(
        `Explanation generation failed after retries: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }

    if (!explanation) throw new Error('LLM returned an empty explanation.');

    // ── 6. Cache in DB ─────────────────────────────────────────────────────
    await recommendationRepository.updateExplanation(
      recommendationId,
      explanation.trim(),
      LLM_MODEL
    );

    const generatedAt = new Date().toISOString();

    return {
      success: true,
      message: 'Explanation generated.',
      data: {
        recommendationId,
        pathwaySlug: rec.pathwaySlug,
        explanation: explanation.trim(),
        generatedAt,
        generatedByModel: LLM_MODEL,
      },
    };
  }
}

export const recommendationExplanationService =
  new RecommendationExplanationService();
