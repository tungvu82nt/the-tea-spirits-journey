import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  homeLabel?: string;
  separator?: React.ReactNode;
  className?: string;
}

const defaultBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  '/admin/dashboard': [{ label: 'Tổng quan', path: '/admin/dashboard' }],
  '/admin/products': [
    { label: 'Tổng quan', path: '/admin/dashboard' },
    { label: 'Quản lý sản phẩm', path: '/admin/products' },
  ],
  '/admin/products/new': [
    { label: 'Tổng quan', path: '/admin/dashboard' },
    { label: 'Quản lý sản phẩm', path: '/admin/products' },
    { label: 'Thêm sản phẩm mới' },
  ],
  '/admin/categories': [
    { label: 'Tổng quan', path: '/admin/dashboard' },
    { label: 'Quản lý danh mục', path: '/admin/categories' },
  ],
  '/admin/inventory': [
    { label: 'Tổng quan', path: '/admin/dashboard' },
    { label: 'Quản lý tồn kho', path: '/admin/inventory' },
  ],
  '/admin/orders': [
    { label: 'Tổng quan', path: '/admin/dashboard' },
    { label: 'Quản lý đơn hàng', path: '/admin/orders' },
  ],
  '/admin/customers': [
    { label: 'Tổng quan', path: '/admin/dashboard' },
    { label: 'Quản lý khách hàng', path: '/admin/customers' },
  ],
  '/admin/analytics': [
    { label: 'Tổng quan', path: '/admin/dashboard' },
    { label: 'Phân tích dữ liệu', path: '/admin/analytics' },
  ],
  '/admin/content': [
    { label: 'Tổng quan', path: '/admin/dashboard' },
    { label: 'Quản lý nội dung', path: '/admin/content' },
  ],
  '/admin/settings': [
    { label: 'Tổng quan', path: '/admin/dashboard' },
    { label: 'Cài đặt hệ thống', path: '/admin/settings' },
  ],
};

const getDynamicBreadcrumbs = (pathname: string): BreadcrumbItem[] | null => {
  if (pathname.match(/^\/admin\/orders\/[^/]+$/)) {
    return [
      { label: 'Tổng quan', path: '/admin/dashboard' },
      { label: 'Quản lý đơn hàng', path: '/admin/orders' },
      { label: 'Chi tiết đơn hàng' },
    ];
  }
  if (pathname.match(/^\/admin\/customers\/[^/]+$/)) {
    return [
      { label: 'Tổng quan', path: '/admin/dashboard' },
      { label: 'Quản lý khách hàng', path: '/admin/customers' },
      { label: 'Chi tiết khách hàng' },
    ];
  }
  if (pathname.match(/^\/admin\/products\/[^/]+\/edit$/)) {
    return [
      { label: 'Tổng quan', path: '/admin/dashboard' },
      { label: 'Quản lý sản phẩm', path: '/admin/products' },
      { label: 'Chỉnh sửa sản phẩm' },
    ];
  }
  return null;
};

export const Breadcrumbs = ({
  items,
  homeLabel = 'Trang chủ',
  separator = <ChevronRight className="w-4 h-4" />,
  className,
}: BreadcrumbsProps): JSX.Element => {
  const location = useLocation();
  const breadcrumbItems = items || defaultBreadcrumbs[location.pathname] || getDynamicBreadcrumbs(location.pathname) || [];

  if (breadcrumbItems.length === 0) {
    return <></>;
  }

  return (
    <nav className={cn('flex items-center text-sm', className)} aria-label="Breadcrumbs">
      <Link
        to="/admin/dashboard"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">{homeLabel}</span>
      </Link>
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gray-400">{separator}</span>
          {item.path ? (
            <Link
              to={item.path}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
