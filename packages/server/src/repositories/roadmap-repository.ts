import type { RoadmapStepStatus } from '@contracts/shared/types/roadmap-types';
import { RoadmapModel } from '../models/roadmap-model';

export class RoadmapRepository {
  async create(data: any) {
    return await RoadmapModel.create(data);
  }

  async replaceActiveForUserPathway(
    userId: string,
    pathwayId: string,
    data: any
  ) {
    return await RoadmapModel.findOneAndUpdate(
      {
        userId,
        pathwayId,
        status: 'active',
      },
      {
        $set: data,
      },
      {
        upsert: true,
        returnDocument: 'after',
        setDefaultsOnInsert: true,
      }
    );
  }

  async findByUserId(userId: string) {
    return await RoadmapModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  async findOneByUserId(userId: string) {
    return await RoadmapModel.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async delete(roadmapId: string, userId: string) {
    return await RoadmapModel.findOneAndDelete({ _id: roadmapId, userId });
  }

  async changeStepStatus(
    roadmapId: string,
    userId: string,
    stepId: string,
    status: RoadmapStepStatus
  ) {
    return await RoadmapModel.findOneAndUpdate(
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
      }
    );
  }

  async changeRoadmapPhaseStatus(
    roadmapId: string,
    userId: string,
    phaseId: string,
    status: RoadmapStepStatus
  ) {
    return await RoadmapModel.findOneAndUpdate(
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
      }
    );
  }
}

export const roadmapRepository = new RoadmapRepository();
