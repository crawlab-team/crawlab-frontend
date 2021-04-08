interface Services<T = any> {
  getById: (id: string) => Promise<ResponseWithData<T>>;
  create: (form: T) => Promise<ResponseWithData<T>>;
  updateById: (id: string, form: T) => Promise<ResponseWithData<T>>;
  deleteById: (id: string) => Promise<Response>;
  getList: () => Promise<ListResponseWithData<T>>;
  deleteList: (ids: string[]) => Promise<Response>;
  // TODO: updateList
  // TODO: createList
}
