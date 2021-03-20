interface DialogProps {
  visible: boolean;
  title?: string;
  width?: string;
  zIndex?: number;
}

type DialogKey = 'create' | 'edit' | 'clone';

interface DialogVisible {
  create: boolean;
  clone: boolean;
  edit: boolean;
}
