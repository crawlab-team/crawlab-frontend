import {
  getDefaultStoreActions,
  getDefaultStoreGetters,
  getDefaultStoreMutations,
  getDefaultStoreState
} from '@/utils/store';
import useRequest from '@/services/request';

const {
  put,
} = useRequest();

const state = {
  ...getDefaultStoreState<Task>('task'),
} as TaskStoreState;

const getters = {
  ...getDefaultStoreGetters<Task>(),
} as TaskStoreGetters;

const mutations = {
  ...getDefaultStoreMutations<Task>(),
} as TaskStoreMutations;

const actions = {
  ...getDefaultStoreActions<Task>('/tasks'),
  create: async ({commit}: StoreActionContext<Task>, form: Task) => {
    return await put(`/tasks/run`, form);
  },
} as TaskStoreActions;

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as TaskStoreModule;
