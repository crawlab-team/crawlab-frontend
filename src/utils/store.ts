import {getDefaultPagination} from '@/utils/pagination';

export const getDefaultStoreState = <T = any>(): BaseStoreState<T> => {
  return {
    dialogVisible: {
      create: false,
      edit: false,
      delete: false,
      clone: false,
    },
    form: {} as T,
    tableData: [],
    tableTotal: 0,
    tablePagination: getDefaultPagination(),
  };
};

export const getDefaultStoreMutations = <T = any>(): BaseStoreMutations<T> => {
  return {
    showDialog: (state: BaseStoreState<T>, key: DialogKey) => {
      state.dialogVisible[key] = true;
    },
    hideDialog: (state: BaseStoreState<T>, key: DialogKey) => {
      state.dialogVisible[key] = false;
    },
    resetDialogs: (state: BaseStoreState<T>) => {
      for (const key in state.dialogVisible) {
        state.dialogVisible[key as DialogKey] = false;
      }
    },
    setForm: (state: BaseStoreState<T>, value: T) => {
      state.form = value;
    },
    resetForm: (state: BaseStoreState<T>) => {
      state.form = {} as T;
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
