import {computed} from 'vue';
import {Store} from 'vuex';

const useList = <S, T = any>(ns: StoreListNamespace, store: Store<RootStoreState>, opts: UseListOptions<T>): ListLayoutComponentData => {
  const {
    tableColumns,
    navActions,
    actionFunctions,
  } = opts;

  const state = store.state[ns];

  const tableData = computed<TableData<T>>(() => state.tableData as TableData<T>);
  const tableTotal = computed<number>(() => state.tableTotal);
  const tablePagination = computed<TablePagination>(() => state.tablePagination);

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
