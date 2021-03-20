import {computed, ref} from 'vue';
import {Store} from 'vuex';

const useProject = (store: Store<RootStoreState>) => {
  // store
  const storeNamespace = 'project';
  const {project: projectState} = store.state as RootStoreState;

  // internal project form
  const projectForm = ref<Project>();

  // store spider form
  const storeProjectForm = computed(() => projectState.projectForm);

  // reset spider form
  const resetProjectForm = () => {
    projectForm.value = storeProjectForm.value;
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
    allProjectSelectOptions,
    allProjectTags,
    setAllProjectSelectOptions,
    setAllProjectTags,
    resetProjectForm,
  };
};

export default useProject;
