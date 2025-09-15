import { create } from 'zustand';

interface SearchState {
  query: string;
  showResults: boolean;
  setQuery: (query: string) => void;
  setShowResults: (show: boolean) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  showResults: false,
  setQuery: (query) => set({ query }),
  setShowResults: (show) => set({ showResults: show }),
  reset: () => set({ query: '', showResults: false }),
}));