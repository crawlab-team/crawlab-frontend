import {computed, readonly, ref, watch} from 'vue';
import {Store} from 'vuex';
import {isDuplicated} from '@/utils/array';
import {ElForm} from 'element-plus';
import useProjectService from '@/services/project/projectService';

// project form ref
const projectFormRef = ref<typeof ElForm>();

// get new project
const getNewProject = (): Project => {
  return {
    tags: [],
  };
};

// internal project form
const projectForm = ref<Project>(getNewProject());

const useProject = (store: Store<RootStoreState>) => {
  // store
  const storeNamespace = 'project';
  const {project: projectState} = store.state as RootStoreState;

  // services
  const {
    getProjectList,
    deleteProject,
    deleteProjectList,
  } = useProjectService(store);

  // project form rules
  const projectFormRules = readonly<FormRules>({
    name: {
      trigger: 'blur',
      required: true,
      message: 'Name is required',
    },
    tags: {
      validator: ((_, value, callback) => {
        if (isDuplicated(value)) {
          return callback('Duplicated tags');
        }
        callback();
      }),
    },
  });

  // validate project form
  const validateProjectForm = async () => {
    return await projectFormRef.value?.validate();
  };

  // store project form
  const storeProjectForm = computed(() => projectState.projectForm);

  // reset project form
  const resetProjectForm = (isCreate: boolean) => {
    if (isCreate) {
      projectForm.value = getNewProject();
    } else {
      projectForm.value = storeProjectForm.value;
      projectFormRef.value?.clearValidate();
    }
    projectFormRef.value?.resetFields();
  };

  // reset project form
  watch(() => projectState.dialogVisible.create, () => {
    resetProjectForm(true);
  });

  // all project select options
  const allProjectSelectOptions = computed<SelectOption[]>(() => projectState.allProjectSelectOptions);
  const setAllProjectSelectOptions = (options: SelectOption[]) => {
    store.commit(`${storeNamespace}/setAllProjectSelectOptions`, options);
  };

  // all project tags
  const allProjectTags = computed<SelectOption[]>(() => projectState.allProjectTags.map(tag => {
    return {
      label: tag,
      value: tag,
    };
  }));
  const setAllProjectTags = (tags: string[]) => {
    store.commit(`${storeNamespace}/setAllProjectTags`, tags);
  };

  // project list
  const projectList = computed<TableData<Project>>(() => projectState.projectList);

  // project list total
  const projectListTotal = computed<number>(() => projectState.projectListTotal);

  // project list pagination data
  const projectListPagination = computed<TablePagination>(() => projectState.projectListPagination);

  // dispatch get project list
  const dispatchGetProjectList = async () => {
    const {page, size} = projectListPagination.value;
    const res = await getProjectList({page, size});
    const {data, total} = res;
    store.commit(`${storeNamespace}/setProjectList`, {data, total});
  };

  // pagination
  const setProjectListPagination = (value: TablePagination) => {
    store.commit(`${storeNamespace}/setProjectPaginationData`, value);
  };

  return {
    projectForm,
    projectFormRef,
    projectFormRules,
    validateProjectForm,
    allProjectSelectOptions,
    allProjectTags,
    setAllProjectSelectOptions,
    setAllProjectTags,
    getNewProject,
    resetProjectForm,
    projectList,
    projectListTotal,
    projectListPagination,
    dispatchGetProjectList,
    setProjectListPagination,
    deleteProject,
    deleteProjectList,
  };
};

export default useProject;
