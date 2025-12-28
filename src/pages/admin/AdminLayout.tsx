import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Bell, LogOut, User, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { cn } from '@/lib/utils';

export const AdminLayout = (): JSX.Element => {
  const { t } = useTranslation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'admin.dashboard',
      icon: Menu,
      path: '/admin/dashboard',
      children: [],
    },
    {
      title: 'admin.products',
      icon: ChevronRight,
      path: '/admin/products',
      children: [
        { title: 'admin.manageProducts', path: '/admin/products' },
        { title: 'admin.manageCategories', path: '/admin/categories' },
        { title: 'admin.productStock', path: '/admin/inventory' },
      ],
    },
    {
      title: 'admin.orders',
      icon: ChevronRight,
      path: '/admin/orders',
      children: [
        { title: 'admin.manageOrders', path: '/admin/orders' },
        { title: 'admin.manageRefunds', path: '/admin/refunds' },
      ],
    },
    {
      title: 'admin.customers',
      icon: ChevronRight,
      path: '/admin/customers',
      children: [
        { title: 'admin.manageCustomers', path: '/admin/customers' },
        { title: 'admin.manageMembers', path: '/admin/members' },
      ],
    },
    {
      title: 'admin.analytics',
      icon: ChevronRight,
      path: '/admin/analytics',
      children: [
        { title: 'admin.revenueByMonth', path: '/admin/analytics/sales' },
        { title: 'admin.topProducts', path: '/admin/analytics/products' },
        { title: 'admin.customerDetails', path: '/admin/analytics/customers' },
      ],
    },
    {
      title: 'admin.manageContent',
      icon: ChevronRight,
      path: '/admin/content',
      children: [
        { title: 'admin.manageBanners', path: '/admin/content/banners' },
        { title: 'admin.manageArticles', path: '/admin/content/articles' },
        { title: 'admin.managePages', path: '/admin/content/pages' },
      ],
    },
    {
      title: 'admin.settings',
      icon: ChevronRight,
      path: '/admin/settings',
      children: [
        { title: 'admin.generalSettings', path: '/admin/settings/general' },
        { title: 'admin.manageUsers', path: '/admin/settings/users' },
        { title: 'admin.managePermissions', path: '/admin/settings/permissions' },
        { title: 'admin.activityLogs', path: '/admin/settings/logs' },
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

  const handleLogout = (): void => {
    if (confirm(t('admin.confirmLogout') || 'Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <aside
          className={cn(
            'bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col',
            sidebarCollapsed ? 'w-20' : 'w-64',
            'hidden lg:flex'
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">雅</span>
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{t('admin.appName')}</span>
                  <span className="text-xs text-slate-400">{t('admin.system')}</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    )}
                  >
                    <item.icon className={cn('w-5 h-5 flex-shrink-0', sidebarCollapsed && 'mx-auto')} />
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium">{t(item.title as any)}</span>
                        {item.children.length > 0 && (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </Link>

                  {!sidebarCollapsed && item.children.length > 0 && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <Link
                            to={child.path}
                            className={cn(
                              'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm',
                              isActive(child.path)
                                ? 'bg-blue-700 text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            )}
                          >
                            <span>{t(child.title as any)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-slate-700">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start gap-2 text-slate-400 hover:text-red-400 hover:bg-red-950/20"
            >
              <LogOut className="w-4 h-4" />
              <span className={cn('text-sm', sidebarCollapsed && 'hidden')}>{t('admin.logout')}</span>
            </Button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
                <div className="flex flex-col">
                  <h1 className="text-xl font-semibold text-gray-900">
                    {menuItems.find((item) => item.children.some((child) => isActive(child.path)))?.title
                      ? t(menuItems.find((item) => item.children.some((child) => isActive(child.path)))?.title as any)
                      : menuItems.find((item) => isActive(item.path))?.title
                      ? t(menuItems.find((item) => isActive(item.path))?.title as any)
                      : t('admin.system')}
                  </h1>
                  <Breadcrumbs className="mt-1" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-600 text-white">管</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{t('admin.adminAccount')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                      <LogOut className="w-4 h-4" />
                      {t('admin.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <Outlet />
          </main>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900 text-white p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-sm font-medium">{t(item.title as any)}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
