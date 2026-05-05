import {
  roadmapSetupConstraintEnum,
  roadmapSetupCurrentStageEnum,
  roadmapSetupStyleEnum,
  roadmapSetupTimelineEnum,
  roadmapSetupWeeklyTimeEnum,
} from '@contracts/shared/schemas/roadmap-setup-assessment-schema';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const roadmapSetupAssessmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    pickedPathwayId: {
      type: Schema.Types.ObjectId,
      ref: 'Pathway',
      required: true,
    },

    currentStage: {
      type: String,
      enum: roadmapSetupCurrentStageEnum,
      default: 'high_school',
    },

    weeklyTime: {
      type: String,
      enum: roadmapSetupWeeklyTimeEnum,
      default: 'medium',
    },

    timeline: {
      type: String,
      enum: roadmapSetupTimelineEnum,
      default: 'medium',
    },

    constraints: {
      type: [String],
      enum: roadmapSetupConstraintEnum,
      default: [],
    },

    roadmapStyle: {
      type: String,
      enum: roadmapSetupStyleEnum,
      default: 'balanced',
    },

    completed: {
      type: Boolean,
      default: false,
    },

    stepsCompleted: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const RoadmapSetupAssessmentModel = model(
  'RoadmapSetupAssessment',
  roadmapSetupAssessmentSchema
);
