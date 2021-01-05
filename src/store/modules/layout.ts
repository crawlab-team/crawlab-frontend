import {Module} from 'vuex';

export default {
  namespaced: true,
  state: {
    menuItems: [
      {path: '/', title: 'Home', icon: ['fa', 'home']},
      {path: '/spiders', title: 'Spider', icon: ['fas', 'spider']},
    ],
  },
  mutations: {},
  actions: {}
} as Module<LayoutStoreState, RootStoreState>;
