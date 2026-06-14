import type { RecommendationDimensionScores } from '@contracts/shared/types/pathway-domain-types';
import { Schema, model, type HydratedDocument, type Types } from 'mongoose';

export interface IRecommendation {
  userId: Types.ObjectId;
  pathwayId: Types.ObjectId;

  pathwaySlug: string;
  directionSlug?: string;
  familySlug?: string;

  totalScore: number;
  matchPercent: number;
  dimensionScores: RecommendationDimensionScores;
  rank: number;

  matchingVersion: number;
  profileVersion: number;
  profileVersionId: Types.ObjectId;

  reasons: string[];

  explanation?: string;
  explanationGeneratedAt?: Date;
  explanationModel?: string;

  sourceProfileSnapshot: Record<string, unknown>;

  createdAt: Date;
  updatedAt: Date;

  // virtual
  hasExplanation?: boolean;
}

export type RecommendationDocument = HydratedDocument<IRecommendation>;

const dimensionScoresSchema = new Schema<RecommendationDimensionScores>(
  {
    strengths: { type: Number, required: true, min: -0.2, max: 1 },
    passions: { type: Number, required: true, min: -0.2, max: 1 },
    subjects: { type: Number, required: true, min: -0.2, max: 1 },
    learningPreference: { type: Number, required: true, min: -0.2, max: 1 },
    workEnvironment: { type: Number, required: true, min: -0.2, max: 1 },
    workStyle: { type: Number, required: true, min: -0.2, max: 1 },
    collaborationStyle: { type: Number, required: true, min: -0.2, max: 1 },
    impact: { type: Number, required: true, min: -0.2, max: 1 },
    goals: { type: Number, required: true, min: -0.2, max: 1 },
  },
  { _id: false }
);

const recommendationSchema = new Schema<IRecommendation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    pathwayId: {
      type: Schema.Types.ObjectId,
      ref: 'Pathway',
      required: true,
    },

    pathwaySlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    directionSlug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    familySlug: {
      type: String,
      trim: true,
      lowercase: true,
    },

    totalScore: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    matchPercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    dimensionScores: {
      type: dimensionScoresSchema,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
      min: 1,
    },

    matchingVersion: {
      type: Number,
      required: true,
      default: 1,
    },
    profileVersion: {
      type: Number,
      required: true,
      default: 1,
    },
    profileVersionId: {
      type: Schema.Types.ObjectId,
      ref: 'PathwayAssessment',
      required: true,
      index: true,
    },

    reasons: {
      type: [String],
      default: [],
    },

    explanation: {
      type: String,
      trim: true,
    },
    explanationGeneratedAt: {
      type: Date,
    },
    explanationModel: {
      type: String,
      trim: true,
    },

    sourceProfileSnapshot: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

recommendationSchema.virtual('hasExplanation').get(function (
  this: IRecommendation
) {
  return Boolean(this.explanation && this.explanation.trim().length > 0);
});

recommendationSchema.index({ userId: 1, rank: 1 });
recommendationSchema.index({ pathwaySlug: 1 });
recommendationSchema.index({ matchingVersion: 1 });
recommendationSchema.index({ userId: 1, pathwaySlug: 1 }, { unique: true });

export const RecommendationModel = model<IRecommendation>(
  'Recommendation',
  recommendationSchema
);
