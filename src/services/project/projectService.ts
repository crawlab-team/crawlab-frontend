import {Store} from 'vuex';

const useProjectService = (store: Store<RootStoreState>): Services<Project> => {
  const ns = 'project';
  // const {project: state} = store.state;
  const {dispatch} = store;

  return {
    getById: (id: string) => dispatch(`${ns}/getById`, id),
    create: (form: Project) => dispatch(`${ns}/create`, form),
    updateById: (id: string, form: Project) => dispatch(`${ns}/updateById`, {id, form}),
    deleteById: (id: string) => dispatch(`${ns}/deleteById`, id),
    getList: () => dispatch(`${ns}/getList`),
    deleteList: (ids: string[]) => dispatch(`${ns}/deleteList`, ids),
  };
};

export default useProjectService;
