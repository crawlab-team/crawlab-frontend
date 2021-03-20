interface ListLayoutProps {
  navActions: ListActionGroup[];
  tableColumns: TableColumns;
  tableData: TableData;
  tableTotal: number;
  tableActionsPrefix: ListActionButton[];
  tableActionsSuffix: ListActionButton[];
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
