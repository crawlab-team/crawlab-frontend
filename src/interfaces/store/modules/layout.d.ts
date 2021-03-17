import {GetterTree, Module, MutationTree} from 'vuex';

declare global {
  interface LayoutStoreModule extends Module<LayoutStoreState, RootStoreState> {
    getters: LayoutStoreGetters;
    mutations: LayoutStoreMutations;
  }

  interface LayoutStoreState {
    // sidebar
    sidebarCollapsed: boolean;
    menuItems: MenuItem[];

    // tabs view
    maxTabId: number;
    tabs: Tab[];
    draggingTab?: Tab;
    targetTab?: Tab;
    isTabsDragging: boolean;
  }

  interface LayoutStoreGetters extends GetterTree<LayoutStoreState, RootStoreState> {
    tabs: StoreGetter<LayoutStoreState, RootStoreState, Tab[]>;
  }

  interface LayoutStoreMutations extends MutationTree<LayoutStoreState> {
    setSideBarCollapsed: StoreMutation<LayoutStoreState, boolean>;
    setTabs: StoreMutation<LayoutStoreState, Tab[]>;
    addTab: StoreMutation<LayoutStoreState, Tab>;
    removeTab: StoreMutation<LayoutStoreState, Tab>;
    removeAllTabs: StoreMutation<LayoutStoreState>;
    setDraggingTab: StoreMutation<LayoutStoreState, Tab>;
    resetDraggingTab: StoreMutation<LayoutStoreState>;
    setTargetTab: StoreMutation<LayoutStoreState, Tab>;
    resetTargetTab: StoreMutation<LayoutStoreState>;
    setIsTabsDragging: StoreMutation<LayoutStoreState, boolean>;
  }
}
