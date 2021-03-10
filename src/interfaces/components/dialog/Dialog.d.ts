interface DialogProps {
  visible: boolean;
  title?: string;
  width?: string;
  zIndex?: number;
}

type DialogKey = 'create' | 'edit' | 'clone' | 'run';
