type TaskStoreModule = BaseModule<TaskStoreState, TaskStoreGetters, TaskStoreMutations, TaskStoreActions>;

type TaskStoreState = BaseStoreState<Task>;

type TaskStoreGetters = BaseStoreGetters<Task>;

type TaskStoreMutations = BaseStoreMutations<Task>;

type TaskStoreActions = BaseStoreActions<Task>;
