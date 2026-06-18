import mongoose, { type ClientSession } from 'mongoose';
import {
  RecommendationModel,
  type IRecommendation,
} from '../models/recommendation-model';

// ── Types ────────────────────────────────────────────────────────────────────

export type RecommendationInsertDoc = Omit<
  IRecommendation,
  'createdAt' | 'updatedAt' | 'hasExplanation'
>;

export type StaleVersionBatch = {
  userId: string;
  matchingVersion: number;
};

// ── Repository ────────────────────────────────────────────────────────────────

class RecommendationRepository {
  // ── Read ──────────────────────────────────────────────────────────────────

  /** All recommendations for a user, ordered by rank. */
  async findAllByUserId(
    userId: string,
    limit = 50
  ): Promise<IRecommendation[]> {
    return RecommendationModel.find({ userId })
      .sort({ rank: 1 })
      .limit(limit)
      .lean<IRecommendation[]>();
  }

  /** Quick existence check without loading full documents. */
  async existsByUserId(userId: string): Promise<boolean> {
    const doc = await RecommendationModel.exists({ userId });
    return doc !== null;
  }

  /**
   * Single recommendation by id — verifies ownership.
   * Used by explanation endpoint before generating/serving LLM explanation.
   */
  async findOneByIdAndUserId(
    id: string,
    userId: string
  ): Promise<IRecommendation | null> {
    return RecommendationModel.findOne({
      _id: id,
      userId,
    }).lean<IRecommendation>();
  }

  /** Find by userId + pathwaySlug — for targeted re-scoring of one pathway. */
  async findOneByUserIdAndSlug(
    userId: string,
    pathwaySlug: string
  ): Promise<IRecommendation | null> {
    return RecommendationModel.findOne({
      userId,
      pathwaySlug,
    }).lean<IRecommendation>();
  }

  /**
   * Distinct user IDs that have stale recommendations.
   * Used by rescoring service to find who needs a re-score.
   */

  async findStaleUserIds(
    currentVersion: number,
    limit = 100
  ): Promise<string[]> {
    const result = await RecommendationModel.aggregate<{ _id: string }>([
      { $match: { matchingVersion: { $lt: currentVersion } } },
      { $group: { _id: '$userId' } },
      { $limit: limit },
    ]);

    return result.map((r) => String(r._id));
  }

  /**
   * Distinct user IDs that have a recommendation for a specific pathway.
   * Used when a pathway's match profile is updated — those users need re-scoring.
   */
  async findAffectedUserIdsByPathwaySlug(
    pathwaySlug: string
  ): Promise<string[]> {
    const result = await RecommendationModel.aggregate<{ _id: string }>([
      { $match: { pathwaySlug } },
      { $group: { _id: '$userId' } },
    ]);

    return result.map((r) => String(r._id));
  }

  async getCurrentMatchingVersion(userId: string): Promise<number | null> {
    const doc = await RecommendationModel.findOne(
      { userId },
      { matchingVersion: 1 }
    ).lean<Pick<IRecommendation, 'matchingVersion'>>();

    return doc?.matchingVersion ?? null;
  }

  /**
   * Atomic bulk replace — deletes all existing recommendations for a user
   * and inserts the new batch in a single session/transaction.
   * This is the only write path for generation and re-scoring.
   * Explanation updates use updateExplanation separately.
   */
  async replaceAllForUser(
    userId: string,
    docs: RecommendationInsertDoc[],
    session?: ClientSession
  ): Promise<void> {
    await RecommendationModel.deleteMany({ userId }, { session });

    if (docs.length > 0)
      await RecommendationModel.insertMany(docs, { session });
  }

  /**
   * Cache the LLM explanation after a "Why?" request.
   * Does not touch any other field.
   */
  async updateExplanation(
    id: string,
    explanation: string,
    modelName: string
  ): Promise<void> {
    await RecommendationModel.updateOne(
      { _id: id },
      {
        $set: {
          explanation,
          explanationModel: modelName,
          explanationGeneratedAt: new Date(),
        },
      }
    );
  }
}

export const recommendationRepository = new RecommendationRepository();
