import {Module, Mutation, MutationTree} from 'vuex';

declare global {
  interface LayoutStoreModule extends Module<LayoutStoreState, RootStoreState> {
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
  }

  interface LayoutStoreMutations extends MutationTree<LayoutStoreState> {
    setSideBarCollapsed: Mutation<LayoutStoreState>;
    addTab: Mutation<LayoutStoreState>;
    removeTab: Mutation<LayoutStoreState>;
    removeAllTabs: Mutation<LayoutStoreState>;
    orderTab: Mutation<LayoutStoreState>;
    setDraggingTab: Mutation<LayoutStoreState>;
    resetDraggingTab: Mutation<LayoutStoreState>;
  }

  interface MenuItem {
    path: string;
    title: string;
    icon?: string | string[];
    children?: MenuItem[];
  }

  interface Tab {
    id?: number;
    path: string;
  }
}
