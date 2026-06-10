import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  saveResource,
  getSavedResources,
  removeSavedResource,
} from '@/services/saved-resource-service';

type SavedResourceItem = {
  resourceId:
    | {
        _id: string;
      }
    | string;
};

type SavedState = {
  savedIds: string[];
  userId: string;

  loadSaved: () => Promise<void>;
  toggleSave: (resourceId: string) => Promise<void>;
};

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      userId: '123',

      loadSaved: async () => {
        try {
          const res = await getSavedResources(get().userId);

          const ids = (res.data as SavedResourceItem[]).map((item) =>
            typeof item.resourceId === 'object'
              ? item.resourceId._id
              : item.resourceId
          );

          set({ savedIds: ids });
        } catch (error) {
          console.log('Failed to load saved resources:', error);
        }
      },

      toggleSave: async (resourceId: string) => {
        const { savedIds, userId } = get();

        const isSaved = savedIds.includes(resourceId);

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
            resourceType: 'pathway',
            resourceId,
          });

          set({
            savedIds: [...savedIds, resourceId],
          });
        }
      },
    }),
    {
      name: 'saved-pathways-storage',

      partialize: (state) => ({
        savedIds: state.savedIds,
      }),
    }
  )
);
