type ProjectStoreModule = BaseModule<ProjectStoreState, ProjectStoreMutations, any, ProjectStoreActions>;

interface ProjectStoreState extends BaseStoreState<Project> {
  allProjectSelectOptions: SelectOption[];
  allProjectTags: string[];
}

// interface ProjectStoreGetters extends GetterTree<ProjectStoreState, RootStoreState> {
// }

interface ProjectStoreMutations extends BaseStoreMutations<Project> {
  setAllProjectSelectOptions: StoreMutation<ProjectStoreState, SelectOption[]>;
  setAllProjectTags: StoreMutation<ProjectStoreState, string[]>;
}

interface ProjectStoreActions extends BaseStoreActions<Project> {
  getAllProjectSelectOptions: StoreAction<ProjectStoreState>;
  getAllProjectTags: StoreAction<ProjectStoreState>;
}
