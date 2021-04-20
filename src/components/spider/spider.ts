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
import useSpiderService from '@/services/spider/spiderService';
import {getDefaultFormComponentData} from '@/utils/form';
import {
  FORM_FIELD_TYPE_INPUT,
  FORM_FIELD_TYPE_INPUT_TEXTAREA,
  FORM_FIELD_TYPE_INPUT_WITH_BUTTON,
  FORM_FIELD_TYPE_SELECT
} from '@/constants/form';
import useProject from '@/components/project/project';

// get new spider
const getNewSpider = (): Spider => {
  return {
    mode: TASK_MODE_RANDOM,
  };
};

// form component data
const formComponentData = getDefaultFormComponentData<Spider>(getNewSpider);

const useSpider = (store: Store<RootStoreState>) => {
  // options for default mode
  const modeOptions: SelectOption[] = [
    {value: TASK_MODE_RANDOM, label: 'Random Node'},
    {value: TASK_MODE_ALL, label: 'All Nodes'},
    {value: TASK_MODE_SELECTED_NODES, label: 'Selected Nodes'},
    {value: TASK_MODE_SELECTED_NODE_TAGS, label: 'Selected Tags'},
  ];

  // use project
  const {
    allProjectSelectOptions,
  } = useProject(store);

  // batch form fields
  const batchFormFields = computed<FormTableField[]>(() => [
    {
      prop: 'name',
      label: 'Name',
      width: '150',
      placeholder: 'Spider Name',
      fieldType: FORM_FIELD_TYPE_INPUT,
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
      prop: 'project_id',
      label: 'Project',
      width: '200',
      fieldType: FORM_FIELD_TYPE_SELECT,
      options: allProjectSelectOptions.value,
    },
    {
      prop: 'mode',
      label: 'Default Run Mode',
      width: '200',
      fieldType: FORM_FIELD_TYPE_SELECT,
      options: modeOptions,
      required: true,
    },
    {
      prop: 'description',
      label: 'Description',
      width: '200',
      fieldType: FORM_FIELD_TYPE_INPUT_TEXTAREA,
    },
  ]);

  // route
  const route = useRoute();

  // spider id
  const id = computed(() => route.params.id);

  return {
    ...useForm('spider', store, useSpiderService(store), formComponentData),
    batchFormFields,
    id,
    modeOptions,
  };
};

export default useSpider;
