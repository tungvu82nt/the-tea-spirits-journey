import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { cn } from '@/lib/utils';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface TopProduct {
  id: string;
  name: string;
  category: string;
  sold: number;
  revenue: number;
  growth: number;
}

interface TopCustomer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  growth: number;
}

const mockSalesData: SalesData[] = [
  { date: '2024-12-17', revenue: 2500000, orders: 12, customers: 8 },
  { date: '2024-12-18', revenue: 3200000, orders: 15, customers: 10 },
  { date: '2024-12-19', revenue: 2800000, orders: 14, customers: 9 },
  { date: '2024-12-20', revenue: 4100000, orders: 20, customers: 12 },
  { date: '2024-12-21', revenue: 3500000, orders: 17, customers: 11 },
  { date: '2024-12-22', revenue: 3800000, orders: 18, customers: 13 },
  { date: '2024-12-23', revenue: 4200000, orders: 22, customers: 14 },
];

const mockTopProducts: TopProduct[] = [
  { id: '1', name: 'Trà Sencha Premium', category: 'Trà xanh', sold: 156, revenue: 39000000, growth: 15.2 },
  { id: '2', name: 'Trà Puerh 2018', category: 'Trà đen', sold: 98, revenue: 44100000, growth: 8.7 },
  { id: '3', name: 'Trà Matcha Nhật Bản', category: 'Trà xanh', sold: 87, revenue: 24360000, growth: -3.2 },
  { id: '4', name: 'Trà Oolong Đài Loan', category: 'Trà ô long', sold: 76, revenue: 24320000, growth: 12.5 },
  { id: '5', name: 'Trà Hoa Cúc', category: 'Trà thảo mộc', sold: 65, revenue: 9750000, growth: 5.8 },
];

const mockTopCustomers: TopCustomer[] = [
  { id: '1', name: 'Trần Thị Bình', email: 'tranthi.binh@email.com', orders: 8, spent: 8900000, growth: 25.3 },
  { id: '2', name: 'Nguyễn Văn An', email: 'nguyenvan.an@email.com', orders: 5, spent: 4500000, growth: 18.7 },
  { id: '3', name: 'Lê Văn Cường', email: 'levan.cuong@email.com', orders: 3, spent: 2100000, growth: -5.2 },
  { id: '4', name: 'Phạm Thị Dung', email: 'phamthi.dung@email.com', orders: 2, spent: 1500000, growth: 32.1 },
  { id: '5', name: 'Hoàng Văn Em', email: 'hoangvan.em@email.com', orders: 1, spent: 688000, growth: 0 },
];

