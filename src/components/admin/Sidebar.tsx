import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings as SettingsIcon, FileText, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  title: string;
  icon: any;
  path: string;
  children?: MenuItem[];
}

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({ collapsed = false, onToggle }: SidebarProps): JSX.Element => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      title: '概览',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      children: [],
    },
    {
      title: '产品管理',
      icon: Package,
      path: '/admin/products',
      children: [
        { title: '产品列表', path: '/admin/products', icon: Layers },
        { title: '分类管理', path: '/admin/categories', icon: FileText },
        { title: '库存管理', path: '/admin/inventory', icon: FileText },
      ],
    },
    {
      title: '订单管理',
      icon: ShoppingCart,
      path: '/admin/orders',
      children: [
        { title: '订单列表', path: '/admin/orders', icon: FileText },
        { title: '退款管理', path: '/admin/refunds', icon: FileText },
      ],
    },
    {
      title: '客户管理',
      icon: Users,
      path: '/admin/customers',
      children: [
        { title: '客户列表', path: '/admin/customers', icon: FileText },
        { title: '会员管理', path: '/admin/members', icon: FileText },
      ],
    },
    {
      title: '数据分析',
      icon: BarChart3,
      path: '/admin/analytics',
      children: [
        { title: '销售报表', path: '/admin/analytics/sales', icon: FileText },
        { title: '产品分析', path: '/admin/analytics/products', icon: FileText },
        { title: '客户分析', path: '/admin/analytics/customers', icon: FileText },
      ],
    },
    {
      title: '内容管理',
      icon: FileText,
      path: '/admin/content',
      children: [
        { title: '轮播图', path: '/admin/content/banners', icon: FileText },
        { title: '文章管理', path: '/admin/content/articles', icon: FileText },
        { title: '页面设置', path: '/admin/content/pages', icon: FileText },
      ],
    },
    {
      title: '系统设置',
      icon: SettingsIcon,
      path: '/admin/settings',
      children: [
        { title: '基本设置', path: '/admin/settings/general', icon: FileText },
        { title: '用户管理', path: '/admin/settings/users', icon: FileText },
        { title: '权限管理', path: '/admin/settings/permissions', icon: FileText },
        { title: '操作日志', path: '/admin/settings/logs', icon: FileText },
      ],
    },
  ];

  const isActive = (path: string): boolean => {
    if (path.includes(':')) {
      const basePath = path.split('/:')[0];
      return location.pathname.startsWith(basePath);
    }
    return location.pathname === path;
  };

  const toggleExpand = (title: string): void => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const MenuItemComponent = ({ item, level = 0 }: { item: MenuItem; level?: number }): JSX.Element => {
    const isExpanded = expandedItems.has(item.title);
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.path);

    return (
      <li>
        <Link
          to={item.path}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpand(item.title);
            }
          }}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            level > 0 && 'ml-4',
            active
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          )}
        >
          <item.icon className={cn('w-5 h-5 flex-shrink-0', collapsed && 'mx-auto')} />
          {!collapsed && (
            <>
              <span className="flex-1 text-sm font-medium">{item.title}</span>
              {hasChildren && (
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isExpanded && 'rotate-180'
                  )}
                />
              )}
            </>
          )}
        </Link>

        {!collapsed && hasChildren && isExpanded && (
          <ul className="mt-1 space-y-1">
            {item.children.map((child) => (
              <MenuItemComponent key={child.path} item={child} level={1} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside
      className={cn(
        'bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col h-full',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">雅</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm">雅韵茶酒</span>
              <span className="text-xs text-slate-400">管理后台</span>
            </div>
          )}
        </div>
        {onToggle && (
          <button
            onClick={onToggle}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight
              className={cn(
                'w-5 h-5 transition-transform duration-300',
                collapsed && 'rotate-180'
              )}
            />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <MenuItemComponent key={item.path} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};
