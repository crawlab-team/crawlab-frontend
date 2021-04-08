type SpiderStoreModule = BaseModule<SpiderStoreState, SpiderStoreMutations, SpiderStoreGetters, SpiderStoreActions>;

interface SpiderStoreState extends BaseStoreState<Spider> {
  sidebarCollapsed: boolean;
  actionsCollapsed: boolean;
  tabs: NavItem[];
  dialogVisible: SpiderDialogVisible;
}

interface SpiderStoreGetters extends BaseStoreGetters<SpiderStoreState> {
  tabName: StoreGetter<SpiderStoreState, SpiderTabName>;
}

interface SpiderStoreMutations extends BaseStoreMutations<Spider> {
  setSidebarCollapsed: StoreMutation<SpiderStoreState, boolean>;
  setActionsCollapsed: StoreMutation<SpiderStoreState, boolean>;
  showDialog: StoreMutation<SpiderStoreState, SpiderDialogKey>;
  hideDialog: StoreMutation<SpiderStoreState, SpiderDialogKey>;
  resetDialogs: StoreMutation<SpiderStoreState>;
}

interface SpiderStoreActions extends BaseStoreActions<Spider> {
  runById: (id: string) => Promise<Response>;
}
