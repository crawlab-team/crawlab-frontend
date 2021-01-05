export default {
  namespaced: true,
  state: {
    sidebarCollapsed: false,
    menuItems: [
      {path: '/', title: 'Home', icon: ['fa', 'home']},
      {path: '/spiders', title: 'Spider', icon: ['fas', 'spider']},
    ],
  },
  mutations: {
    setSideBarCollapsed(state, value: boolean) {
      state.sidebarCollapsed = value;
    }
  },
  actions: {}
} as LayoutStoreModule;
