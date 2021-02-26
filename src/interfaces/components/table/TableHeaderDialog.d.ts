interface TableHeaderDialogProps {
  visible: boolean;
  column: TableColumn;
  actionStatusMap: TableHeaderActionStatusMap;
  filter?: TableHeaderDialogFilterData;
  sort?: string;
}

interface TableHeaderDialogValue {
  sort?: SortDirection;
  filter?: TableHeaderDialogFilterData;
}
