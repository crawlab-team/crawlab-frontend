import useRequest from '@/services/request';

export const useService = <T = any>(endpoint: string) => {
  const {
    get,
    put,
    post,
    del,
    getList,
    putList,
    postList,
    delList,
  } = useRequest();

  return {
    get: async (id: string) => {
      return await get<T>(`${endpoint}/${id}`);
    },
    create: async (form: T) => {
      return await put<T>(`${endpoint}`, form);
    },
    update: async (id: string, form: T) => {
      return await post<T>(`${endpoint}/${id}`, form);
    },
    del: async (id: string) => {
      return await del(`${endpoint}/${id}`);
    },
    getList: async (params?: ListRequestParams) => {
      return await getList<T>(`${endpoint}`, params);
    },
    createList: async (data: T[]) => {
      return await putList<T>(`${endpoint}`, data);
    },
    updateList: async (ids: string[], data: T) => {
      return await postList<T>(`${endpoint}`, {ids, data});
    },
    deleteList: async (ids: string[]) => {
      return await delList(`${endpoint}`, {ids});
    },
  };
};
