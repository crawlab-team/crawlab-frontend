type TaskStoreModule = BaseModule<TaskStoreState, TaskStoreGetters, TaskStoreMutations, TaskStoreActions>;

interface TaskStoreState extends BaseStoreState<Task> {
  logContent: string;
  logPagination: TablePagination;
  logTotal: number;
}

type TaskStoreGetters = BaseStoreGetters<Task>;

interface TaskStoreMutations extends BaseStoreMutations<Task> {
  setLogContent: StoreMutation<TaskStoreState, string>;
  resetLogContent: StoreMutation<TaskStoreState>;
  setLogPagination: StoreMutation<TaskStoreState, TablePagination>;
  resetLogPagination: StoreMutation<TaskStoreState>;
  setLogTotal: StoreMutation<TaskStoreState, number>;
}

interface TaskStoreActions extends BaseStoreActions<Task> {
  getLogs: StoreAction<BaseStoreState, string>;
}