export const Analytics = (): JSX.Element => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(false);

  const totalRevenue = useMemo(() => mockSalesData.reduce((sum, data) => sum + data.revenue, 0), []);
  const totalOrders = useMemo(() => mockSalesData.reduce((sum, data) => sum + data.orders, 0), []);
  const totalCustomers = useMemo(() => mockSalesData.reduce((sum, data) => sum + data.customers, 0), []);
  const averageOrderValue = useMemo(() => (totalRevenue / totalOrders).toFixed(0), [totalRevenue, totalOrders]);

  const previousRevenue = useMemo(() => totalRevenue * 0.85, [totalRevenue]);
  const previousOrders = useMemo(() => totalOrders * 0.9, [totalOrders]);
  const previousCustomers = useMemo(() => totalCustomers * 0.8, [totalCustomers]);

  const revenueGrowth = useMemo(() => {
    const growth = ((totalRevenue - previousRevenue) / previousRevenue) * 100;
    return growth.toFixed(1);
  }, [totalRevenue, previousRevenue]);

  const ordersGrowth = useMemo(() => {
    const growth = ((totalOrders - previousOrders) / previousOrders) * 100;
    return growth.toFixed(1);
  }, [totalOrders, previousOrders]);

  const customersGrowth = useMemo(() => {
    const growth = ((totalCustomers - previousCustomers) / previousCustomers) * 100;
    return growth.toFixed(1);
  }, [totalCustomers, previousCustomers]);

  const handleExport = (): void => {
    const csvContent = [
      ['Ngày', 'Doanh thu', 'Đơn hàng', 'Khách hàng'],
      ...mockSalesData.map((data) => [
        data.date,
        data.revenue.toLocaleString('vi-VN'),
        data.orders,
        data.customers,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bao-cao-doanh-so-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const StatCard = ({
    title,
    value,
    previousValue,
    growth,
    icon: Icon,
    color,
  }: {
    title: string;
    value: string;
    previousValue: number;
    growth: string;
    icon: typeof DollarSign;
    color: string;
  }): JSX.Element => {
    const isPositive = parseFloat(growth) >= 0;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn('p-3 rounded-lg', color)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={cn('flex items-center gap-1', isPositive ? 'text-green-600' : 'text-red-600')}>
            {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span className="text-sm font-medium">{Math.abs(parseFloat(growth))}%</span>
          </div>
        </div>
        <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-1">
          {isPositive ? 'Tăng' : 'Giảm'} so với kỳ trước ({previousValue.toLocaleString('vi-VN')})
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.analytics.title')}</h1>
          <Breadcrumbs />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors',
                  dateRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                {range === '7d' ? t('admin.analytics.last7Days') : range === '30d' ? t('admin.analytics.last30Days') : range === '90d' ? t('admin.analytics.last90Days') : t('admin.analytics.last1Year')}
              </button>
            ))}
          </div>
          <Button onClick={handleExport} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            {t('admin.analytics.exportReport')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('admin.analytics.totalRevenue')}
          value={`${totalRevenue.toLocaleString('vi-VN')} đ`}
          previousValue={previousRevenue}
          growth={revenueGrowth}
          icon={DollarSign}
          color="bg-blue-600"
        />
        <StatCard
          title={t('admin.analytics.totalOrders')}
          value={totalOrders.toString()}
          previousValue={previousOrders}
          growth={ordersGrowth}
          icon={ShoppingCart}
          color="bg-green-600"
        />
        <StatCard
          title={t('admin.analytics.newCustomers')}
          value={totalCustomers.toString()}
          previousValue={previousCustomers}
          growth={customersGrowth}
          icon={Users}
          color="bg-purple-600"
        />
        <StatCard
          title={t('admin.analytics.avgOrderValue')}
          value={`${averageOrderValue} đ`}
          previousValue={Math.round(previousRevenue / previousOrders)}
          growth={revenueGrowth}
          icon={Package}
          color="bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('admin.analytics.revenueTrend')}</h2>
            <Button variant="ghost" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {mockSalesData.map((data, index) => {
              const maxRevenue = Math.max(...mockSalesData.map((d) => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600" style={{ height: `${height}%` }} />
                  <span className="text-xs text-gray-600">{new Date(data.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('admin.analytics.orderClassification')}</h2>
            <Button variant="ghost" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {[
              { label: t('admin.analytics.delivered'), count: 85, color: 'bg-green-500' },
              { label: t('admin.analytics.shipping'), count: 8, color: 'bg-blue-500' },
              { label: t('admin.analytics.processing'), count: 5, color: 'bg-yellow-500' },
              { label: t('admin.analytics.pending'), count: 2, color: 'bg-orange-500' },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">{item.count}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={cn('h-2 rounded-full', item.color)} style={{ width: `${item.count}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('admin.analytics.topProducts')}</h2>
            <Button variant="ghost" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {mockTopProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.sold} {t('admin.analytics.sold')}</p>
                  <p className="text-sm text-gray-600">{(product.revenue / 1000000).toFixed(1)} {t('admin.analytics.million')}</p>
                </div>
                <div className={cn('flex items-center gap-1 ml-4', product.growth >= 0 ? 'text-green-600' : 'text-red-600')}>
                  {product.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{Math.abs(product.growth)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('admin.analytics.topCustomers')}</h2>
            <Button variant="ghost" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {mockTopCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{customer.orders} đơn</p>
                  <p className="text-sm text-gray-600">{(customer.spent / 1000000).toFixed(1)} {t('admin.analytics.million')}</p>
                </div>
                <div className={cn('flex items-center gap-1 ml-4', customer.growth >= 0 ? 'text-green-600' : 'text-red-600')}>
                  {customer.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{Math.abs(customer.growth)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{t('admin.analytics.recentActivities')}</h2>
          <Button variant="ghost" size="icon">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {[
            { type: 'order', message: t('admin.analytics.activityOrder') + ' ORD-2024-025 ' + t('admin.analytics.orderPlaced'), time: '5 ' + t('admin.analytics.minutesAgo'), icon: ShoppingCart },
            { type: 'customer', message: t('admin.analytics.activityCustomer') + ' Nguyễn Văn Đức ' + t('admin.analytics.customerRegistered'), time: '15 ' + t('admin.analytics.minutesAgo'), icon: Users },
            { type: 'order', message: t('admin.analytics.activityOrder') + ' ORD-2024-024 ' + t('admin.analytics.orderDelivered'), time: '30 ' + t('admin.analytics.minutesAgo'), icon: Package },
            { type: 'product', message: t('admin.analytics.activityProduct') + ' Trà Lài Tía ' + t('admin.analytics.productOutOfStock'), time: '1 ' + t('admin.analytics.hoursAgo'), icon: Package },
            { type: 'order', message: t('admin.analytics.activityOrder') + ' ORD-2024-023 ' + t('admin.analytics.orderCancelled'), time: '2 ' + t('admin.analytics.hoursAgo'), icon: ShoppingCart },
            { type: 'customer', message: t('admin.analytics.activityCustomer') + ' Trần Thị Mai ' + t('admin.analytics.customerRequestedRefund'), time: '3 ' + t('admin.analytics.hoursAgo'), icon: Users },
          ].map((activity, index) => {
            const ActivityIcon = activity.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ActivityIcon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
