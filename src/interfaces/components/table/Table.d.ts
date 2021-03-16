import {Ref, VNode} from 'vue';
import {AnyObject, Store, StoreMutations, TableColumnCtx} from 'element-plus/lib/el-table/src/table.type';

declare global {
  interface TableProps {
    data: TableData;
    columns: TableColumn[];
    selectedColumnKeys: string[];
    total: number;
    page: number;
    pageSize: number;
    rowKey: string;
    selectable: boolean;
    visibleButtons: BuiltInTableActionButtonName[];
  }

  interface TableColumn<T = any> {
    key: string;
    label: string;
    icon?: string | string[];
    width?: number | string;
    minWidth?: number | string;
    index?: number;
    align?: string;
    sortable?: boolean;
    fixed?: string | boolean;
    rowKey?: string;
    buttons?: TableColumnButton[];
    value?: TableValueFunction<T> | any;
    filterItems?: TableFilterItemsFunction | SelectOption[] | string[];
    disableTransfer?: boolean;
    defaultHidden?: boolean;
    hasFilter?: boolean;
  }

  type TableColumns<T = any> = TableColumn<T>[];

  interface TableAnyRowData {
    [key: string]: any;
  }

  type TableData<T = TableAnyRowData> = T[];

  interface TableColumnsMap<T = any> {
    [key: string]: TableColumn<T>;
  }

  interface TableColumnCtxMap {
    [key: string]: TableColumnCtx;
  }

  interface TableColumnButton {
    type?: string;
    size?: string;
    icon?: Icon | TableValueFunction;
    tooltip?: string;
    isHtml?: boolean;
    onClick?: TableButtonOnClickFunction;
  }

  type TableValueFunction<T = any> = (row: T, column?: TableColumn<T>) => VNode;
  type TableButtonOnClickFunction<T = any> = (row: T, column?: TableColumn<T>) => void;
  type TableFilterItemsFunction<T = any> = (filter?: TableHeaderDialogFilterData, column?: TableColumn<T>) => SelectOption[];

  interface TableStore extends Store {
    mutations: TableStoreMutations;
  }

  interface TableStoreMutations extends StoreMutations {
    setColumns: (states: TableStoreStates, columns: TableColumnCtx[]) => void;
  }

  interface TableStoreStates {
    _data: Ref<AnyObject[]>;
    _columns: Ref<TableColumnCtx[]>;
  }
}
