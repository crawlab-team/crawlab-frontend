export default {
  namespaced: true,
  state: {
    sidebarCollapsed: false,
    actionsCollapsed: false,
    tabName: 'overview',
    tabs: [
      {id: 'overview', title: 'Overview'},
      {id: 'files', title: 'Files'},
      {id: 'tasks', title: 'Tasks'},
      {id: 'settings', title: 'Settings'},
    ],
  },
  getters: {},
  mutations: {
    setSidebarCollapsed: (state: SpiderStoreState, value: boolean) => {
      state.sidebarCollapsed = value;
    },
    setActionsCollapsed: (state: SpiderStoreState, value: boolean) => {
      state.actionsCollapsed = value;
    },
    setTabName: (state: SpiderStoreState, tabName: SpiderTabName) => {
      state.tabName = tabName;
    },
    resetTabName: (state: SpiderStoreState) => {
      state.tabName = 'overview';
    },
  },
  actions: {}
} as SpiderStoreModule;
