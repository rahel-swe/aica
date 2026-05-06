import {
  degreeRequirementEnum,
  pathwayCommitmentLevelEnum,
  pathwayStatusEnum,
  pathwayTimelineTypeEnum,
  pathwayTypeEnum,
} from '@contracts/shared/schemas/pathway-domain-schema';
import { Schema, model, type Document } from 'mongoose';

export interface IPathway extends Document {
  title: string;
  slug: string;
  type: (typeof pathwayTypeEnum)[number];
  taxonomyNodeIds: Schema.Types.ObjectId[] | string[];
  summary: string;
  description: string;
  keySkills: string[];
  opportunities: string[];
  durationProfile: {
    commitmentLevel: (typeof pathwayCommitmentLevelEnum)[number];
    timelineType: (typeof pathwayTimelineTypeEnum)[number];
    degreeRequirement: (typeof degreeRequirementEnum)[number];
    estimatedMonthsMin?: number;
    estimatedMonthsMax?: number;
    estimatedYearsMin?: number;
    estimatedYearsMax?: number;
    requiresLicense: boolean;
    localRulesRequired: boolean;
    roadmapWindowLabel: string;
  };
  journeyPhases: Array<{
    name: string;
    duration: string;
    focus: string;
  }>;
  verificationNote?: string;
  relatedPathwayIds: Schema.Types.ObjectId[] | string[];
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

    opportunities: {
      type: [String],
      default: [],
    },

    durationProfile: {
      commitmentLevel: {
        type: String,
        enum: pathwayCommitmentLevelEnum,
        required: true,
      },
      timelineType: {
        type: String,
        enum: pathwayTimelineTypeEnum,
        required: true,
      },
      degreeRequirement: {
        type: String,
        enum: degreeRequirementEnum,
        required: true,
      },
      estimatedMonthsMin: Number,
      estimatedMonthsMax: Number,
      estimatedYearsMin: Number,
      estimatedYearsMax: Number,
      requiresLicense: {
        type: Boolean,
        default: false,
      },
      localRulesRequired: {
        type: Boolean,
        default: false,
      },
      roadmapWindowLabel: {
        type: String,
        required: true,
        trim: true,
      },
    },

    journeyPhases: {
      type: [
        new Schema(
          {
            name: {
              type: String,
              required: true,
              trim: true,
            },
            duration: {
              type: String,
              required: true,
              trim: true,
            },
            focus: {
              type: String,
              required: true,
              trim: true,
            },
          },
          { _id: false }
        ),
      ],
      default: [],
    },

    verificationNote: {
      type: String,
      trim: true,
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
