import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, Eye, MoreVertical, Mail, Phone, MapPin, Calendar, ShoppingBag, TrendingUp, UserPlus, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/admin/DataTable';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { cn } from '@/lib/utils';

export type CustomerStatus = 'active' | 'inactive' | 'blocked';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  status: CustomerStatus;
  addresses: {
    id: string;
    type: 'home' | 'work' | 'other';
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }[];
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
  registrationDate: string;
  lastLoginDate?: string;
  wishlistCount: number;
  couponCount: number;
  notes?: string;
  tags?: string[];
}

export const mockCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'Nguyễn',
    lastName: 'Văn An',
    email: 'nguyenvan.an@email.com',
    phone: '0901234567',
    status: 'active',
    addresses: [
      {
        id: '1',
        type: 'home',
        address: '123 Đường Nguyễn Huệ',
        city: 'Hồ Chí Minh',
        state: 'Quận 1',
        postalCode: '700000',
        country: 'Việt Nam',
        isDefault: true,
      },
    ],
    totalOrders: 5,
    totalSpent: 4500000,
    averageOrderValue: 900000,
    lastOrderDate: '2024-12-20T10:30:00Z',
    registrationDate: '2024-01-15T08:00:00Z',
    lastLoginDate: '2024-12-23T14:30:00Z',
    wishlistCount: 3,
    couponCount: 2,
    tags: ['VIP', 'Khách hàng thân thiết'],
  },
  {
    id: '2',
    firstName: 'Trần',
    lastName: 'Thị Bình',
    email: 'tranthi.binh@email.com',
    phone: '0912345678',
    status: 'active',
    addresses: [
      {
        id: '2',
        type: 'home',
        address: '456 Đường Lê Lợi',
        city: 'Hà Nội',
        state: 'Quận Hoàn Kiếm',
        postalCode: '100000',
        country: 'Việt Nam',
        isDefault: true,
      },
    ],
    totalOrders: 8,
    totalSpent: 8900000,
    averageOrderValue: 1112500,
    lastOrderDate: '2024-12-18T15:45:00Z',
    registrationDate: '2023-11-20T10:00:00Z',
    lastLoginDate: '2024-12-22T09:15:00Z',
    wishlistCount: 5,
    couponCount: 4,
    tags: ['VIP', 'Khách hàng thân thiết', 'Người mua sắm thường xuyên'],
  },
  {
    id: '3',
    firstName: 'Lê',
    lastName: 'Văn Cường',
    email: 'levan.cuong@email.com',
    phone: '0923456789',
    status: 'active',
    addresses: [
      {
        id: '3',
        type: 'home',
        address: '789 Đường Trần Phú',
        city: 'Đà Nẵng',
        state: 'Quận Hải Châu',
        postalCode: '550000',
        country: 'Việt Nam',
        isDefault: true,
      },
    ],
    totalOrders: 3,
    totalSpent: 2100000,
    averageOrderValue: 700000,
    lastOrderDate: '2024-12-10T08:20:00Z',
    registrationDate: '2024-03-10T14:00:00Z',
    lastLoginDate: '2024-12-15T16:45:00Z',
    wishlistCount: 2,
    couponCount: 1,
    tags: ['Khách hàng mới'],
  },
  {
    id: '4',
    firstName: 'Phạm',
    lastName: 'Thị Dung',
    email: 'phamthi.dung@email.com',
    phone: '0934567890',
    status: 'active',
    addresses: [
      {
        id: '4',
        type: 'home',
        address: '321 Đường Quang Trung',
        city: 'Hải Phòng',
        state: 'Quận Hồng Bàng',
        postalCode: '180000',
        country: 'Việt Nam',
        isDefault: true,
      },
    ],
    totalOrders: 2,
    totalSpent: 1500000,
    averageOrderValue: 750000,
    lastOrderDate: '2024-12-23T11:00:00Z',
    registrationDate: '2024-06-05T09:30:00Z',
    lastLoginDate: '2024-12-23T11:00:00Z',
    wishlistCount: 4,
    couponCount: 0,
    tags: ['Khách hàng mới'],
  },
  {
    id: '5',
    firstName: 'Hoàng',
    lastName: 'Văn Em',
    email: 'hoangvan.em@email.com',
    phone: '0945678901',
    status: 'inactive',
    addresses: [
      {
        id: '5',
        type: 'home',
        address: '654 Đường Nguyễn Trãi',
        city: 'Cần Thơ',
        state: 'Quận Ninh Kiều',
        postalCode: '900000',
        country: 'Việt Nam',
        isDefault: true,
      },
    ],
    totalOrders: 1,
    totalSpent: 688000,
    averageOrderValue: 688000,
    lastOrderDate: '2024-12-15T14:30:00Z',
    registrationDate: '2024-08-20T11:00:00Z',
    lastLoginDate: '2024-12-16T09:00:00Z',
    wishlistCount: 1,
    couponCount: 0,
    tags: [],
  },
  {
    id: '6',
    firstName: 'Đỗ',
    lastName: 'Thị Phương',
    email: 'dothi.phuong@email.com',
    phone: '0956789012',
    status: 'blocked',
    addresses: [],
    totalOrders: 0,
    totalSpent: 0,
    averageOrderValue: 0,
    registrationDate: '2024-10-01T16:00:00Z',
    lastLoginDate: '2024-10-05T10:30:00Z',
    wishlistCount: 0,
    couponCount: 0,
    tags: [],
    notes: 'Tài khoản bị khóa do vi phạm chính sách',
  },
];

