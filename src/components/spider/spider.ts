import {useRoute} from 'vue-router';
import {computed, readonly} from 'vue';
import {
  TASK_MODE_ALL,
  TASK_MODE_RANDOM,
  TASK_MODE_SELECTED_NODE_TAGS,
  TASK_MODE_SELECTED_NODES
} from '@/constants/task';
import {Store} from 'vuex';
import useForm from '@/components/form/form';
import useSpiderService from '@/services/spider/spiderService';
import {getDefaultFormComponentData} from '@/utils/form';

// get new spider
const getNewSpider = () => {
  return {};
};

// form component data
const formComponentData = getDefaultFormComponentData<Spider>(getNewSpider);

const useSpider = (store: Store<RootStoreState>) => {
  // batch form fields
  const batchFormFields = [
    {
      prop: 'name',
      label: 'Name',
      width: '120px',
      fieldType: 'input',
    },
  ] as FormTableField[];

  // route
  const route = useRoute();

  // spider id
  const id = computed(() => route.params.id);

  // options for default mode
  const modeOptions = readonly<SelectOption[]>([
    {value: TASK_MODE_RANDOM, label: 'Random Node'},
    {value: TASK_MODE_ALL, label: 'All Nodes'},
    {value: TASK_MODE_SELECTED_NODES, label: 'Selected Nodes'},
    {value: TASK_MODE_SELECTED_NODE_TAGS, label: 'Selected Tags'},
  ]);

  return {
    ...useForm('spider', store, useSpiderService(store), formComponentData),
    batchFormFields,
    id,
    modeOptions,
  };
};

export default useSpider;
