interface DialogProps {
  visible: boolean;
  modalClass?: string;
  title?: string;
  width?: string;
  zIndex?: number;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
}

type DialogKey = 'create' | 'edit' | 'clone' | 'delete';

interface DialogVisible {
  createEdit: boolean;
  clone: boolean;
  delete: boolean;
}
