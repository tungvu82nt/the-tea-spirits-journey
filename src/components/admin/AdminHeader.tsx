import { useState } from 'react';
import { Bell, Search, User, LogOut, ChevronDown, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface AdminHeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

export const AdminHeader = ({
  title = '管理后台',
  onSearch,
  onToggleSidebar,
  sidebarCollapsed = false,
}: AdminHeaderProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden text-gray-600"
          >
            <Search className="w-5 h-5" />
          </Button>

          <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">
            {title}
          </h1>

          {onSearch && (
            <form onSubmit={handleSearch} className="relative max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="搜索产品、订单、客户..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </form>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative text-gray-600">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                    管
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">管理员</span>
                  <span className="text-xs text-gray-500">admin@yayun.com</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">个人资料</span>
                  <span className="text-xs text-gray-500">查看和编辑个人信息</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-600" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">账户设置</span>
                  <span className="text-xs text-gray-500">密码、通知等</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <LogOut className="w-4 h-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">退出登录</span>
                  <span className="text-xs text-red-500">安全退出系统</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
