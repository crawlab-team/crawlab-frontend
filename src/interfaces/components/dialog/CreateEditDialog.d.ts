interface CreateEditDialogProps {
  visible: boolean;
  type: CreateEditDialogType;
  width: string;
  batchTableColumns: TableColumns;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
}

type CreateEditDialogType = 'create' | 'edit';
