interface DialogProps {
  visible: boolean;
  modalClass?: string;
  title?: string;
  width?: string;
  zIndex?: number;
  confirmLoading?: boolean;
}

type DialogKey = 'create' | 'edit' | 'clone' | 'delete';

interface DialogVisible {
  createEdit: boolean;
  clone: boolean;
  delete: boolean;
}
