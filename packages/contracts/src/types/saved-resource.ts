import type { PathwayListItem } from '@contracts/shared/types/pathway-domain-types';

export type SavedResourceItem = {
  _id: string;
  userId: string;
  resourceType: string;
  resourceId: PathwayListItem;
};
