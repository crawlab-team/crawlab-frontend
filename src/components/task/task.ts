import {useRoute} from 'vue-router';
import {computed} from 'vue';
import {
  TASK_MODE_ALL,
  TASK_MODE_RANDOM,
  TASK_MODE_SELECTED_NODE_TAGS,
  TASK_MODE_SELECTED_NODES
} from '@/constants/task';
import {Store} from 'vuex';
import useForm from '@/components/form/form';
import useTaskService from '@/services/task/taskService';
import {getDefaultFormComponentData} from '@/utils/form';
import {FORM_FIELD_TYPE_INPUT_WITH_BUTTON, FORM_FIELD_TYPE_SELECT} from '@/constants/form';
import useSpider from '@/components/spider/spider';
import {getPriorityLabel} from '@/utils/task';

// get new task
export const getNewTask = (): Task => {
  return {
    mode: TASK_MODE_RANDOM,
    priority: 5,
  };
};

// form component data
const formComponentData = getDefaultFormComponentData<Task>(getNewTask);

const useTask = (store: Store<RootStoreState>) => {
  // options for default mode
  const modeOptions: SelectOption[] = [
    {value: TASK_MODE_RANDOM, label: 'Random Node'},
    {value: TASK_MODE_ALL, label: 'All Nodes'},
    {value: TASK_MODE_SELECTED_NODES, label: 'Selected Nodes'},
    {value: TASK_MODE_SELECTED_NODE_TAGS, label: 'Selected Tags'},
  ];
  const modeOptionsDict = computed(() => {
    const dict = new Map<string, SelectOption>();
    modeOptions.forEach(op => dict.set(op.value, op));
    return dict;
  });

  // priority options
  const priorityOptions = (() => {
    const opts = [] as SelectOption[];
    for (let i = 1; i <= 10; i++) {
      opts.push({
        label: getPriorityLabel(i),
        value: i,
      });
    }
    return opts;
  })();

  const {
    allListSelectOptions: allSpiderListSelectOptions,
    allDict: allSpiderDict,
  } = useSpider(store);

  // batch form fields
  const batchFormFields = computed<FormTableField[]>(() => [
    {
      prop: 'spider_id',
      label: 'Spider',
      width: '150',
      placeholder: 'Spider',
      fieldType: FORM_FIELD_TYPE_SELECT,
      options: allSpiderListSelectOptions.value,
      required: true,
    },
    {
      prop: 'cmd',
      label: 'Execute Command',
      width: '200',
      placeholder: 'Execute Command',
      fieldType: FORM_FIELD_TYPE_INPUT_WITH_BUTTON,
      required: true,
    },
    {
      prop: 'param',
      label: 'Param',
      width: '200',
      placeholder: 'Param',
      fieldType: FORM_FIELD_TYPE_INPUT_WITH_BUTTON,
    },
    {
      prop: 'mode',
      label: 'Default Run Mode',
      width: '200',
      fieldType: FORM_FIELD_TYPE_SELECT,
      options: modeOptions,
      required: true,
    },
  ]);

  // route
  const route = useRoute();

  // task id
  const id = computed(() => route.params.id);

  return {
    ...useForm('task', store, useTaskService(store), formComponentData),
    allSpiderDict,
    batchFormFields,
    id,
    modeOptions,
    modeOptionsDict,
    priorityOptions,
    getPriorityLabel,
  };
};

export default useTask;
