interface TableHeaderDialogProps {
  visible: boolean;
  column: TableColumn;
  actionStatusMap: TableHeaderActionStatusMap;
  filter?: TableColumnFilter;
  sort?: string;
}

interface TableHeaderDialogValue {
  sort?: string;
  filter?: TableColumnFilter;
}

interface TableColumnFilter {
  [key: string]: any;
}
