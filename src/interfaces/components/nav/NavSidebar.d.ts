interface NavSidebar {
  scroll: (id: string) => void;
}

interface NavSidebarProps {
  items: NavItem[];
  activeKey?: string;
  showActions?: boolean;
}

interface NavItem<T = any> {
  id: string;
  title: string;
  subtitle?: string;
  data?: T;
}
