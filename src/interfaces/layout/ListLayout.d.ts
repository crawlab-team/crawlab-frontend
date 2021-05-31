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
    navActions?: Ref<ListActionGroup[]>;
    tableColumns?: Ref<TableColumns<T>>;
    tableData: Ref<TableData<T>>;
    tableTotal: Ref<number>;
    tablePagination: Ref<TablePagination>;
    actionFunctions: ListLayoutActionFunctions;
  }

  interface UseListOptions<T> {
    navActions: Ref<ListActionGroup[]>;
    tableColumns: Ref<TableColumns<T>>;
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
    deleteByIdConfirm: (row: BaseModel) => Promise<void>;
  }

  type ListActionButtonDisabledFunc = (table: typeof Table) => boolean;
}
