import { Schema, model, type HydratedDocument, type Types } from 'mongoose';

import { contentStatusSchema } from '@contracts/shared/schemas/content-status';

import { taxonomyNodeKindEnum } from '@contracts/shared/schemas/pathway-domain-schema';

import type {
  ContentStatus,
  TaxonomyNodeKind,
  TaxonomyNodeTranslatableFields,
} from '@contracts/shared/types/pathway-domain-types';

const contentStatusEnum = contentStatusSchema.options;

const taxonomyNodeTranslationSchema =
  new Schema<TaxonomyNodeTranslatableFields>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

export interface TaxonomyNodeDbDocument {
  slug: string;

  kind: TaxonomyNodeKind;

  parentId: Types.ObjectId | null;

  order: number;

  status: ContentStatus;

  translations: Map<string, TaxonomyNodeTranslatableFields>;

  createdAt: Date;
  updatedAt: Date;
}

export type TaxonomyNodeDocumentModel =
  HydratedDocument<TaxonomyNodeDbDocument>;

const taxonomyNodeSchema = new Schema<TaxonomyNodeDbDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    kind: {
      type: String,
      enum: taxonomyNodeKindEnum,
      required: true,
      index: true,
    },

    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'TaxonomyNode',
      default: null,
      index: true,
    },

    order: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: contentStatusEnum,
      required: true,
      default: 'draft',
      index: true,
    },

    translations: {
      type: Map,
      of: taxonomyNodeTranslationSchema,
      required: true,
      default: () => new Map<string, TaxonomyNodeTranslatableFields>(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

taxonomyNodeSchema.index({ parentId: 1, order: 1 });

taxonomyNodeSchema.index({
  kind: 1,
  status: 1,
});

taxonomyNodeSchema.index(
  {
    slug: 1,
  },
  {
    unique: true,
  }
);

export const TaxonomyNodeModel = model<TaxonomyNodeDbDocument>(
  'TaxonomyNode',
  taxonomyNodeSchema
);
