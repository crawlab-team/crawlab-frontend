interface FileNavItem {
  id?: string;
  is_dir?: boolean;
  path?: string;
  name?: string;
  extension?: string;
  children?: FileNavItem[];
}
