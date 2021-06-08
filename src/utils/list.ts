import {onBeforeMount, onBeforeUnmount, onMounted, Ref} from 'vue';
import {Store} from 'vuex';

export const getDefaultUseListOptions = <T = any>(navActions: Ref<ListActionGroup[]>, tableColumns: Ref<TableColumns<T>>): UseListOptions<T> => {
  return {
    navActions,
    tableColumns,
  };
};

export const initListComponent = (ns: ListStoreNamespace, store: Store<RootStoreState>, allListNamespaces?: ListStoreNamespace[]) => {
  if (!allListNamespaces) allListNamespaces = [];

  // get all list
  onBeforeMount(async () => {
    await Promise.all(allListNamespaces?.map(ns => store.dispatch(`${ns}/getAllList`)) || []);
  });

  // auto update
  let autoUpdateHandle: NodeJS.Timeout;
  onMounted(() => {
    autoUpdateHandle = setInterval(async () => {
      await store.dispatch(`${ns}/getList`);
    }, 5000);
  });
  onBeforeUnmount(() => {
    clearInterval(autoUpdateHandle);
  });
};
