interface CreateEditDialogProps {
  visible: boolean;
  type: CreateEditDialogType;
  width: string;
  batchTableColumns: TableColumns;
  confirmLoading?: boolean;
}

type CreateEditDialogType = 'create' | 'edit';
