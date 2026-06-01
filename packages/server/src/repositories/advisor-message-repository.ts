import type {
  AdvisorMode,
  AdvisorResponse,
  AdvisorSource,
} from '@contracts/shared/types/advisor-types';
import { AdvisorMessageModel } from '../models/advisor-message-model';

export class AdvisorMessageRepository {
  async create(data: {
    userId: string;
    message: string;
    mode: AdvisorMode;
    source: AdvisorSource;
    response: AdvisorResponse;
  }) {
    return AdvisorMessageModel.create(data);
  }

  async findRecentByUserId(userId: string, limit = 12) {
    return AdvisorMessageModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }
}

export const advisorMessageRepository = new AdvisorMessageRepository();
