import { create } from 'zustand';

import {
  saveResource,
  getSavedResources,
  removeSavedResource,
} from '@/services/saved-resource-service';

type SavedResourceItem = {
  resourceId: {
    _id: string;
  };
};

type SavedState = {
  savedIds: string[];
  userId: string;

  loadSaved: () => Promise<void>;
  toggleSave: (resourceId: string) => Promise<void>;
};

export const useSavedStore = create<SavedState>((set, get) => ({
  savedIds: [],
  userId: '123',

  loadSaved: async () => {
    try {
      const res = await getSavedResources(get().userId);

      const ids =
        res?.data?.map((item: SavedResourceItem) => item.resourceId._id) ?? [];

      set({ savedIds: ids });
    } catch (err) {
      console.error('Failed to load saved resources', err);
      set({ savedIds: [] });
    }
  },

  toggleSave: async (resourceId: string) => {
    const { savedIds, userId } = get();
    const isSaved = savedIds.includes(resourceId);

    try {
      if (isSaved) {
        await removeSavedResource({
          userId,
          resourceId,
        });

        set({
          savedIds: savedIds.filter((id) => id !== resourceId),
        });
      } else {
        await saveResource({
          userId,
          resourceId,
          resourceType: 'pathway',
        });

        set({
          savedIds: [...savedIds, resourceId],
        });
      }
    } catch (err) {
      console.error('Toggle save failed', err);
    }
  },
}));
