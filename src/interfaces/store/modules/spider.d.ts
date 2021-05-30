type SpiderStoreModule = BaseModule<SpiderStoreState, SpiderStoreGetters, SpiderStoreMutations, SpiderStoreActions>;

interface SpiderStoreState extends BaseStoreState<Spider> {
  fileNavItems: FileNavItem[];
  fileContent: string;
}

type SpiderStoreGetters = BaseStoreGetters<Spider>;

interface SpiderStoreMutations extends BaseStoreMutations<Spider> {
  setFileNavItems: StoreMutation<BaseStoreState<Spider>, FileNavItem[]>;
  setFileContent: StoreMutation<BaseStoreState<Spider>, string>;
}

interface SpiderStoreActions extends BaseStoreActions<Spider> {
  // runById: StoreAction<BaseStoreState, { id: string }>;
  listDir: StoreAction<BaseStoreState, FileRequestPayload>;
  getFile: StoreAction<BaseStoreState, FileRequestPayload>;
  getFileInfo: StoreAction<BaseStoreState, FileRequestPayload>;
  saveFile: StoreAction<BaseStoreState, FileRequestPayload>;
  renameFile: StoreAction<BaseStoreState, FileRequestPayload>;
  deleteFile: StoreAction<BaseStoreState, FileRequestPayload>;
  copyFile: StoreAction<BaseStoreState, FileRequestPayload>;
}
