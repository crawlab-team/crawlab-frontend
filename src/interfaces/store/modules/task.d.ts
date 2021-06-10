import {Editor} from 'codemirror';

declare global {
  type TaskStoreModule = BaseModule<TaskStoreState, TaskStoreGetters, TaskStoreMutations, TaskStoreActions>;

  interface TaskStoreState extends BaseStoreState<Task> {
    logContent: string;
    logPagination: TablePagination;
    logTotal: number;
    logAutoUpdate: boolean;
    logCodeMirrorEditor?: Editor;
  }

  type TaskStoreGetters = BaseStoreGetters<TaskStoreState>;

  interface TaskStoreMutations extends BaseStoreMutations<Task> {
    setLogContent: StoreMutation<TaskStoreState, string>;
    resetLogContent: StoreMutation<TaskStoreState>;
    setLogPagination: StoreMutation<TaskStoreState, TablePagination>;
    resetLogPagination: StoreMutation<TaskStoreState>;
    setLogTotal: StoreMutation<TaskStoreState, number>;
    resetLogTotal: StoreMutation<TaskStoreState>;
    enableLogAutoUpdate: StoreMutation<TaskStoreState>;
    disableLogAutoUpdate: StoreMutation<TaskStoreState>;
    setLogCodeMirrorEditor: StoreMutation<TaskStoreState, Editor>;
  }

  interface TaskStoreActions extends BaseStoreActions<Task> {
    getLogs: StoreAction<BaseStoreState, string>;
  }
}
