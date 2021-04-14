type SpiderStoreModule = BaseModule<SpiderStoreState, SpiderStoreGetters, SpiderStoreMutations, SpiderStoreActions>;

interface SpiderStoreState extends BaseStoreState<Spider> {
  sidebarCollapsed: boolean;
  actionsCollapsed: boolean;
  tabs: NavItem[];
  dialogVisible: SpiderDialogVisible;
}

interface SpiderStoreGetters extends BaseStoreGetters<Spider> {
  tabName: StoreGetter<SpiderStoreState, SpiderTabName>;
}

interface SpiderStoreMutations extends BaseStoreMutations<Spider> {
  setSidebarCollapsed: StoreMutation<SpiderStoreState, boolean>;
  setActionsCollapsed: StoreMutation<SpiderStoreState, boolean>;
}

interface SpiderStoreActions extends BaseStoreActions<Spider> {
  runById: (id: string) => Promise<Response>;
}
