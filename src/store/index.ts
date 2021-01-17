import {createStore, Store} from 'vuex';
import login from './modules/login';
import layout from './modules/layout';
import spider from './modules/spider';
import file from './modules/file';

export default createStore<RootStoreState>({
  modules: {
    login,
    layout,
    spider,
    file,
  },
}) as Store<RootStoreState>;
