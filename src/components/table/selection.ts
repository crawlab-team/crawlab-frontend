import {ref, SetupContext} from 'vue';

const useSelection = (props: TableProps, ctx: SetupContext) => {
  // implementation
  const {emit} = ctx;

  const selection = ref<TableData>([]);

  const onSelectionChange = (value: TableData) => {
    selection.value = value;
    emit('selection-change', value);
  };

  return {
    // public variables and methods
    selection,
    onSelectionChange,
  };
};

export default useSelection;
