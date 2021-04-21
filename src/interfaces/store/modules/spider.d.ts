type SpiderStoreModule = BaseModule<SpiderStoreState, SpiderStoreGetters, SpiderStoreMutations, SpiderStoreActions>;

type SpiderStoreState = BaseStoreState<Spider>;

type SpiderStoreGetters = BaseStoreGetters<Spider>;

type SpiderStoreMutations = BaseStoreMutations<Spider>;

interface SpiderStoreActions extends BaseStoreActions<Spider> {
  runById: (id: string) => Promise<Response>;
}
