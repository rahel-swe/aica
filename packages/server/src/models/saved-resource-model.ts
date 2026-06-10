import { Schema, model, type Document, Types } from 'mongoose';

export interface ISavedResource extends Document {
  userId: string;
  resourceType: string;
  resourceId: Types.ObjectId;
}

const savedResourceSchema = new Schema<ISavedResource>(
  {
    userId: {
      type: String,
      required: true,
    },

    resourceType: {
      type: String,
      required: true,
    },

    resourceId: {
      type: Schema.Types.ObjectId,
      ref: 'Pathway',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SavedResourceModel = model<ISavedResource>(
  'SavedResource',
  savedResourceSchema
);
