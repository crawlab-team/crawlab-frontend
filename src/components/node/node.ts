import {computed} from 'vue';
import {Store} from 'vuex';

const useNode = (store: Store<RootStoreState>) => {
  // implementation
  const storeNamespace = 'node';
  const {node: state} = store.state as RootStoreState;

  // all node select options
  const allNodeSelectOptions = computed(() => state.allNodeSelectOptions);
  const setAllNodeSelectOptions = (options: SelectOption[]) => {
    store.commit(`${storeNamespace}/setAllNodeSelectOptions`, options);
  };

  // all node tags
  const allNodeTags = computed(() => state.allNodeTags);
  const setAllNodeTags = (options: SelectOption[]) => {
    store.commit(`${storeNamespace}/setAllNodeSelectOptions`, options);
  };

  return {
    // public variables and methods
    allNodeSelectOptions,
    allNodeTags,
    setAllNodeSelectOptions,
    setAllNodeTags,
  };
};

export default useNode;
