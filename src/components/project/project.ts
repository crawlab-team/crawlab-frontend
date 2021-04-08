import {computed, readonly, ref, watch} from 'vue';
import {Store} from 'vuex';
import {isDuplicated} from '@/utils/array';
import {ElForm} from 'element-plus';

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
  const storeProjectForm = computed(() => projectState.form);

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

  // pagination

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
  };
};

export default useProject;
