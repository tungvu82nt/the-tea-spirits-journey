import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, Eye, MoreVertical, Package, Truck, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/admin/DataTable';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { cn } from '@/lib/utils';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'Nguyễn Văn An',
    customerEmail: 'nguyenvan.an@email.com',
    customerPhone: '0901234567',
    shippingAddress: {
      address: '123 Đường Nguyễn Huệ',
      city: 'Hồ Chí Minh',
      state: 'Quận 1',
      postalCode: '700000',
      country: 'Việt Nam',
    },
    items: [
      {
        id: '1',
        productName: 'Trà Sencha Premium',
        quantity: 2,
        price: 250000,
        image: '/images/tea-sencha.jpg',
      },
      {
        id: '2',
        productName: 'Trà Oolong Đài Loan',
        quantity: 1,
        price: 320000,
        image: '/images/tea-oolong.jpg',
      },
    ],
    subtotal: 820000,
    shippingCost: 30000,
    tax: 0,
    discount: 50000,
    total: 800000,
    status: 'processing',
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    notes: 'Giao hàng vào buổi sáng',
    createdAt: '2024-12-20T10:30:00Z',
    updatedAt: '2024-12-21T14:15:00Z',
    estimatedDelivery: '2024-12-25',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Trần Thị Bình',
    customerEmail: 'tranthi.binh@email.com',
    customerPhone: '0912345678',
    shippingAddress: {
      address: '456 Đường Lê Lợi',
      city: 'Hà Nội',
      state: 'Quận Hoàn Kiếm',
      postalCode: '100000',
      country: 'Việt Nam',
    },
    items: [
      {
        id: '3',
        productName: 'Trà Puerh 2018',
        quantity: 3,
        price: 450000,
        image: '/images/tea-puerh.jpg',
      },
    ],
    subtotal: 1350000,
    shippingCost: 40000,
    tax: 0,
    discount: 0,
    total: 1390000,
    status: 'shipped',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    trackingNumber: 'VN123456789VN',
    createdAt: '2024-12-18T15:45:00Z',
    updatedAt: '2024-12-22T09:30:00Z',
    estimatedDelivery: '2024-12-26',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customerName: 'Lê Văn Cường',
    customerEmail: 'levan.cuong@email.com',
    customerPhone: '0923456789',
    shippingAddress: {
      address: '789 Đường Trần Phú',
      city: 'Đà Nẵng',
      state: 'Quận Hải Châu',
      postalCode: '550000',
      country: 'Việt Nam',
    },
    items: [
      {
        id: '4',
        productName: 'Trà Matcha Nhật Bản',
        quantity: 1,
        price: 280000,
        image: '/images/tea-matcha.jpg',
      },
      {
        id: '5',
        productName: 'Trà Hoa Cúc',
        quantity: 2,
        price: 150000,
        image: '/images/tea-chamomile.jpg',
      },
    ],
    subtotal: 580000,
    shippingCost: 25000,
    tax: 0,
    discount: 30000,
    total: 575000,
    status: 'delivered',
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'paid',
    createdAt: '2024-12-10T08:20:00Z',
    updatedAt: '2024-12-15T16:45:00Z',
    estimatedDelivery: '2024-12-14',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customerName: 'Phạm Thị Dung',
    customerEmail: 'phamthi.dung@email.com',
    customerPhone: '0934567890',
    shippingAddress: {
      address: '321 Đường Quang Trung',
      city: 'Hải Phòng',
      state: 'Quận Hồng Bàng',
      postalCode: '180000',
      country: 'Việt Nam',
    },
    items: [
      {
        id: '6',
        productName: 'Trà Lài Tía',
        quantity: 4,
        price: 180000,
        image: '/images/tea-lavender.jpg',
      },
    ],
    subtotal: 720000,
    shippingCost: 35000,
    tax: 0,
    discount: 0,
    total: 755000,
    status: 'pending',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'pending',
    notes: 'Vui lòng gọi trước khi giao',
    createdAt: '2024-12-23T11:00:00Z',
    updatedAt: '2024-12-23T11:00:00Z',
    estimatedDelivery: '2024-12-28',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customerName: 'Hoàng Văn Em',
    customerEmail: 'hoangvan.em@email.com',
    customerPhone: '0945678901',
    shippingAddress: {
      address: '654 Đường Nguyễn Trãi',
      city: 'Cần Thơ',
      state: 'Quận Ninh Kiều',
      postalCode: '900000',
      country: 'Việt Nam',
    },
    items: [
      {
        id: '7',
        productName: 'Trà Kombucha',
        quantity: 6,
        price: 120000,
        image: '/images/tea-kombucha.jpg',
      },
    ],
    subtotal: 720000,
    shippingCost: 40000,
    tax: 0,
    discount: 72000,
    total: 688000,
    status: 'cancelled',
    paymentMethod: 'credit_card',
    paymentStatus: 'refunded',
    notes: 'Khách hàng hủy đơn',
    createdAt: '2024-12-15T14:30:00Z',
    updatedAt: '2024-12-16T09:00:00Z',
  },
];

