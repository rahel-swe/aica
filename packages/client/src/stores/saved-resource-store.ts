import { create } from 'zustand';

import {
  saveResource,
  getSavedResources,
  removeSavedResource,
} from '@/services/saved-resource-service';

type SavedResource = {
  resourceId: string;
};

type SavedState = {
  savedIds: string[];
  userId: string;

  loadSaved: () => Promise<void>;
  toggleSave: (resourceId: string) => Promise<void>;
};

export const useSavedStore = create<SavedState>((set, get) => ({
  savedIds: [],
  userId: '123', // later replace with real auth user

  loadSaved: async () => {
    const res = await getSavedResources(get().userId);

    const ids = (res.data as SavedResource[]).map((item) => item.resourceId);

    set({ savedIds: ids });
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
        resourceId,
        resourceType: 'pathway',
      });

      set({
        savedIds: [...savedIds, resourceId],
      });
    }
  },
}));
