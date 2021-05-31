import {computed, provide, readonly, watch} from 'vue';
import {Store} from 'vuex';
import {ElMessage, ElMessageBox} from 'element-plus';

const useList = <T = any>(ns: ListStoreNamespace, store: Store<RootStoreState>, opts?: UseListOptions<T>): ListLayoutComponentData => {
  // store state
  const state = store.state[ns] as BaseStoreState;

  // table
  const tableData = computed<TableData<T>>(() => state.tableData as TableData<T>);
  const tableTotal = computed<number>(() => state.tableTotal);
  const tablePagination = computed<TablePagination>(() => state.tablePagination);

  // action functions
  const actionFunctions = readonly<ListLayoutActionFunctions>({
    setPagination: (pagination: TablePagination) => store.commit(`${ns}/setTablePagination`, pagination),
    getList: () => store.dispatch(`${ns}/getList`),
    getAll: () => store.dispatch(`${ns}/getAllList`),
    deleteList: (ids: string[]) => store.dispatch(`${ns}/deleteList`, ids),
    deleteByIdConfirm: async (row: BaseModel) => {
      await ElMessageBox.confirm('Are you sure to delete?', 'Delete', {
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      });
      await store.dispatch(`${ns}/deleteById`, row._id);
      await ElMessage.success('Deleted successfully');
      await store.dispatch(`${ns}/getList`);
    },
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
    ...opts,
    tableData,
    tableTotal,
    tablePagination,
    actionFunctions,
  };
};

export default useList;
