interface Services<T = any> {
  getById: (id: string) => Promise<ResponseWithData<T>>;
  create: (form: T) => Promise<ResponseWithData<T>>;
  updateById: (id: string, form: T) => Promise<ResponseWithData<T>>;
  deleteById: (id: string) => Promise<Response>;
  getList: () => Promise<ListResponseWithData<T>>;
  createList: (data: T[]) => Promise<ListResponseWithData<T>>;
  updateList: (ids: string[], data: T) => Promise<Response>;
  deleteList: (ids: string[]) => Promise<Response>;
}
