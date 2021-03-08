import {SetupContext} from 'vue';

const useHeader = (props: TableProps, ctx: SetupContext) => {
  const {emit} = ctx;

  const onExport = () => {
    emit('export');
  };

  const onHeaderChange = (column: TableColumn, sort: SortDirection, filter: FilterConditionData[]) => {
    emit('header-change', column, sort, filter);
  };

  return {
    // public variables and methods
    onExport,
    onHeaderChange,
  };
};

export default useHeader;
