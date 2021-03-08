import {computed, ref, Ref, SetupContext} from 'vue';
import {Table, TableColumnCtx} from 'element-plus/lib/el-table/src/table.type';
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

  const columnsCtx = computed<TableColumnCtx[]>(() => {
    return table.value?.store.states.columns.value || [];
  });

  const columnCtxMap = computed<TableColumnCtxMap>(() => {
    const map = {} as TableColumnCtxMap;
    columnsCtx.value.forEach(c => {
      map[c.columnKey] = c;
    });
    return map;
  });

  const selectedColumns = computed<TableColumn[]>(() => {
    return internalSelectedColumnKeys.value.map(key => columnsMap.value[key]);
  });

  const onShowCustomizeColumns = () => {
    columnsTransferVisible.value = true;
  };

  const onHideColumnsTransfer = () => {
    columnsTransferVisible.value = false;
  };

  const isColumnsEqual = (columnKeys: string[]) => {
    const columnKeysSorted = cloneArray(columnKeys).sort().join(',');
    const internalSelectedColumnKeysSorted = cloneArray(internalSelectedColumnKeys.value).sort().join(',');
    return columnKeysSorted === internalSelectedColumnKeysSorted;
  };

  const updateColumns = (columnKeys: string[]) => {
    if (!store.value) return;

    // selection column keys
    const selectionColumnKeys = columnsCtx.value.filter(d => d.type === 'selection').map(d => d.columnKey);

    // column keys
    const columns = selectionColumnKeys.concat(columnKeys).map(key => columnCtxMap.value[key]);

    if (isColumnsEqual(columnKeys)) {
      store.value?.commit('setColumns', columns);
      store.value?.updateColumns();
    }
    internalSelectedColumnKeys.value = columnKeys;
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
