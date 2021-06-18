import {getDefaultPagination} from '@/utils/pagination';
import {useService} from '@/services';
import router from '@/router';

export const getDefaultStoreState = <T = any>(ns: StoreNamespace): BaseStoreState<T> => {
  return {
    ns,
    dialogVisible: {
      createEdit: true,
    },
    activeDialogKey: undefined,
    createEditDialogTabName: 'single',
    form: {} as T,
    isSelectiveForm: false,
    selectedFormFields: [],
    readonlyFormFields: [],
    formList: [],
    confirmLoading: false,
    tableData: [],
    tableTotal: 0,
    tablePagination: getDefaultPagination(),
    tableListFilter: [],
    allList: [],
    sidebarCollapsed: false,
    actionsCollapsed: false,
    tabs: [{id: 'overview', title: 'Overview'}],
    afterSave: [],
  };
};

export const getDefaultStoreGetters = <T = any>(opts?: GetDefaultStoreGettersOptions): BaseStoreGetters<BaseStoreState<T>> => {
  if (!opts) opts = {};
  if (!opts.selectOptionValueKey) opts.selectOptionValueKey = '_id';
  if (!opts.selectOptionLabelKey) opts.selectOptionLabelKey = 'name';

  return {
    dialogVisible: (state: BaseStoreState<T>) => state.activeDialogKey !== undefined,
    // isBatchForm: (state: BaseStoreState<T>) => state.isSelectiveForm || state.createEditDialogTabName === 'batch',
    isBatchForm: (state: BaseStoreState<T>) => {
      return state.isSelectiveForm || state.createEditDialogTabName === 'batch';
    },
    formListIds: (state: BaseStoreState<BaseModel>) => state.formList.map(d => d._id as string),
    allListSelectOptions: (state: BaseStoreState<BaseModel>) => state.allList.map(d => {
      return {
        value: d[opts?.selectOptionValueKey as string],
        label: d[opts?.selectOptionLabelKey as string],
      };
    }),
    allDict: (state: BaseStoreState<BaseModel>) => {
      const dict = new Map<string, T>();
      state.allList.forEach(d => dict.set(d._id as string, d as any));
      return dict;
    },
    tabName: () => {
      const arr = router.currentRoute.value.path.split('/');
      if (arr.length < 3) return '';
      return arr[3];
    },
    allTags: (state: BaseStoreState<T>, getters, rootState) => {
      return rootState.tag.allList.filter(d => d.col === `${state.ns}s`);
    },
  };
};

