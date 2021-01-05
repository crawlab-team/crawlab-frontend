import {Module, Mutation, MutationTree} from 'vuex';

declare global {
  interface LayoutStoreModule extends Module<LayoutStoreState, RootStoreState> {
    mutations: LayoutStoreMutations;
  }

  interface LayoutStoreState {
    sidebarCollapsed: boolean;
    menuItems: MenuItem[];
  }

  interface LayoutStoreMutations extends MutationTree<LayoutStoreState> {
    setSideBarCollapsed: Mutation<LayoutStoreState>;
  }

  interface MenuItem {
    path: string;
    title: string;
    icon?: string | string[];
    children?: MenuItem[];
  }
}
