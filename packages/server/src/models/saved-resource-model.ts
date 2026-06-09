import { Schema, model, type Document } from 'mongoose';

export interface ISavedResource extends Document {
  userId: string;
  resourceType: string;
  resourceId: string;
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
      type: String,
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
