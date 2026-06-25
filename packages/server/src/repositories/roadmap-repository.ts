import type { RoadmapStepStatus } from '@contracts/shared/types/roadmap-types';
import { RoadmapModel } from '../models/roadmap-model';

export class RoadmapRepository {
  async create(data: any) {
    return RoadmapModel.create(data);
  }

  async replaceActiveForUserPathway(
    userId: string,
    pathwaySlug: string,
    data: any
  ) {
    return RoadmapModel.findOneAndUpdate(
      {
        userId,
        pathwaySlug,
        status: 'active',
      },
      {
        $set: data,
      },
      {
        upsert: true,
        returnDocument: 'after',
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  async findByUserId(userId: string) {
    return RoadmapModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  async findOneByUserId(userId: string) {
    return RoadmapModel.findOne({ userId }).sort({ createdAt: -1 }).lean();
  }

  async delete(roadmapId: string, userId: string) {
    return RoadmapModel.findOneAndDelete({ _id: roadmapId, userId });
  }

  async changeStepStatus(
    roadmapId: string,
    userId: string,
    stepId: string,
    status: RoadmapStepStatus
  ) {
    return RoadmapModel.findOneAndUpdate(
      {
        _id: roadmapId,
        userId,
        'steps.id': stepId,
      },
      {
        $set: {
          'steps.$.status': status,
        },
      },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
  }

  async changeRoadmapPhaseStatus(
    roadmapId: string,
    userId: string,
    phaseId: string,
    status: RoadmapStepStatus
  ) {
    return RoadmapModel.findOneAndUpdate(
      {
        _id: roadmapId,
        userId,
        'phases.id': phaseId,
      },
      {
        $set: {
          'phases.$.status': status,
        },
      },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );
  }
}

export const roadmapRepository = new RoadmapRepository();
