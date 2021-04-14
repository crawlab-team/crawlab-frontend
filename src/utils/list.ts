export const getDefaultUseListOptions = <T = any>(navActions: ListActionGroup[], tableColumns: TableColumns<T>): UseListOptions<T> => {
  return {
    navActions,
    tableColumns,
  };
};
