import {computed, readonly, watch} from 'vue';
import {Store} from 'vuex';
import {voidFunc} from '@/utils/func';

const useList = <S, T = any>(ns: StoreListNamespace, store: Store<RootStoreState>, opts: UseListOptions<T>): ListLayoutComponentData => {
  const {
    tableColumns,
    navActions,
  } = opts;

  const state = store.state[ns];

  const tableData = computed<TableData<T>>(() => state.tableData as TableData<T>);
  const tableTotal = computed<number>(() => state.tableTotal);
  const tablePagination = computed<TablePagination>(() => state.tablePagination);

  const actionFunctions = readonly<ListLayoutActionFunctions>({
    setPagination: (pagination: TablePagination) => store.commit(`${ns}/setTablePagination`, pagination),
    getList: () => store.dispatch(`${ns}/getList`),
    editList: async () => voidFunc(),
    deleteList: (ids: string[]) => store.dispatch(`${ns}/deleteList`, ids),
  });

  watch(() => tablePagination.value, actionFunctions.getList);

  return {
    actionFunctions,
    navActions,
    tableColumns,
    tableData,
    tableTotal,
    tablePagination,
  };
};

export default useList;
