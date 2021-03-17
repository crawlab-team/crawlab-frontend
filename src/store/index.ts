import {createStore, Store} from 'vuex';
import login from '@/store/modules/login';
import layout from '@/store/modules/layout';
import node from '@/store/modules/node';
import project from '@/store/modules/project';
import spider from '@/store/modules/spider';
import file from '@/store/modules/file';

export default createStore<RootStoreState>({
  modules: {
    login,
    layout,
    node,
    project,
    spider,
    file,
  },
}) as Store<RootStoreState>;
