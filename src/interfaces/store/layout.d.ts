interface LayoutStoreState {
  menuItems: MenuItem[];
}

interface MenuItem {
  path: string;
  title: string;
  icon?: string | string[];
  children?: MenuItem[];
}
