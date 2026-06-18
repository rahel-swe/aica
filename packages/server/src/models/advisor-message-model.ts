import type {
  AdvisorMode,
  AdvisorResponseMode,
  AdvisorSource,
} from '@contracts/shared/types/advisor-types';
import { Schema, model, type Document } from 'mongoose';

export interface IAdvisorMessage extends Document {
  userId: Schema.Types.ObjectId | string;
  message: string;
  mode: AdvisorMode;
  source: AdvisorSource;
  response: AdvisorResponseMode;
  createdAt: Date;
  updatedAt: Date;
}

const advisorMessageSchema = new Schema<IAdvisorMessage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    mode: {
      type: String,
      enum: [
        'explain',
        'decide',
        'guide_step',
        'reflect',
        'adjust',
        'verify',
        'general',
      ],
      required: true,
    },
    source: {
      type: String,
      enum: ['profile', 'recommendation', 'pathway', 'roadmap', 'advisor'],
      required: true,
    },
    response: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export const AdvisorMessageModel = model<IAdvisorMessage>(
  'AdvisorMessage',
  advisorMessageSchema
);
