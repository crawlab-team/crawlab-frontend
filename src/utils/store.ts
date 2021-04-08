import {getDefaultPagination} from '@/utils/pagination';
import {useService} from '@/services';

export const getDefaultStoreState = <T = any>(): BaseStoreState<T> => {
  return {
    activeDialogKey: undefined,
    form: {} as T,
    confirmLoading: false,
    tableData: [],
    tableTotal: 0,
    tablePagination: getDefaultPagination(),
  };
};

export const getDefaultStoreGetters = <T = any>(): BaseStoreGetters<T> => {
  return {
    dialogVisible: (state: BaseStoreState<T>) => {
      return state.activeDialogKey !== undefined;
    },
  };
};

export const getDefaultStoreMutations = <T = any>(): BaseStoreMutations<T> => {
  return {
    showDialog: (state: BaseStoreState<T>, key: DialogKey) => {
      state.activeDialogKey = key;
    },
    hideDialog: (state: BaseStoreState<T>) => {
      state.activeDialogKey = undefined;
    },
    setForm: (state: BaseStoreState<T>, value: T) => {
      state.form = value;
    },
    resetForm: (state: BaseStoreState<T>) => {
      state.form = {} as T;
    },
    setConfirmLoading: (state: BaseStoreState<T>, value: boolean) => {
      state.confirmLoading = value;
    },
    resetTableData: (state: BaseStoreState<T>) => {
      state.tableData = [];
    },
    setTableData: (state: BaseStoreState<T>, payload: TableDataWithTotal<T>) => {
      const {data, total} = payload;
      state.tableData = data;
      state.tableTotal = total;
    },
    setTablePagination: (state: BaseStoreState, pagination: TablePagination) => {
      state.tablePagination = pagination;
    },
  };
};

export const getDefaultStoreActions = <T = any>(endpoint: string): BaseStoreActions<T> => {
  const {
    get,
    create,
    update,
    del,
    getList,
    deleteList,
  } = useService<T>(endpoint);

  return {
    getById: async ({commit}: StoreActionContext<BaseStoreState<T>>, id: string) => {
      const res = await get(id);
      commit('setForm', res.data);
      return res;
    },
    create: async ({commit}: StoreActionContext<BaseStoreState<T>>, form: T) => {
      const res = await create(form);
      return res;
    },
    updateById: async ({commit}: StoreActionContext<BaseStoreState<T>>, {id, form}: { id: string; form: T }) => {
      const res = await update(id, form);
      return res;
    },
    deleteById: async ({commit}: StoreActionContext<BaseStoreState<T>>, id: string) => {
      const res = await del(id);
      return res;
    },
    getList: async ({state, commit}: StoreActionContext<BaseStoreState<T>>) => {
      // TODO: filter
      const res = await getList(state.tablePagination);
      commit('setTableData', {data: res.data || [], total: res.total});
      return res;
    },
    deleteList: async ({commit}: StoreActionContext<BaseStoreState<T>>, ids: string[]) => {
      return await deleteList(ids);
    },
  };
};
