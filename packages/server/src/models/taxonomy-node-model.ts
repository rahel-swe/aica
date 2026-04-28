import {
  taxonomyNodeKindEnum,
  taxonomyNodeStatusEnum,
} from '@contracts/shared/schemas/pathway-domain-schema';
import { Schema, model, type Document } from 'mongoose';

export interface ITaxonomyNode extends Document {
  name: string;
  slug: string;
  kind: (typeof taxonomyNodeKindEnum)[number];
  parentId: Schema.Types.ObjectId | null;
  description?: string;
  order: number;
  status: (typeof taxonomyNodeStatusEnum)[number];
}

const taxonomyNodeSchema = new Schema<ITaxonomyNode>(
  {
    name: {
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

    kind: {
      type: String,
      enum: taxonomyNodeKindEnum,
      required: true,
    },

    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'TaxonomyNode',
      default: null,
    },

    description: {
      type: String,
      trim: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: taxonomyNodeStatusEnum,
      default: 'draft',
    },
  },
  { timestamps: true }
);

taxonomyNodeSchema.index({ parentId: 1, order: 1 });

export const TaxonomyNodeModel = model<ITaxonomyNode>(
  'TaxonomyNode',
  taxonomyNodeSchema
);
