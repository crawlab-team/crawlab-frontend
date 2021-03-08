import {computed, ref, Ref, SetupContext} from 'vue';
import {Table} from 'element-plus/lib/el-table/src/table.type';
import {cloneArray, plainClone} from '@/utils/object';
import useStore from '@/components/table/store';

const useColumns = (props: TableProps, ctx: SetupContext, table: Ref<Table | undefined>) => {
  const {columns, selectedColumnKeys} = props;

  const {store} = useStore(props, ctx, table);

  const columnsTransferVisible = ref<boolean>(false);

  const internalSelectedColumnKeys = ref<string[]>([]);

  const columnsMap = computed<TableColumnsMap>(() => {
    const map = {} as TableColumnsMap;
    columns.forEach(c => {
      map[c.key] = c;
    });
    return map;
  });

  const columnCtxMap = computed<TableColumnCtxMap>(() => {
    const map = {} as TableColumnCtxMap;
    const columns = table.value?.store.states.columns.value || [];
    columns.forEach(c => {
      map[c.columnKey] = c;
    });
    return map;
  });

  const selectedColumns = computed<TableColumn[]>(() => {
    return internalSelectedColumnKeys.value.map((key, index) => {
      const d = columnsMap.value[key];
      d.index = index;
      return d;
    });
  });

  const onShowCustomizeColumns = () => {
    columnsTransferVisible.value = true;
  };

  const onHideColumnsTransfer = () => {
    columnsTransferVisible.value = false;
  };

  const updateColumns = (columnKeys: string[]) => {
    if (!store.value) return;
    internalSelectedColumnKeys.value = columnKeys;
    const columns = columnKeys.map(key => columnCtxMap.value[key]);
    store.value?.commit('setColumns', columns);
    store.value?.updateColumns();
  };

  const onColumnsChange = (value: string[]) => {
    updateColumns(value);
  };

  const initColumns = () => {
    if (selectedColumnKeys.length > 0) {
      internalSelectedColumnKeys.value = plainClone(selectedColumnKeys);
    } else {
      internalSelectedColumnKeys.value = cloneArray(columns.map(d => d.key));
    }
  };

  return {
    internalSelectedColumnKeys,
    columnsMap,
    columnsTransferVisible,
    selectedColumns,
    onShowCustomizeColumns,
    onHideColumnsTransfer,
    onColumnsChange,
    initColumns,
  };
};

export default useColumns;
