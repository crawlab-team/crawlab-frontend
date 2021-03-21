import {GetterTree, Module, MutationTree} from 'vuex';

declare global {
  interface SpiderStoreModule extends Module<SpiderStoreState, RootStoreState> {
    getters: SpiderStoreGetters;
    mutations: SpiderStoreMutations;
  }

  interface SpiderStoreState {
    sidebarCollapsed: boolean;
    actionsCollapsed: boolean;
    tabs: NavItem[];
    dialogVisible: SpiderDialogVisible;
    spiderForm?: Spider;
  }

  interface SpiderStoreGetters extends GetterTree<SpiderStoreState, RootStoreState> {
    tabName: StoreGetter<SpiderStoreState, SpiderTabName>;
  }

  interface SpiderStoreMutations extends MutationTree<SpiderStoreState> {
    setSidebarCollapsed: StoreMutation<SpiderStoreState, boolean>;
    setActionsCollapsed: StoreMutation<SpiderStoreState, boolean>;
    showDialog: StoreMutation<SpiderStoreState, SpiderDialogKey>;
    hideDialog: StoreMutation<SpiderStoreState, SpiderDialogKey>;
    resetDialogs: StoreMutation<SpiderStoreState>;
    setSpiderForm: StoreMutation<SpiderStoreState, Spider>;
  }
}
