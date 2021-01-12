import {Module, MutationTree} from 'vuex';

declare global {
  interface SpiderStoreModule extends Module<SpiderStoreState, RootStoreState> {
    // getters: SpiderStoreGetters;
    mutations: SpiderStoreMutations;
  }


  interface SpiderStoreState {
    sidebarCollapsed: boolean;
    actionsCollapsed: boolean;
    tabName: SpiderTabName;
    tabs: NavItem[];
  }

  // interface SpiderStoreGetters extends GetterTree<SpiderStoreState, RootStoreState> {
  // }

  interface SpiderStoreMutations extends MutationTree<SpiderStoreState> {
    setSidebarCollapsed: StoreMutation<SpiderStoreState, boolean>;
    setActionsCollapsed: StoreMutation<SpiderStoreState, boolean>;
    setTabName: StoreMutation<SpiderStoreState, SpiderTabName>;
    resetTabName: StoreMutation<SpiderStoreState>;
  }
}
