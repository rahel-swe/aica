import { Schema, model, type Document } from 'mongoose';

export interface IRoadmapResource {
  title: string;
  url?: string;
  type?: 'course' | 'video' | 'article' | 'project' | 'tool' | 'other';
}

export interface IRoadmapStep {
  id: string;
  title: string;
  why: string;
  estimatedTime?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  prerequisites?: string[];
  resources?: IRoadmapResource[];
  evidenceOfCompletion?: string;
  status: 'pending' | 'in_progress' | 'completed';
  order: number;
  phaseId: string;
}

export interface IRoadmapPhase {
  id: string;
  phase: string; // flexible (e.g. foundation, practice, transition)
  title: string;
  objective: string;
  order: number;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface IRoadmap extends Document {
  userId: Schema.Types.ObjectId | string;
  pathwayId: Schema.Types.ObjectId;

  version: number;
  status: 'draft' | 'active' | 'archived';

  title: string;
  summary: string;

  currentLevel?: string;
  timeBudgetPerWeek?: string;
  roadmapStyle?: 'fast_track' | 'balanced' | 'deep';

  phases: IRoadmapPhase[];
  steps: IRoadmapStep[];

  lastGeneratedAt?: Date;
  nextReviewAt?: Date;

  sourceRecommendation?: {
    pathwayId: string;
    explanation?: string;
    totalScore: number;
  };
}

const resourceSchema = new Schema<IRoadmapResource>(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, trim: true },
    type: {
      type: String,
      enum: ['course', 'video', 'article', 'project', 'tool', 'other'],
      default: 'other',
    },
  },
  { _id: false }
);

const stepSchema = new Schema<IRoadmapStep>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    why: { type: String, required: true, trim: true },
    estimatedTime: { type: String, trim: true },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    prerequisites: { type: [String], default: [] },
    resources: { type: [resourceSchema], default: [] },
    evidenceOfCompletion: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    order: { type: Number, required: true },
    phaseId: {
      type: String,
      required: true,
      index: true,
    },
  },
  { _id: false }
);

const phaseSchema = new Schema<IRoadmapPhase>(
  {
    id: { type: String, required: true },
    phase: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    objective: { type: String, required: true, trim: true },
    order: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
  },
  { _id: false }
);

const roadmapSchema = new Schema<IRoadmap>(
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
      index: true,
    },

    version: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'archived'],
      default: 'draft',
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },

    currentLevel: {
      type: String,
    },
    timeBudgetPerWeek: {
      type: String,
    },
    roadmapStyle: {
      type: String,
      enum: ['fast_track', 'balanced', 'deep'],
      default: 'balanced',
    },

    phases: {
      type: [phaseSchema],
      default: [],
    },

    steps: {
      type: [stepSchema],
      default: [],
    },

    lastGeneratedAt: {
      type: Date,
    },
    nextReviewAt: {
      type: Date,
    },

    sourceRecommendation: {
      type: {
        pathwayId: String,
        explanation: String,
        totalScore: Number,
      },
      required: false,
    },
  },
  { timestamps: true }
);

roadmapSchema.index({ userId: 1, createdAt: -1 });
roadmapSchema.index({ userId: 1, pathwayId: 1, status: 1 });

export const RoadmapModel = model<IRoadmap>('Roadmap', roadmapSchema);
