import {Store} from 'vuex';

const useSpiderService = (store: Store<RootStoreState>): Services<Spider> => {
  const ns = 'spider';
  const {dispatch} = store;

  return {
    getById: (id: string) => dispatch(`${ns}/getById`, id),
    create: (form: Spider) => dispatch(`${ns}/create`, form),
    updateById: (id: string, form: Spider) => dispatch(`${ns}/updateById`, {id, form}),
    deleteById: (id: string) => dispatch(`${ns}/deleteById`, id),
    getList: () => dispatch(`${ns}/getList`),
    deleteList: (ids: string[]) => dispatch(`${ns}/deleteList`, ids),
  };
};

export default useSpiderService;
