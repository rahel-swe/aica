import type z from 'zod';
import {
  roadmapResourceTypeSchema,
  roadmapStatusSchema,
  roadmapStepDifficultySchema,
  roadmapStepStatusSchema,
} from '../schemas/roadmap-schema';
import { roadmapSetupStyle } from '../schemas/roadmap-setup-assessment-schema';

export type RoadmapStatus = z.infer<typeof roadmapStatusSchema>;
export type RoadmapStepStatus = z.infer<typeof roadmapStepStatusSchema>;
export type RoadmapStepDifficulty = z.infer<typeof roadmapStepDifficultySchema>;
export type RoadmapResourceType = z.infer<typeof roadmapResourceTypeSchema>;
export type RoadmapStyle = z.infer<typeof roadmapSetupStyle>;

export type RoadmapResource = {
  title: string;
  url?: string;
  type: RoadmapResourceType;
};

export type RoadmapStep = {
  id: string;
  title: string;
  why: string;
  estimatedTime?: string;
  difficulty: RoadmapStepDifficulty;
  prerequisites: string[];
  resources: {
    title: string;
    url?: string;
    type: RoadmapResourceType;
  }[];
  evidenceOfCompletion?: string;
  status: RoadmapStepStatus;
  order: number;
  phaseId: string;
};

export type RoadmapPhase = {
  id: string;
  phase: string;
  title: string;
  objective: string;
  order: number;
  status: RoadmapStepStatus;
};

export type RoadmapGenerateRequest = {
  pathwayId: string;
};

export type RoadmapSourceRecommendation = {
  pathwayId: string;
  explanation?: string;
  totalScore: number;
};

export type PathwayRoadmap = {
  _id: string;
  pathwayId: string;
  version: number;
  status: RoadmapStatus;
  title: string;
  summary: string;
  currentLevel?: string;
  timeBudgetPerWeek?: string;
  roadmapStyle?: RoadmapStyle;
  phases: RoadmapPhase[];
  steps: RoadmapStep[];
  lastGeneratedAt?: string;
  nextReviewAt?: string;
  sourceRecommendation?: RoadmapSourceRecommendation;
  createdAt: string;
  updatedAt: string;
};

export type RoadmapGenerateResponse = {
  success: boolean;
  message: string;
  data: PathwayRoadmap;
};

export type RoadmapResponse = {
  success: boolean;
  message: string;
  data: PathwayRoadmap;
};
