import { create } from 'zustand';
import type { AdvisorHistoryItem } from '@contracts/shared/types/advisor-types';

interface AdvisorHistoryStore {
  selectedHistory: AdvisorHistoryItem | null;
  setSelectedHistory: (history: AdvisorHistoryItem | null) => void;
  clearSelectedHistory: () => void;
}

export const useAdvisorHistoryStore = create<AdvisorHistoryStore>((set) => ({
  selectedHistory: null,

  setSelectedHistory: (history) => set({ selectedHistory: history }),

  clearSelectedHistory: () => set({ selectedHistory: null }),
}));