export const getDefaultStoreMutations = <T = any>(): BaseStoreMutations<T> => {
  return {
    showDialog: (state: BaseStoreState<T>, key: DialogKey) => {
      state.activeDialogKey = key;
    },
    hideDialog: (state: BaseStoreState<T>) => {
      // reset all other state variables
      state.createEditDialogTabName = 'single';
      state.form = {} as T;
      state.isSelectiveForm = false;
      state.selectedFormFields = [];
      state.formList = [];
      state.confirmLoading = false;

      // set active dialog key as undefined
      state.activeDialogKey = undefined;
    },
    setCreateEditDialogTabName: (state: BaseStoreState<T>, tabName: CreateEditTabName) => {
      state.createEditDialogTabName = tabName;
    },
    resetCreateEditDialogTabName: (state: BaseStoreState<T>) => {
      state.createEditDialogTabName = 'single';
    },
    setForm: (state: BaseStoreState<T>, value: T) => {
      state.form = value;
    },
    resetForm: (state: BaseStoreState<T>) => {
      state.form = {} as T;
    },
    setIsSelectiveForm: (state: BaseStoreState<T>, value: boolean) => {
      state.isSelectiveForm = value;
    },
    setSelectedFormFields: (state: BaseStoreState<T>, value: string[]) => {
      state.selectedFormFields = value;
    },
    resetSelectedFormFields: (state: BaseStoreState<T>) => {
      state.selectedFormFields = [];
    },
    setReadonlyFormFields: (state: BaseStoreState<T>, value: string[]) => {
      state.readonlyFormFields = value;
    },
    resetReadonlyFormFields: (state: BaseStoreState<T>) => {
      state.readonlyFormFields = [];
    },
    setFormList: (state: BaseStoreState<T>, value: T[]) => {
      state.formList = value;
    },
    resetFormList: (state: BaseStoreState<T>) => {
      console.log('resetFormList');
      state.formList = [];
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
    setTablePagination: (state: BaseStoreState<T>, pagination: TablePagination) => {
      state.tablePagination = pagination;
    },
    resetTablePagination: (state: BaseStoreState<T>) => {
      state.tablePagination = getDefaultPagination();
    },
    setTableListFilter: (state: BaseStoreState<T>, filter: FilterConditionData[]) => {
      state.tableListFilter = filter;
    },
    resetTableListFilter: (state: BaseStoreState<T>) => {
      state.tableListFilter = [];
    },
    setAllList: (state: BaseStoreState<T>, value: T[]) => {
      state.allList = value;
    },
    resetAllList: (state: BaseStoreState<T>) => {
      state.allList = [];
    },
    expandSidebar: (state: BaseStoreState<T>) => {
      state.sidebarCollapsed = false;
    },
    collapseSidebar: (state: BaseStoreState<T>) => {
      state.sidebarCollapsed = true;
    },
    expandActions: (state: BaseStoreState<T>) => {
      state.actionsCollapsed = false;
    },
    collapseActions: (state: BaseStoreState<T>) => {
      state.actionsCollapsed = true;
    },
    setAfterSave: (state: BaseStoreState<T>, fnList) => {
      state.afterSave = fnList;
    },
  };
};

export const getDefaultStoreActions = <T = any>(endpoint: string): BaseStoreActions<T> => {
  const {
    getById,
    create,
    updateById,
    deleteById,
    getList,
    getAll,
    createList,
    updateList,
    deleteList,
  } = useService<T>(endpoint);

  return {
    getById: async ({commit}: StoreActionContext<BaseStoreState<T>>, id: string) => {
      const res = await getById(id);
      commit('setForm', res.data);
      return res;
    },
    create: async ({commit}: StoreActionContext<BaseStoreState<T>>, form: T) => {
      const res = await create(form);
      return res;
    },
    updateById: async ({commit}: StoreActionContext<BaseStoreState<T>>, {id, form}: { id: string; form: T }) => {
      const res = await updateById(id, form);
      return res;
    },
    deleteById: async ({commit}: StoreActionContext<BaseStoreState<T>>, id: string) => {
      const res = await deleteById(id);
      return res;
    },
    getList: async ({state, commit}: StoreActionContext<BaseStoreState<T>>) => {
      const {page, size} = state.tablePagination;
      const res = await getList({
        page,
        size,
        conditions: JSON.stringify(state.tableListFilter),
      } as ListRequestParams);
      commit('setTableData', {data: res.data || [], total: res.total});
      return res;
    },
    getListWithParams: async (_: StoreActionContext<BaseStoreState<T>>, params?: ListRequestParams) => {
      return await getList(params);
    },
    getAllList: async ({commit}: StoreActionContext<BaseStoreState<T>>) => {
      const res = await getAll();
      commit('setAllList', res.data || []);
      return res;
    },
    createList: async ({state, commit}: StoreActionContext<BaseStoreState<T>>, data: T[]) => {
      const res = await createList(data);
      return res;
    },
    updateList: async ({state, commit}: StoreActionContext<BaseStoreState<T>>, {
      ids,
      data,
      fields,
    }: BatchRequestPayloadWithData) => {
      const res = await updateList(ids, data, fields);
      return res;
    },
    deleteList: async ({commit}: StoreActionContext<BaseStoreState<T>>, ids: string[]) => {
      return await deleteList(ids);
    },
  };
};
