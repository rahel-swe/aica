import { Schema, model, type Document } from 'mongoose';
import type {
  AdvisorChatMessage,
  AdvisorContextSource,
} from '@contracts/shared/types/advisor-types';
import { advisorMessageRoleArray } from '@contracts/shared/schemas/advisor-schema';
import { randomUUID } from 'node:crypto';

const advisorChatMessageSubSchema = new Schema<AdvisorChatMessage>(
  {
    role: {
      type: String,
      enum: advisorMessageRoleArray,
      required: true,
    },
    id: {
      type: String,
      required: true,
      default: () => randomUUID(),
    },
    content: { type: String, required: true },
    actions: { type: [String], default: [] },
    followUps: { type: [String], default: [] },
    cautions: { type: [String], default: [] },
    contextUsed: { type: [String], default: [] },
    resources: {
      type: [
        {
          title: { type: String, required: true },
          url: { type: String, required: true },
          content: { type: String, required: true },
          source: { type: String, required: true },
          score: { type: Number },
        },
      ],
      default: [],
    },
    createdAt: { type: Date, required: true },
  },
  { _id: false }
);

export interface IAdvisorConversation extends Document {
  userId: Schema.Types.ObjectId | string;
  title: string;
  messages: AdvisorChatMessage[];
  contextSnapshot: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const advisorConversationSchema = new Schema<IAdvisorConversation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    messages: { type: [advisorChatMessageSubSchema], default: [] },
    contextSnapshot: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const AdvisorConversationModel = model<IAdvisorConversation>(
  'AdvisorConversation',
  advisorConversationSchema
);
