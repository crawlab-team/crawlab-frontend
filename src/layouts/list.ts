import {computed, provide, readonly, watch} from 'vue';
import {Store} from 'vuex';

const useList = <T = any>(ns: ListStoreNamespace, store: Store<RootStoreState>, opts: UseListOptions<T>): ListLayoutComponentData => {
  // options
  const {
    tableColumns,
    navActions,
  } = opts;

  // store state
  const state = store.state[ns];

  // table
  const tableData = computed<TableData<T>>(() => state.tableData as TableData<T>);
  const tableTotal = computed<number>(() => state.tableTotal);
  const tablePagination = computed<TablePagination>(() => state.tablePagination);

  // action functions
  const actionFunctions = readonly<ListLayoutActionFunctions>({
    setPagination: (pagination: TablePagination) => store.commit(`${ns}/setTablePagination`, pagination),
    getList: () => store.dispatch(`${ns}/getList`),
    deleteList: (ids: string[]) => store.dispatch(`${ns}/deleteList`, ids),
  });

  // get list when pagination changes
  watch(() => tablePagination.value, actionFunctions.getList);

  // store context
  provide<ListStoreContext<T>>('store-context', {
    namespace: ns,
    store,
    state,
  });

  return {
    navActions,
    tableColumns,
    tableData,
    tableTotal,
    tablePagination,
    actionFunctions,
  };
};

export default useList;
