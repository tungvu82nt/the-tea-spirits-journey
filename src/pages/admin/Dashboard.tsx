import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, ArrowRight, Plus, FileText, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changePercent: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

const StatCard = ({ title, value, change, changePercent, icon, trend }: StatCardProps): JSX.Element => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant="outline"
              className={cn(
                'gap-1',
                trend === 'up' && 'bg-green-50 text-green-700 border-green-200',
                trend === 'down' && 'bg-red-50 text-red-700 border-red-200',
                trend === 'neutral' && 'bg-gray-50 text-gray-700 border-gray-200'
              )}
            >
              {trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {trend === 'down' && <TrendingUp className="w-3 h-3 rotate-180" />}
              <span className="text-xs font-medium">{change}</span>
              <span className="text-xs text-gray-500">({changePercent})</span>
            </Badge>
          </div>
        </div>
        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
    </Card>
  );
};

const Dashboard = (): JSX.Element => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('week');
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    {
      title: t('admin.totalRevenue'),
      value: '¥128,450',
      change: '+¥12,340',
      changePercent: '+10.6%',
      icon: <DollarSign className="w-6 h-6" />,
      trend: 'up' as const,
    },
    {
      title: t('admin.totalOrders'),
      value: '1,234',
      change: '+156',
      changePercent: '+14.5%',
      icon: <ShoppingCart className="w-6 h-6" />,
      trend: 'up' as const,
    },
    {
      title: t('admin.totalCustomers'),
      value: '856',
      change: '+89',
      changePercent: '+11.6%',
      icon: <Users className="w-6 h-6" />,
      trend: 'up' as const,
    },
    {
      title: t('admin.productStock'),
      value: '2,456',
      change: '+234',
      changePercent: '+10.5%',
      icon: <Package className="w-6 h-6" />,
      trend: 'up' as const,
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-001234',
      customer: '张先生',
      date: '2024-01-15 14:30',
      total: '¥2,880',
      status: 'completed',
      items: 3,
    },
    {
      id: 'ORD-2024-001233',
      customer: '李女士',
      date: '2024-01-15 13:15',
      total: '¥1,680',
      status: 'processing',
      items: 2,
    },
    {
      id: 'ORD-2024-001232',
      customer: '王先生',
      date: '2024-01-15 12:45',
      total: '¥3,450',
      status: 'pending',
      items: 4,
    },
    {
      id: 'ORD-2024-001231',
      customer: '赵女士',
      date: '2024-01-15 11:30',
      total: '¥890',
      status: 'shipped',
      items: 1,
    },
    {
      id: 'ORD-2024-001230',
      customer: '陈先生',
      date: '2024-01-15 10:15',
      total: '¥1,280',
      status: 'cancelled',
      items: 2,
    },
  ];

  const getStatusBadge = (status: string): JSX.Element => {
    const configs = {
      completed: { label: t('admin.status.completed') || '已完成', className: 'bg-green-100 text-green-700' },
      processing: { label: t('admin.status.processing') || '处理中', className: 'bg-blue-100 text-blue-700' },
      pending: { label: t('admin.status.pending') || '待处理', className: 'bg-yellow-100 text-yellow-700' },
      shipped: { label: t('admin.status.shipped') || '已发货', className: 'bg-purple-100 text-purple-700' },
      cancelled: { label: t('admin.status.cancelled') || '已取消', className: 'bg-red-100 text-red-700' },
    };
    const config = configs[status as keyof typeof configs] || configs.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const quickActions = [
    { title: t('admin.addProduct') || '添加新产品', description: t('admin.addProductDesc') || '快速添加新产品到库存', icon: <Package className="w-5 h-5" />, href: '/admin/products/new' },
    { title: t('admin.exportReport') || '导出报表', description: t('admin.exportReportDesc') || '导出销售和库存报表', icon: <FileText className="w-5 h-5" />, href: '/admin/analytics/export' },
    { title: t('admin.viewOrders') || '查看订单', description: t('admin.viewOrdersDesc') || '查看所有待处理订单', icon: <ShoppingCart className="w-5 h-5" />, href: '/admin/orders?status=pending' },
    { title: t('admin.systemSettings') || '系统设置', description: t('admin.systemSettingsDesc') || '配置系统参数和选项', icon: <RefreshCw className="w-5 h-5" />, href: '/admin/settings' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.overview')}</h1>
          <p className="text-sm text-gray-600 mt-1">{t('admin.overviewDesc')}</p>
        </div>
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
          <TabsList>
            <TabsTrigger value="today">{t('admin.timeRange.today')}</TabsTrigger>
            <TabsTrigger value="week">{t('admin.timeRange.week')}</TabsTrigger>
            <TabsTrigger value="month">{t('admin.timeRange.month')}</TabsTrigger>
            <TabsTrigger value="year">{t('admin.timeRange.year')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t('admin.salesTrend')}</h2>
              <p className="text-sm text-gray-600 mt-1">{t('admin.salesTrendDesc')}</p>
            </div>
            <Button variant="outline" size="sm">
              {t('admin.viewDetails')}
            </Button>
          </div>

          <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">{t('admin.chartArea')}</p>
              <p className="text-xs text-gray-500">{t('admin.chartAreaDesc')}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.quickActions')}</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{action.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{t('admin.recentOrders')}</h2>
            <p className="text-sm text-gray-600 mt-1">{t('admin.recentOrdersDesc')}</p>
          </div>
          <Link to="/admin/orders">
            <Button variant="outline" size="sm" className="gap-2">
              {t('admin.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('admin.orderId')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('admin.customer')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('admin.date')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('admin.total')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('admin.orderStatus')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.total}</td>
                  <td className="py-3 px-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/admin/orders/${order.id}`}>
                      <Button variant="ghost" size="sm">
                        {t('admin.view')}
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
