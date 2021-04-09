import {computed, readonly} from 'vue';
import {Store} from 'vuex';
import {isDuplicated} from '@/utils/array';
import useForm from '@/components/form/form';
import useProjectService from '@/services/project/projectService';
import {getDefaultFormComponentData} from '@/utils/form';

// get new project
const getNewProject = (): Project => {
  return {
    tags: [],
  };
};

// form component data
const formComponentData = getDefaultFormComponentData<Project>(getNewProject);

const useProject = (store: Store<RootStoreState>) => {
  // store
  const storeNamespace = 'project';
  const state = store.state.project;

  // project form rules
  const projectFormRules = readonly<FormRules>({
    tags: {
      validator: ((_, value, callback) => {
        if (isDuplicated(value)) {
          return callback('Duplicated tags');
        }
        callback();
      }),
    },
  });

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
    ...useForm('project', store, useProjectService(store), formComponentData),
    projectFormRules,
    allProjectSelectOptions,
    allProjectTags,
    setAllProjectSelectOptions,
    setAllProjectTags,
  };
};

export default useProject;
