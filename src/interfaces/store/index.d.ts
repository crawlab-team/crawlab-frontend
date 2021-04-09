import {ActionContext, ActionTree, GetterTree, Module, MutationTree, Store} from 'vuex';

declare global {
  interface RootStoreState {
    login: LoginStoreState;
    layout: LayoutStoreState;
    node: NodeStoreState;
    project: ProjectStoreState;
    spider: SpiderStoreState;
    file: FileStoreState;
  }

  type StoreGetter<S, T> = (state: S, getters: StoreGetter<S, T>, rootState: RootStoreState, rootGetters: any) => T;

  type StoreMutation<S, P> = (state: S, payload: P) => void;

  type StoreActionHandler<S, P, T> = (this: Store<RootStoreState>, ctx: ActionContext<S, RootStoreState>, payload?: P) => T;

  interface StoreActionObject<S, P, T> {
    root?: boolean;
    handler: StoreActionHandler<S, P, T>;
  }

  type StoreAction<S, P, T> =
    StoreActionHandler<S, P, T>
    | StoreActionObject<S, P, T>;

  interface BaseModule<S, M, G = any, A = any> extends Module<S, RootStoreState> {
    getters: G;
    mutations: M;
    actions: A;
  }

  interface BaseStoreState<T = any> {
    activeDialogKey: DialogKey | undefined;
    form: T;
    isSelectiveForm: boolean;
    selectedFormFields: string[];
    formList: T[];
    isBatchForm: boolean;
    confirmLoading: boolean;
    tableData: TableData<T>;
    tableTotal: number;
    tablePagination: TablePagination;
  }

  interface BaseStoreGetters<T = any> extends GetterTree<BaseStoreState<T>, RootStoreState> {
    dialogVisible: StoreGetter<BaseStoreState<T>, boolean>;
    isBatchForm: StoreGetter<BaseStoreState<T>, boolean>;
    formListIds: StoreGetter<BaseStoreState<T>, string[]>;
  }

  interface BaseStoreMutations<T = any> extends MutationTree<BaseStoreState<T>> {
    showDialog: StoreMutation<BaseStoreState<T>, DialogKey>;
    hideDialog: StoreMutation<BaseStoreState<T>>;
    setForm: StoreMutation<BaseStoreState<T>, T>;
    resetForm: StoreMutation<BaseStoreState<T>>;
    setIsSelectiveForm: StoreMutation<BaseStoreState<T>, boolean>;
    setSelectedFormFields: StoreMutation<BaseStoreState<T>, string[]>;
    resetSelectedFormFields: StoreMutation<BaseStoreState<T>>;
    setFormList: StoreMutation<BaseStoreState<T>, T[]>;
    resetFormList: StoreMutation<BaseStoreState<T>>;
    setIsBatchForm: StoreMutation<BaseStoreState<T>, boolean>;
    setConfirmLoading: StoreMutation<BaseStoreState<T>, boolean>;
    setTableData: StoreMutation<BaseStoreState<T>, TableDataWithTotal<T>>;
    resetTableData: StoreMutation<BaseStoreState<T>>;
    setTablePagination: StoreMutation<BaseStoreState<T>, TablePagination>;
  }

  interface BaseStoreActions<T = any> extends ActionTree<BaseStoreState<T>, RootStoreState> {
    getById: StoreAction<BaseStoreState<T>, string>;
    create: StoreAction<BaseStoreState<T>, T>;
    updateById: StoreAction<BaseStoreState<T>, { id: string; form: T }>;
    deleteById: StoreAction<BaseStoreState<T>, string>;
    getList: StoreAction<BaseStoreState<T>>;
    createList: StoreAction<BaseStoreState<T>, T[]>;
    updateList: StoreAction<BaseStoreState<T>, BatchRequestPayloadWithData<T>>;
    deleteList: StoreAction<BaseStoreState<T>, BatchRequestPayload>;
  }

  type StoreActionContext<S = BaseStoreState> = ActionContext<S, RootStoreState>;

  type StoreNamespace = 'login' | 'layout' | 'node' | 'project' | 'spider' | 'file';
  type ListStoreNamespace = 'node' | 'project' | 'spider';

  interface StoreContext<T> {
    namespace: StoreNamespace;
    store: Store<RootStoreState>;
    state: BaseStoreState<T>;
  }

  interface ListStoreContext<T> extends StoreContext<T> {
    namespace: ListStoreNamespace;
    state: RootStoreState[ListStoreNamespace];
  }
}
