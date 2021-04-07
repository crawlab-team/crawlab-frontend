import {Store} from 'vuex';
import useRequest from '@/services/request';

const useProjectService = (store: Store<RootStoreState>) => {
  const {
    get,
    put,
    post,
    del,
    getList,
    delList,
  } = useRequest();
  const getProjectById = async (id: string) => {
    return await get<Project>(`/projects/${id}`);
  };

  const createProject = async (form: Project) => {
    return await put('/projects', form);
  };

  const updateProject = async (form: Project) => {
    return await post(`/projects/${form._id}`, form);
  };

  const deleteProject = async (id: string) => {
    return await del(`/projects/${id}`);
  };

  const getProjectList = async (params?: ListRequestParams) => {
    return await getList<Project>('/projects', params);
  };

  const deleteProjectList = async (ids: string[]) => {
    return await delList('/projects', {
      ids,
    });
  };

  return {
    // public variables and methods
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectList,
    deleteProjectList,
  };
};

export default useProjectService;
