import {VNode} from 'vue';

declare global {
  interface TableProps {
    data: any[];
    columns: TableColumn[];
  }

  interface TableColumn<T = any> {
    key: string;
    label: string;
    width?: number | string;
    minWidth?: number | string;
    align?: string;
    sortable?: boolean;
    fixed?: string | boolean;
    rowKey?: string;
    value?: TableValueFunction<T> | any;
  }

  type TableValueFunction<T = any> = (row: T, column: TableColumn<T>) => VNode;
}
