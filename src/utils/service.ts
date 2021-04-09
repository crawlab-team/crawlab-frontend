import {Store} from 'vuex';

export const getDefaultService = <T>(ns: string, store: Store<RootStoreState>): Services<T> => {
  const {dispatch} = store;

  return {
    getById: (id: string) => dispatch(`${ns}/getById`, id),
    create: (form: Project) => dispatch(`${ns}/create`, form),
    updateById: (id: string, form: T) => dispatch(`${ns}/updateById`, {id, form}),
    deleteById: (id: string) => dispatch(`${ns}/deleteById`, id),
    getList: () => dispatch(`${ns}/getList`),
    createList: (data: T[]) => dispatch(`${ns}/createList`, data),
    updateList: (ids: string[], data: T) => dispatch(`${ns}/updateList`, {ids, data}),
    deleteList: (ids: string[]) => dispatch(`${ns}/deleteList`, ids),
  };
};