export const Customers = (): JSX.Element => {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'orders' | 'spent' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const statusConfig = useMemo(() => ({
    active: { label: t('admin.statusActive'), color: 'bg-green-100 text-green-800' },
    inactive: { label: t('admin.statusInactive'), color: 'bg-gray-100 text-gray-800' },
    blocked: { label: t('admin.statusBlocked'), color: 'bg-red-100 text-red-800' },
  }), [t]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    customers.forEach((customer) => {
      customer.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [customers]);

  const filteredAndSortedCustomers = useMemo(() => {
    let result = customers.filter((customer) => {
      const matchesSearch =
        searchQuery === '' ||
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      const matchesTag = tagFilter === 'all' || customer.tags?.includes(tagFilter);

      const matchesDate = (() => {
        if (dateFilter === 'all') return true;
        const customerDate = new Date(customer.registrationDate);
        const now = new Date();

        switch (dateFilter) {
          case 'today':
            return customerDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return customerDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return customerDate >= monthAgo;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatus && matchesTag && matchesDate;
    });

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case 'orders':
          comparison = a.totalOrders - b.totalOrders;
          break;
        case 'spent':
          comparison = a.totalSpent - b.totalSpent;
          break;
        case 'date':
          comparison = new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [customers, searchQuery, statusFilter, tagFilter, dateFilter, sortBy, sortOrder]);

  const handleStatusChange = (customerId: string, newStatus: CustomerStatus): void => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId ? { ...customer, status: newStatus } : customer
      )
    );
  };

  const handleBulkStatusChange = (newStatus: CustomerStatus): void => {
    setCustomers((prev) =>
      prev.map((customer) =>
        selectedIds.includes(customer.id) ? { ...customer, status: newStatus } : customer
      )
    );
    setSelectedIds([]);
  };

  const handleExport = (): void => {
    const csvContent = [
      [
        t('admin.customer'),
        t('admin.customerEmail'),
        t('admin.customerPhone'),
        t('admin.totalOrders'),
        t('admin.totalSpent'),
        t('admin.averageOrderValue'),
        t('admin.status'),
        t('admin.registrationDate'),
      ],
      ...filteredAndSortedCustomers.map((customer) => [
        `${customer.firstName} ${customer.lastName}`,
        customer.email,
        customer.phone,
        customer.totalOrders,
        customer.totalSpent.toLocaleString('vi-VN'),
        customer.averageOrderValue.toLocaleString('vi-VN'),
        statusConfig[customer.status].label,
        new Date(customer.registrationDate).toLocaleDateString('vi-VN'),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `khach-hang-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const columns = [
    {
      key: 'name' as keyof Customer,
      title: t('admin.customer'),
      render: (_: unknown, row: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-blue-600">
              {row.firstName.charAt(0)}{row.lastName.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <Link
              to={`/admin/customers/${row.id}`}
              className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
              {row.firstName} {row.lastName}
            </Link>
            <div className="text-sm text-gray-500 truncate">{row.email}</div>
            <div className="text-sm text-gray-500">{row.phone}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'totalOrders' as keyof Customer,
      title: t('admin.totalOrders'),
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: 'totalSpent' as keyof Customer,
      title: t('admin.totalSpent'),
      render: (value: number) => (
        <span className="font-semibold text-gray-900">{value.toLocaleString('vi-VN')} đ</span>
      ),
    },
    {
      key: 'averageOrderValue' as keyof Customer,
      title: t('admin.averageOrderValue'),
      render: (value: number) => (
        <span className="text-sm text-gray-600">{value.toLocaleString('vi-VN')} đ</span>
      ),
    },
    {
      key: 'status' as keyof Customer,
      title: t('admin.status'),
      render: (value: CustomerStatus) => {
        const config = statusConfig[value];
        return (
          <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', config.color)}>
            {config.label}
          </span>
        );
      },
    },
    {
      key: 'registrationDate' as keyof Customer,
      title: t('admin.registrationDate'),
      render: (value: string) => new Date(value).toLocaleDateString('vi-VN'),
    },
    {
      key: 'actions' as keyof Customer,
      title: t('admin.actions'),
      render: (_: unknown, row: Customer) => (
        <div className="flex items-center gap-2">
          <Link to={`/admin/customers/${row.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row.id, e.target.value as CustomerStatus)}
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

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageRevenue = customers.length > 0 ? totalRevenue / customers.length : 0;
  const activeCustomers = customers.filter((c) => c.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.manageCustomers')}</h1>
          <Breadcrumbs />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExport} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            {t('admin.exportCSV')}
          </Button>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            {t('admin.addCustomer')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('admin.totalCustomers')}</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('admin.activeCustomers')}</p>
              <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('admin.totalRevenue')}</p>
              <p className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString('vi-VN')} đ</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('admin.averageOrderValue')}</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(averageRevenue).toLocaleString('vi-VN')} đ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('admin.searchByCustomer')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as CustomerStatus | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('admin.allStatuses')}</option>
                {Object.entries(statusConfig).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              {allTags.length > 0 && (
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">{t('admin.allTags')}</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              )}

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

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date-desc">{t('admin.newest')}</option>
                <option value="date-asc">{t('admin.oldest')}</option>
                <option value="name-asc">{t('admin.nameAZ')}</option>
                <option value="name-desc">{t('admin.nameZA')}</option>
                <option value="orders-desc">{t('admin.mostOrders')}</option>
                <option value="orders-asc">{t('admin.fewestOrders')}</option>
                <option value="spent-desc">{t('admin.highestSpent')}</option>
                <option value="spent-asc">{t('admin.lowestSpent')}</option>
              </select>
            </div>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm font-medium text-blue-900">
                {t('admin.selectedCustomers', { count: selectedIds.length })}
              </span>
              <div className="flex items-center gap-2">
                <select
                  onChange={(e) => handleBulkStatusChange(e.target.value as CustomerStatus)}
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
          data={filteredAndSortedCustomers}
          columns={columns}
          idField="id"
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          searchable={false}
          loading={loading}
          emptyMessage={t('admin.noCustomersFound')}
          mobileView
        />
      </div>
    </div>
  );
};

export default Customers;
