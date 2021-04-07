import {Module, MutationTree} from 'vuex';

declare global {
  interface ProjectStoreModule extends Module<ProjectStoreState, RootStoreState> {
    // getters: ProjectStoreGetters;
    mutations: ProjectStoreMutations;
  }

  interface ProjectStoreState {
    allProjectSelectOptions: SelectOption[];
    allProjectTags: string[];
    dialogVisible: DialogVisible;
    projectForm: Project;
    projectList: Project[];
    projectListTotal: number;
    projectListPagination: TablePagination;
  }

  // interface ProjectStoreGetters extends GetterTree<ProjectStoreState, RootStoreState> {
  // }

  interface ProjectStoreMutations extends MutationTree<ProjectStoreState> {
    setAllProjectSelectOptions: StoreMutation<ProjectStoreState, SelectOption[]>;
    setAllProjectTags: StoreMutation<ProjectStoreState, string[]>;
    showDialog: StoreMutation<ProjectStoreState, DialogKey>;
    hideDialog: StoreMutation<ProjectStoreState, DialogKey>;
    resetDialogs: StoreMutation<ProjectStoreState>;
    setProjectForm: StoreMutation<ProjectStoreState, Project>;
    setProjectList: StoreMutation<ProjectStoreState, TableDataWithTotal<Project>>;
    resetProjectList: StoreMutation<ProjectStoreState>;
    setProjectPaginationData: StoreMutation<ProjectStoreState, TablePagination>;
  }
}
