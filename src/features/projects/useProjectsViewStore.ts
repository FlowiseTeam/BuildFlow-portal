import { create } from 'zustand';

interface ProjectsViewState {
  view: 'list' | 'grid';
  toggleView: () => void;
}

/***
 * Micro store that allows to persist the view type while switching tabs
 */
export const useProjectsViewStore = create<ProjectsViewState>((set, get) => ({
  view: 'list',
  toggleView: () => set({ view: get().view === 'list' ? 'grid' : 'list' }),
}));
