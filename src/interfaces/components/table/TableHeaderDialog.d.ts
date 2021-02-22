interface TableHeaderDialogProps {
  visible: boolean;
  column: TableColumn;
  actionStatusMap: TableHeaderActionStatusMap;
  filter?: TableColumnFilter;
  sort?: string;
}

interface TableColumnFilter {
  [key: string]: any;
}
