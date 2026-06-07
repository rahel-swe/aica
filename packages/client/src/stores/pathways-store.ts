import { create } from 'zustand';

interface PathwaysStore {
  search: string;
  category: string;
  type: string;
  difficulty: string;

  setSearch: (v: string) => void;
  setCategory: (v: string) => void;
  setType: (v: string) => void;
  setDifficulty: (v: string) => void;
}

export const usePathwaysStore = create<PathwaysStore>((set) => ({
  search: '',
  category: '',
  type: '',
  difficulty: '',

  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setType: (type) => set({ type }),
  setDifficulty: (difficulty) => set({ difficulty }),
}));
