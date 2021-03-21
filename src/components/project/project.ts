import {computed, readonly, ref} from 'vue';
import {Store} from 'vuex';
import {isDuplicated} from '@/utils/array';
import {ElForm} from 'element-plus';

// project form ref
const projectFormRef = ref<typeof ElForm>();

const useProject = (store: Store<RootStoreState>) => {
  // store
  const storeNamespace = 'project';
  const {project: projectState} = store.state as RootStoreState;

  // internal project form
  const projectForm = ref<Project>();

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

  // store spider form
  const storeProjectForm = computed(() => projectState.projectForm);

  // get new project
  const getNewProject = () => {
    return {};
  };

  // reset spider form
  const resetProjectForm = (isCreate: boolean) => {
    if (isCreate) {
      projectForm.value = getNewProject();
    } else {
      projectForm.value = storeProjectForm.value;
    }
  };

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
