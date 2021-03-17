import {computed} from 'vue';
import {Store} from 'vuex';

const useProject = (store: Store<RootStoreState>) => {
  // implementation
  const storeNamespace = 'project';
  const {project: state} = store.state as RootStoreState;

  // all project select options
  const allProjectSelectOptions = computed<SelectOption[]>(() => state.allProjectSelectOptions);
  const setAllProjectSelectOptions = (options: SelectOption[]) => {
    store.commit(`${storeNamespace}/setAllProjectSelectOptions`, options);
  };

  // all project tags
  const allProjectTags = computed<SelectOption[]>(() => state.allProjectTags.map(tag => {
    return {
      label: tag,
      value: tag,
    };
  }));
  const setAllProjectTags = (tags: string[]) => {
    store.commit(`${storeNamespace}/setAllProjectTags`, tags);
  };

  return {
    // public variables and methods
    allProjectSelectOptions,
    allProjectTags,
    setAllProjectSelectOptions,
    setAllProjectTags,
  };
};

export default useProject;
