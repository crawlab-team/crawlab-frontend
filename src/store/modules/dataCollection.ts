import {
  getDefaultStoreActions,
  getDefaultStoreGetters,
  getDefaultStoreMutations,
  getDefaultStoreState
} from '@/utils/store';

const state = {
  ...getDefaultStoreState<DataCollection>('dataCollection'),
} as DataCollectionStoreState;

const getters = {
  ...getDefaultStoreGetters<DataCollection>(),
} as DataCollectionStoreGetters;

const mutations = {
  ...getDefaultStoreMutations<DataCollection>(),
} as DataCollectionStoreMutations;

const actions = {
  ...getDefaultStoreActions<DataCollection>('/data/collections'),
} as DataCollectionStoreActions;

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as DataCollectionStoreModule;
