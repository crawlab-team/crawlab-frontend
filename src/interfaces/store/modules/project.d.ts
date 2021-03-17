import {Module, MutationTree} from 'vuex';

declare global {
  interface ProjectStoreModule extends Module<ProjectStoreState, RootStoreState> {
    // getters: ProjectStoreGetters;
    mutations: ProjectStoreMutations;
  }

  interface ProjectStoreState {
    allProjectSelectOptions: SelectOption[];
    allProjectTags: string[];
  }

  // interface ProjectStoreGetters extends GetterTree<ProjectStoreState, RootStoreState> {
  // }

  interface ProjectStoreMutations extends MutationTree<ProjectStoreState> {
    setAllProjectSelectOptions: StoreMutation<ProjectStoreState, SelectOption[]>;
    setAllProjectTags: StoreMutation<ProjectStoreState, string[]>;
  }
}