export const Orders = (): JSX.Element => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const statusConfig = useMemo(() => ({
    pending: { label: t('admin.statusPending'), icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    processing: { label: t('admin.statusProcessing'), icon: Package, color: 'bg-blue-100 text-blue-800' },
    shipped: { label: t('admin.statusShipped'), icon: Truck, color: 'bg-purple-100 text-purple-800' },
    delivered: { label: t('admin.statusDelivered'), icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    cancelled: { label: t('admin.statusCancelled'), icon: XCircle, color: 'bg-red-100 text-red-800' },
    refunded: { label: t('admin.statusRefunded'), icon: AlertCircle, color: 'bg-orange-100 text-orange-800' },
  }), [t]);

  const paymentStatusConfig = useMemo(() => ({
    pending: { label: t('admin.paymentPending'), color: 'bg-yellow-100 text-yellow-800' },
    paid: { label: t('admin.paymentPaid'), color: 'bg-green-100 text-green-800' },
    failed: { label: t('admin.paymentFailed'), color: 'bg-red-100 text-red-800' },
    refunded: { label: t('admin.paymentRefunded'), color: 'bg-orange-100 text-orange-800' },
  }), [t]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        searchQuery === '' ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesPaymentStatus = paymentStatusFilter === 'all' || order.paymentStatus === paymentStatusFilter;

      const matchesDate = (() => {
        if (dateFilter === 'all') return true;
        const orderDate = new Date(order.createdAt);
        const now = new Date();

        switch (dateFilter) {
          case 'today':
            return orderDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return orderDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return orderDate >= monthAgo;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDate;
    });
  }, [orders, searchQuery, statusFilter, paymentStatusFilter, dateFilter]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus): void => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
      )
    );
  };

  const handleBulkStatusChange = (newStatus: OrderStatus): void => {
    setOrders((prev) =>
      prev.map((order) =>
        selectedIds.includes(order.id) ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
      )
    );
    setSelectedIds([]);
  };

  const handleExport = (): void => {
    const csvContent = [
      [
        t('admin.orderNumber'),
        t('admin.customer'),
        t('admin.customerEmail'),
        t('admin.customerPhone'),
        t('admin.total'),
        t('admin.orderStatus'),
        t('admin.paymentMethod'),
        t('admin.orderDate'),
      ],
      ...filteredOrders.map((order) => [
        order.orderNumber,
        order.customerName,
        order.customerEmail,
        order.customerPhone,
        order.total.toLocaleString('vi-VN'),
        statusConfig[order.status].label,
        order.paymentMethod,
        new Date(order.createdAt).toLocaleDateString('vi-VN'),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `don-hang-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const columns = [
    {
      key: 'orderNumber' as keyof Order,
      title: t('admin.orderNumber'),
      render: (value: string, row: Order) => (
        <Link
          to={`/admin/orders/${row.id}`}
          className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          {value}
        </Link>
      ),
    },
    {
      key: 'customerName' as keyof Order,
      title: t('admin.customerName'),
      render: (value: string, row: Order) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.customerEmail}</div>
          <div className="text-sm text-gray-500">{row.customerPhone}</div>
        </div>
      ),
    },
    {
      key: 'total' as keyof Order,
      title: t('admin.total'),
      render: (value: number) => (
        <span className="font-semibold text-gray-900">{value.toLocaleString('vi-VN')} đ</span>
      ),
    },
    {
      key: 'status' as keyof Order,
      title: t('admin.orderStatus'),
      render: (value: OrderStatus) => {
        const config = statusConfig[value];
        const Icon = config.icon;
        return (
          <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', config.color)}>
            <Icon className="w-3.5 h-3.5" />
            {config.label}
          </span>
        );
      },
    },
    {
      key: 'paymentStatus' as keyof Order,
      title: t('admin.paymentStatus'),
      render: (value: string) => {
        const config = paymentStatusConfig[value];
        return (
          <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', config.color)}>
            {config.label}
          </span>
        );
      },
    },
    {
      key: 'createdAt' as keyof Order,
      title: t('admin.orderDate'),
      render: (value: string) => new Date(value).toLocaleDateString('vi-VN'),
    },
    {
      key: 'actions' as keyof Order,
      title: t('admin.actions'),
      render: (_: unknown, row: Order) => (
        <div className="flex items-center gap-2">
          <Link to={`/admin/orders/${row.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row.id, e.target.value as OrderStatus)}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.entries(statusConfig).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.manageOrders')}</h1>
          <Breadcrumbs />
        </div>
        <Button onClick={handleExport} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          {t('admin.exportCSV')}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('admin.searchByOrder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('admin.allStatuses')}</option>
                {Object.entries(statusConfig).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('admin.allPayments')}</option>
                {Object.entries(paymentStatusConfig).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('admin.allTime')}</option>
                <option value="today">{t('admin.today')}</option>
                <option value="week">{t('admin.last7Days')}</option>
                <option value="month">{t('admin.last30Days')}</option>
              </select>
            </div>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm font-medium text-blue-900">
                {t('admin.selectedOrders', { count: selectedIds.length })}
              </span>
              <div className="flex items-center gap-2">
                <select
                  onChange={(e) => handleBulkStatusChange(e.target.value as OrderStatus)}
                  className="px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t('admin.changeStatus')}</option>
                  {Object.entries(statusConfig).map(([key, { label }]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedIds([])}
                >
                  {t('admin.clearSelection')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <DataTable
          data={filteredOrders}
          columns={columns}
          idField="id"
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          searchable={false}
          loading={loading}
          emptyMessage={t('admin.noOrdersFound')}
          mobileView
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('admin.newOrders')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('admin.processingOrders')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === 'processing').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('admin.deliveredOrders')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
