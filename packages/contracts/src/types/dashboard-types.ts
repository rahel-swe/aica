import type z from 'zod';
import {
  dashboardApiResponseSchema,
  dashboardNextActionTypeSchema,
  dashboardResponseSchema,
  dashboardStatusSchema,
} from '../schemas/dashboard-schema';

export type DashboardStatus = z.infer<typeof dashboardStatusSchema>;

export type DashboardNextActionType = z.infer<
  typeof dashboardNextActionTypeSchema
>;

export type DashboardResponse = z.infer<typeof dashboardResponseSchema>;

export type DashboardApiResponse = z.infer<typeof dashboardApiResponseSchema>;
