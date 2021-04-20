import {Ref} from 'vue';
import Table from '@/components/table/Table.vue';

declare global {
  interface ListLayoutProps {
    navActions: ListActionGroup[];
    tableColumns: TableColumns;
    tableData: TableData;
    tablePagination: TablePagination;
    tableActionsPrefix: ListActionButton[];
    tableActionsSuffix: ListActionButton[];
    actionFunctions: ListLayoutActionFunctions;
  }

  interface ListLayoutComponentData<T = any> {
    navActions: ListActionGroup[];
    tableColumns: TableColumns<T>;
    tableData: Ref<TableData<T>>;
    tableTotal: Ref<number>;
    tablePagination: Ref<TablePagination>;
    actionFunctions: ListLayoutActionFunctions;
  }

  interface UseListOptions<T> {
    navActions: ListActionGroup[];
    tableColumns: TableColumns<T>;
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
    disabled?: boolean | ListActionButtonDisabledFunc;
    onClick?: () => void;
  }

  interface ListLayoutActionFunctions {
    setPagination: (pagination: TablePagination) => void;
    getList: () => Promise<void>;
    getAll: () => Promise<void>;
    deleteList: (ids: string[]) => Promise<Response>;
  }

  type ListActionButtonDisabledFunc = (table: typeof Table) => boolean;
}
