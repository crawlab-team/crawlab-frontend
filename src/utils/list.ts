import {Ref} from 'vue';

export const getDefaultUseListOptions = <T = any>(navActions: Ref<ListActionGroup[]>, tableColumns: Ref<TableColumns<T>>): UseListOptions<T> => {
  return {
    navActions,
    tableColumns,
  };
};
