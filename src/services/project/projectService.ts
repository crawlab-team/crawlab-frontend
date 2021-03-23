import {Store} from 'vuex';

const useProjectService = (store: Store<RootStoreState>) => {
  // implementation
  const createProject = async (form: Project) => {
    // TODO: implement
  };

  const updateProject = async (form: Project) => {
    // TODO: implement
  };

  const deleteProject = async (id: string) => {
    // TODO: implement
  };

  return {
    // public variables and methods
    createProject,
    updateProject,
    deleteProject,
  };
};

export default useProjectService;
