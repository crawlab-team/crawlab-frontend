import router from '@/router';
import {getDefaultStoreActions, getDefaultStoreMutations, getDefaultStoreState} from '@/utils/store';

const state = {
  ...getDefaultStoreState<Spider>(),
  sidebarCollapsed: false,
  actionsCollapsed: false,
  tabs: [
    {id: 'overview', title: 'Overview'},
    {id: 'files', title: 'Files'},
    {id: 'tasks', title: 'Tasks'},
    {id: 'settings', title: 'Settings'},
  ],
  dialogVisible: {
    create: false,
    edit: false,
    clone: false,
    run: false,
    delete: false,
  },
  // TODO: dummy data
  form: {},
} as SpiderStoreState;

const getters = {
  // tab name for spider detail
  tabName: () => {
    const arr = router.currentRoute.value.path.split('/');
    if (arr.length < 3) return null;
    return arr[3];
  },
} as SpiderStoreGetters;

const mutations = {
  ...getDefaultStoreMutations<Spider>(),
  setSidebarCollapsed: (state: SpiderStoreState, value: boolean) => {
    state.sidebarCollapsed = value;
  },
  setActionsCollapsed: (state: SpiderStoreState, value: boolean) => {
    state.actionsCollapsed = value;
  },
  showDialog: (state: SpiderStoreState, key: SpiderDialogKey) => {
    state.dialogVisible[key] = true;
  },
  hideDialog: (state: SpiderStoreState, key: SpiderDialogKey) => {
    state.dialogVisible[key] = false;
  },
  resetDialogs: (state: SpiderStoreState) => {
    for (const key in state.dialogVisible) {
      state.dialogVisible[key as SpiderDialogKey] = false;
    }
  },
} as SpiderStoreMutations;

const actions = {
  ...getDefaultStoreActions<Spider>('/spiders'),
} as SpiderStoreActions;

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as SpiderStoreModule;
