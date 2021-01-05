import {createStore} from 'vuex';
import login from './modules/login';
import layout from './modules/layout';

export default createStore<RootStoreState>({
  modules: {
    login,
    layout,
  },
});
