import {
  pathwayStatusEnum,
  pathwayTypeEnum,
} from '@contracts/shared/schemas/pathway-domain-schema';
import { Schema, model, type Document } from 'mongoose';

export interface IPathway extends Document {
  title: string;
  slug: string;
  type: (typeof pathwayTypeEnum)[number];
  taxonomyNodeIds: Schema.Types.ObjectId[];
  summary: string;
  description: string;
  keySkills: string[];
  learningRoute: string[];
  opportunities: string[];
  relatedPathwayIds: Schema.Types.ObjectId[];
  status: (typeof pathwayStatusEnum)[number];
}

const pathwaySchema = new Schema<IPathway>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      enum: pathwayTypeEnum,
      required: true,
    },

    taxonomyNodeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TaxonomyNode',
        required: true,
      },
    ],

    summary: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    keySkills: {
      type: [String],
      default: [],
    },

    learningRoute: {
      type: [String],
      default: [],
    },

    opportunities: {
      type: [String],
      default: [],
    },

    relatedPathwayIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pathway',
      },
    ],

    status: {
      type: String,
      enum: pathwayStatusEnum,
      default: 'draft',
    },
  },
  { timestamps: true }
);

pathwaySchema.index({ taxonomyNodeIds: 1, status: 1 });

export const PathwayModel = model<IPathway>('Pathway', pathwaySchema);
