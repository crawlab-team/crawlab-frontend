export default {
  namespaced: true,
  state: {
    // sidebar
    sidebarCollapsed: false,
    menuItems: [
      {path: '/', title: 'Home', icon: ['fa', 'home']},
      {path: '/nodes', title: 'Node', icon: ['fas', 'server']},
      {path: '/spiders', title: 'Spider', icon: ['fas', 'spider']},
    ],

    // tabs view
    maxTabId: 0,
    tabs: [] as Tab[],
    draggingTab: undefined,
  },
  mutations: {
    setSideBarCollapsed(state, value: boolean) {
      state.sidebarCollapsed = value;
    },
    addTab(state, tab: Tab) {
      if (tab.id === undefined) tab.id = ++state.maxTabId;
      state.tabs.push(tab);
    },
    removeAllTabs(state) {
      state.tabs = [];
    },
    removeTab(state, tab: Tab) {
      if (tab.id === undefined) return;
      const idx = state.tabs.map(t => t.id).indexOf(tab.id);
      if (idx === -1) return;
      state.tabs.splice(idx, 1);
    },
    orderTab(state, payload) {
      const {tab, order} = payload;
      if (tab.id === undefined) return;
      const idx = state.tabs.map(t => t.id).indexOf(tab.id);
      if (idx === -1) return;
      if (idx === order) return;

      // remove tab
      const [tabToOrder] = state.tabs.splice(idx, 1);

      // insert tab
      state.tabs.splice(order, 0, tabToOrder);
    },
    setDraggingTab(state, tab: Tab) {
      state.draggingTab = tab;
    },
    resetDraggingTab(state) {
      state.draggingTab = undefined;
    },
  },
  actions: {}
} as LayoutStoreModule;
