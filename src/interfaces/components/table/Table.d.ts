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
    buttons?: TableColumnButton[];
    value?: TableValueFunction<T> | any;
    filterItems?: TableFilterItemsFunction | string[];
  }

  interface TableColumnButton {
    type?: string;
    size?: string;
    icon?: string | string[];
    tooltip?: string;
    isHtml?: boolean;
    onClick?: TableButtonOnClickFunction;
  }

  type TableValueFunction<T = any> = (row: T, column: TableColumn<T>) => VNode;
  type TableButtonOnClickFunction<T = any> = (row: T, column: TableColumn<T>) => void;
  type TableFilterItemsFunction<T = any> = (filter?: FilterConditionData[], column: TableColumn<T>) => string[];
}
