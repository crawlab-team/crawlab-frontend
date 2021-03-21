import {useRoute} from 'vue-router';
import {computed, readonly, ref} from 'vue';
import {
  TASK_MODE_ALL,
  TASK_MODE_RANDOM,
  TASK_MODE_SELECTED_NODE_TAGS,
  TASK_MODE_SELECTED_NODES
} from '@/constants/task';
import {Store} from 'vuex';

const useSpider = (store: Store<RootStoreState>) => {
  // store states
  const {
    spider: spiderState,
  } = store.state;

  // route
  const route = useRoute();

  // spider id
  const id = computed(() => route.params.id);

  // internal spider form
  const spiderForm = ref<Spider>();

  // store spider form
  const storeSpiderForm = computed(() => spiderState.spiderForm);

  // get new spider
  const getNewSpider = () => {
    return {};
  };

  // reset spider form
  const resetSpiderForm = (isCreate: boolean) => {
    if (isCreate) {
      spiderForm.value = getNewSpider();
    } else {
      spiderForm.value = storeSpiderForm.value;
    }
  };

  // options for default mode
  const modeOptions = readonly<SelectOption[]>([
    {value: TASK_MODE_RANDOM, label: 'Random Node'},
    {value: TASK_MODE_ALL, label: 'All Nodes'},
    {value: TASK_MODE_SELECTED_NODES, label: 'Selected Nodes'},
    {value: TASK_MODE_SELECTED_NODE_TAGS, label: 'Selected Tags'},
  ]);

  return {
    // public variables and methods
    id,
    modeOptions,
    spiderForm,
    getNewSpider,
    resetSpiderForm,
  };
};

export default useSpider;
