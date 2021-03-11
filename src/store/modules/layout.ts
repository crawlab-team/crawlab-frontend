import {plainClone} from '@/utils/object';

export default {
  namespaced: true,
  state: {
    // sidebar
    sidebarCollapsed: false,
    menuItems: [
      {path: '/', title: 'Home', icon: ['fa', 'home']},
      {path: '/nodes', title: 'Nodes', icon: ['fa', 'server']},
      {path: '/projects', title: 'Projects', icon: ['fa', 'project-diagram']},
      {path: '/spiders', title: 'Spiders', icon: ['fa', 'spider']},
      {path: '/tasks', title: 'Tasks', icon: ['fa', 'tasks']},
      {path: '/schedules', title: 'Schedules', icon: ['fa', 'clock']},
      {path: '/users', title: 'Users', icon: ['fa', 'users']},
    ],

    // tabs view
    maxTabId: 0,
    tabs: [] as Tab[],
    draggingTab: undefined,
    targetTab: undefined,
    isTabsDragging: false,
  },
  getters: {
    tabs: state => {
      const {draggingTab, targetTab, tabs} = state;
      if (!draggingTab || !targetTab) return tabs;
      const orderedTabs = plainClone(state.tabs) as Tab[];
      const draggingIdx = orderedTabs.map(t => t.id).indexOf(draggingTab?.id);
      const targetIdx = orderedTabs.map(t => t.id).indexOf(targetTab?.id);
      if (draggingIdx === -1 || targetIdx === -1) return tabs;
      orderedTabs.splice(draggingIdx, 1);
      orderedTabs.splice(targetIdx, 0, draggingTab);
      return orderedTabs;
    },
  },
  mutations: {
    setSideBarCollapsed(state: LayoutStoreState, value: boolean) {
      state.sidebarCollapsed = value;
    },
    setTabs(state: LayoutStoreState, tabs: Tab[]) {
      state.tabs = tabs;
    },
    addTab(state: LayoutStoreState, tab: Tab) {
      if (tab.id === undefined) tab.id = ++state.maxTabId;
      state.tabs.push(tab);
    },
    removeAllTabs(state: LayoutStoreState) {
      state.tabs = [];
    },
    removeTab(state: LayoutStoreState, tab: Tab) {
      if (tab.id === undefined) return;
      const idx = state.tabs.map(t => t.id).indexOf(tab.id);
      if (idx === -1) return;
      state.tabs.splice(idx, 1);
    },
    setDraggingTab(state: LayoutStoreState, tab: Tab) {
      state.draggingTab = tab;
    },
    resetDraggingTab(state: LayoutStoreState) {
      state.draggingTab = undefined;
    },
    setTargetTab(state: LayoutStoreState, tab: Tab) {
      state.targetTab = tab;
    },
    resetTargetTab(state: LayoutStoreState) {
      state.targetTab = undefined;
    },
    setIsTabsDragging(state: LayoutStoreState, value: boolean) {
      state.isTabsDragging = value;
    }
  },
  actions: {}
} as LayoutStoreModule;
