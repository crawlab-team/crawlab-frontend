import {createStore, Store} from 'vuex';
import login from './modules/login';
import layout from './modules/layout';
import spider from './modules/spider';

export default createStore<RootStoreState>({
  modules: {
    login,
    layout,
    spider,
  },
}) as Store<RootStoreState>;
