import {Ref, ref, SetupContext} from 'vue';
import {Table} from 'element-plus/lib/el-table/src/table.type';
import {ElMessageBox} from 'element-plus';

const useAction = (props: TableProps, ctx: SetupContext, table: Ref<Table | undefined>, actionFunctions: ListLayoutActionFunctions) => {
  const {emit} = ctx;

  const selection = ref<TableData>([]);

  const onSelectionChange = (value: TableData) => {
    selection.value = value;
    emit('selection-change', value);
  };

  const {
    getList,
    deleteList,
  } = actionFunctions;

  const onAdd = () => {
    emit('add');
  };

  const onEdit = () => {
    emit('edit', selection.value);
  };

  const onDelete = async () => {
    const res = await ElMessageBox.confirm('Are you sure to delete selected items?', 'Batch Delete', {
      type: 'warning',
      confirmButtonText: 'Delete',
      confirmButtonClass: 'el-button--danger',
    });
    if (!res) return;
    const ids = selection.value.map(d => d._id as string);
    await deleteList(ids);
    table.value?.store?.clearSelection();
    await getList();
    emit('delete', selection.value);
  };

  const onExport = () => {
    emit('export');
  };

  return {
    // public variables and methods
    selection,
    onSelectionChange,
    onAdd,
    onEdit,
    onDelete,
    onExport,
  };
};

export default useAction;
