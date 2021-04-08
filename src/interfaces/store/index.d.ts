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
    dialogVisible: DialogVisible;
    form: T;
    tableData: TableData<T>;
    tableTotal: number;
    tablePagination: TablePagination;
  }

  type BaseStoreGetters<S> = GetterTree<S, RootStoreState>;

  interface BaseStoreMutations<T = any> extends MutationTree<BaseStoreState<T>> {
    showDialog: StoreMutation<BaseStoreState<T>, DialogKey>;
    hideDialog: StoreMutation<BaseStoreState<T>, DialogKey>;
    resetDialogs: StoreMutation<BaseStoreState<T>>;
    setForm: StoreMutation<BaseStoreState, T>;
    resetForm: StoreMutation<BaseStoreState>;
    setTableData: StoreMutation<BaseStoreState, TableDataWithTotal<T>>;
    resetTableData: StoreMutation<BaseStoreState>;
    setTablePagination: StoreMutation<BaseStoreState, TablePagination>;
  }

  interface BaseStoreActions<T = any> extends ActionTree<BaseStoreState<T>, RootStoreState> {
    getById: StoreAction<BaseStoreState<T>, string>;
    create: StoreAction<BaseStoreState<T>, T>;
    updateById: StoreAction<BaseStoreState<T>, { id: string; form: T }>;
    deleteById: StoreAction<BaseStoreState<T>, string>;
    getList: StoreAction<BaseStoreState<T>>;
    deleteList: StoreAction<BaseStoreState<T>, BatchRequestPayload>;
  }

  type StoreActionContext<S = BaseStoreState> = ActionContext<S, RootStoreState>;

  type StoreNamespace = 'login' | 'layout' | 'node' | 'project' | 'spider' | 'file';
  type StoreListNamespace = 'node' | 'project' | 'spider';
}
