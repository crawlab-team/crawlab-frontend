import {SetupContext} from 'vue';

const useAction = (props: TableProps, ctx: SetupContext) => {
  const {emit} = ctx;

  const onAdd = () => {
    emit('add');
  };

  const onEdit = () => {
    emit('edit');
  };

  const onDelete = () => {
    emit('delete');
  };

  const onExport = () => {
    emit('export');
  };

  return {
    // public variables and methods
    onAdd,
    onEdit,
    onDelete,
    onExport,
  };
};

export default useAction;
