import { Schema, model, type Document } from 'mongoose';
import { pathwayVisibilityLayerEnum } from '@contracts/shared/schemas/pathway-domain-schema';

type RecommendationDimensionScores = {
  strengths: number;
  subjects: number;
  passions: number;
  freeTime: number;
  workEnvironment: number;
  workStyle: number;
  impact: number;
  goals: number;
};

export interface IRecommendation extends Document {
  userId: Schema.Types.ObjectId | string;
  pathwayId: Schema.Types.ObjectId;
  title: string;
  slug: string;
  type: 'study' | 'career' | 'hybrid';
  summary: string;
  totalScore: number;
  matchPercent?: number;
  visibilityLayer?: (typeof pathwayVisibilityLayerEnum)[number];
  direction?: {
    slug: string;
    title: string;
  };
  family?: {
    slug: string;
    title: string;
  };
  dimensionScores: RecommendationDimensionScores;
  reasons: string[];
  explanation?: string;
  rank: number;
  matchingVersion: number;
  sourceProfileSnapshot: Record<string, unknown>;
}

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
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ['study', 'career', 'hybrid'],
      required: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    totalScore: {
      type: Number,
      required: true,
    },
    matchPercent: {
      type: Number,
    },
    visibilityLayer: {
      type: String,
      enum: pathwayVisibilityLayerEnum,
    },
    direction: {
      slug: { type: String, trim: true, lowercase: true },
      title: { type: String, trim: true },
    },
    family: {
      slug: { type: String, trim: true, lowercase: true },
      title: { type: String, trim: true },
    },
    dimensionScores: {
      strengths: { type: Number, required: true },
      subjects: { type: Number, required: true },
      passions: { type: Number, required: true },
      freeTime: { type: Number, required: true },
      workEnvironment: { type: Number, required: true },
      workStyle: { type: Number, required: true },
      impact: { type: Number, required: true },
      goals: { type: Number, required: true },
    },
    reasons: {
      type: [String],
      default: [],
    },
    explanation: {
      type: String,
      trim: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    matchingVersion: {
      type: Number,
      required: true,
      default: 1,
    },
    sourceProfileSnapshot: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

recommendationSchema.index({ userId: 1, rank: 1 });

export const RecommendationModel = model<IRecommendation>(
  'Recommendation',
  recommendationSchema
);
