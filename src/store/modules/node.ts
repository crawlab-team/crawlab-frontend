import {getDefaultStoreMutations, getDefaultStoreState} from '@/utils/store';

const state = {
  ...getDefaultStoreState<Node>(),
  // TODO: dummy data
  allNodeSelectOptions: [
    {label: 'Master', value: 'master'},
    {label: 'Worker 1', value: 'worker-1'},
    {label: 'Worker 2', value: 'worker-2'},
    {label: 'Worker 3', value: 'worker-3'},
    {label: 'Worker 4', value: 'worker-4'},
    {label: 'Worker 5', value: 'worker-5'},
  ],
  allNodeTags: [
    '1c2g',
    '2c4g',
    '2c8g',
    '4c16g',
  ],
} as NodeStoreState;

const mutations = {
  ...getDefaultStoreMutations<Node>(),
  setAllNodeSelectOptions: (state: NodeStoreState, options: SelectOption[]) => {
    state.allNodeSelectOptions = options;
  },
  setAllNodeTags: (state: NodeStoreState, tags: string[]) => {
    state.allNodeTags = tags;
  },
} as NodeStoreMutations;

export default {
  namespaced: true,
  state,
  mutations,
} as NodeStoreModule;
