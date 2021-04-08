import {Ref} from 'vue';

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
    serviceEndpoint: string;
    navActions: ListActionGroup[];
    tableColumns: TableColumns<T>;
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
    setPagination: (pagination: TablePagination) => void;
    getList: () => Promise<void>;
    editList: () => Promise<void>;
    deleteList: (ids: string[]) => Promise<Response>;
  }
}
