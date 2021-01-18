interface FileNavItem {
  id?: string;
  is_dir?: boolean;
  path?: string;
  name?: string;
  extension?: string;
  children?: FileNavItem[];
}

interface FileEditorStyle {
  backgroundColor?: string;
  color?: string;
  height?: string;
  backgroundColorGutters?: string;
}
