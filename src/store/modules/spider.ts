import router from '@/router';

export default {
  namespaced: true,
  state: {
    sidebarCollapsed: false,
    actionsCollapsed: false,
    tabs: [
      {id: 'overview', title: 'Overview'},
      {id: 'files', title: 'Files'},
      {id: 'tasks', title: 'Tasks'},
      {id: 'settings', title: 'Settings'},
    ],
  },
  getters: {
    tabName: () => {
      const arr = router.currentRoute.value.path.split('/');
      if (arr.length < 3) return null;
      return arr[3];
    }
  },
  mutations: {
    setSidebarCollapsed: (state: SpiderStoreState, value: boolean) => {
      state.sidebarCollapsed = value;
    },
    setActionsCollapsed: (state: SpiderStoreState, value: boolean) => {
      state.actionsCollapsed = value;
    },
  },
  actions: {}
} as SpiderStoreModule;
