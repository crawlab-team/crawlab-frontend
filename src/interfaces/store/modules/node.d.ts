interface NodeStoreModule extends BaseModule<NodeStoreState> {
  // getters: NodeStoreGetters;
  mutations: NodeStoreMutations;
}

interface NodeStoreState extends BaseStoreState {
  allNodeSelectOptions: SelectOption[];
  allNodeTags: string[];
}

// interface NodeStoreGetters extends GetterTree<NodeStoreState, RootStoreState> {
// }

interface NodeStoreMutations extends BaseStoreMutations<Node> {
  setAllNodeSelectOptions: StoreMutation<NodeStoreState, SelectOption[]>;
  setAllNodeTags: StoreMutation<NodeStoreState, string[]>;
}
