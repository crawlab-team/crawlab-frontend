import {SetupContext} from 'vue';

const useSelection = (props: TableProps, ctx: SetupContext) => {
  // implementation
  const {emit} = ctx;

  const onSelectionChange = (value: any[]) => {
    emit('selection-change', value);
  };

  return {
    // public variables and methods
    onSelectionChange,
  };
};

export default useSelection;
