type Node = CNode;

type NodeStoreModule = BaseModule<NodeStoreState, NodeStoreGetters, NodeStoreMutations, NodeStoreActions>;

interface NodeStoreState extends BaseStoreState<CNode> {
  allNodeSelectOptions: SelectOption[];
  allNodeTags: string[];
}

type NodeStoreGetters = BaseStoreGetters<CNode>;

interface NodeStoreMutations extends BaseStoreMutations<CNode> {
  setAllNodeSelectOptions: StoreMutation<BaseStoreState<CNode>, SelectOption[]>;
  setAllNodeTags: StoreMutation<BaseStoreState<CNode>, string[]>;
}

type NodeStoreActions = BaseStoreActions<CNode>;
