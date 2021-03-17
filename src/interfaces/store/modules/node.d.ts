import {Module, MutationTree} from 'vuex';

declare global {
  interface NodeStoreModule extends Module<NodeStoreState, RootStoreState> {
    // getters: NodeStoreGetters;
    mutations: NodeStoreMutations;
  }

  interface NodeStoreState {
    allNodeSelectOptions: SelectOption[];
    allNodeTags: string[];
  }

  // interface NodeStoreGetters extends GetterTree<NodeStoreState, RootStoreState> {
  // }

  interface NodeStoreMutations extends MutationTree<NodeStoreState> {
    setAllNodeSelectOptions: StoreMutation<NodeStoreState, SelectOption[]>;
    setAllNodeTags: StoreMutation<NodeStoreState, string[]>;
  }
}
