interface ListLayoutProps {
  navActions: ListActionGroup[];
  tableColumns: TableColumns;
  tableData: TableData;
  tableActionsPrefix: ListActionButton[];
  tableActionsSuffix: ListActionButton[];
  pagination: TablePagination;
  actionFunctions: ListLayoutActionFunctions;
}

interface ListActionGroup {
  name?: string;
  children?: ListActionButton[];
}

interface ListActionButton {
  buttonType: ButtonType;
  label?: string;
  tooltip?: string;
  size?: BasicSize;
  icon?: Icon;
  type?: BasicType;
  disabled?: boolean;
  onClick?: () => void;
}

interface ListLayoutActionFunctions {
  getList: () => void;
  editList: () => void;
  deleteList: (ids: string[]) => void;
}
