import {
  getDefaultStoreActions,
  getDefaultStoreGetters,
  getDefaultStoreMutations,
  getDefaultStoreState
} from '@/utils/store';
import {getDefaultPagination} from '@/utils/pagination';
import useRequest from '@/services/request';

const {
  getList,
} = useRequest();

const state = {
  ...getDefaultStoreState<DataCollection>('dataCollection'),
  resultTableData: [],
  resultTableTotal: 0,
  resultTablePagination: getDefaultPagination(),
} as DataCollectionStoreState;

const getters = {
  ...getDefaultStoreGetters<DataCollection>(),
  resultFields: (state: DataCollectionStoreState) => {
    if (state.resultTableData.length === 0) {
      return [];
    }
    const item = state.resultTableData[0];
    if (typeof item !== 'object') return [];
    return Object.keys(item).map(key => {
      return {
        key,
      };
    });
  },
} as DataCollectionStoreGetters;

const mutations = {
  ...getDefaultStoreMutations<DataCollection>(),
  setResultTableData: (state: DataCollectionStoreState, payload: TableDataWithTotal<Result>) => {
    const {data, total} = payload;
    state.resultTableData = data;
    state.resultTableTotal = total;
  },
  resetResultTableData: (state: DataCollectionStoreState) => {
    state.resultTableData = [];
    state.resultTableTotal = 0;
  },
  setResultTablePagination: (state: DataCollectionStoreState, pagination: TablePagination) => {
    state.resultTablePagination = pagination;
  },
  resetResultTablePagination: (state: DataCollectionStoreState) => {
    state.resultTablePagination = getDefaultPagination();
  },
} as DataCollectionStoreMutations;

const actions = {
  ...getDefaultStoreActions<DataCollection>('/data/collections'),
  getResultList: async ({commit}: StoreActionContext<DataCollectionStoreState>, payload: { id: string; params: ListRequestParams }) => {
    const {id, params} = payload;
    const res = await getList(`/results/${id}`, params);
    commit('setResultTableData', {data: res.data || [], total: res.total});
    return res;
  },
} as DataCollectionStoreActions;

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as DataCollectionStoreModule;
