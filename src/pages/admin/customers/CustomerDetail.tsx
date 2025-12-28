import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  TrendingUp,
  Edit,
  Save,
  X,
  FileText,
  Tag,
  Ban,
  CheckCircle,
  MoreVertical,
  Download,
  Printer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { DataTable } from '@/components/admin/DataTable';
import { cn } from '@/lib/utils';
import { Customer, CustomerStatus } from './Customers';
import { showUndoToast } from '@/lib/undo';

export const CustomerDetail = (): JSX.Element => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [editingTags, setEditingTags] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const statusConfig: Record<CustomerStatus, { label: string; color: string }> = {
    active: { label: t('admin.customers.status.active'), color: 'bg-green-100 text-green-800' },
    inactive: { label: t('admin.customers.status.inactive'), color: 'bg-gray-100 text-gray-800' },
    blocked: { label: t('admin.customers.status.blocked'), color: 'bg-red-100 text-red-800' },
  };

  useEffect(() => {
    const foundCustomer = mockCustomers.find((c) => c.id === id);
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setNotes(foundCustomer.notes || '');
      setTags(foundCustomer.tags || []);
    }
    setLoading(false);
  }, [id]);

  const handleStatusChange = (newStatus: CustomerStatus): void => {
    if (!customer) return;

    const previousStatus = customer.status;
    const updatedCustomer = { ...customer, status: newStatus };
    setCustomer(updatedCustomer);

    showUndoToast(
      t('admin.customerDetail.statusUpdated', { status: statusConfig[newStatus].label }),
      () => {
        setCustomer({ ...updatedCustomer, status: previousStatus });
      }
    );
  };

  const handleSaveNotes = (): void => {
    if (!customer) return;

    const previousNotes = customer.notes;
    const updatedCustomer = { ...customer, notes };
    setCustomer(updatedCustomer);
    setEditingNotes(false);

    showUndoToast(t('admin.customerDetail.notesUpdated'), () => {
      setCustomer({ ...updatedCustomer, notes: previousNotes });
      setNotes(previousNotes || '');
    });
  };

  const handleAddTag = (): void => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const newTags = [...tags, newTag.trim()];
      setTags(newTags);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string): void => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveTags = (): void => {
    if (!customer) return;

    const previousTags = customer.tags || [];
    const updatedCustomer = { ...customer, tags };
    setCustomer(updatedCustomer);
    setEditingTags(false);

    showUndoToast(t('admin.customerDetail.tagsUpdated'), () => {
      setCustomer({ ...updatedCustomer, tags: previousTags });
      setTags(previousTags);
    });
  };

  const handleExportData = (): void => {
    if (!customer) return;

    const dataContent = `
${t('admin.customerDetail.customerInfo')}
================================
${t('admin.customerDetail.fullName')}: ${customer.firstName} ${customer.lastName}
${t('admin.customerDetail.email')}: ${customer.email}
${t('admin.customerDetail.phone')}: ${customer.phone}
${t('admin.customerDetail.status')}: ${statusConfig[customer.status].label}
${t('admin.customerDetail.registrationDate')}: ${new Date(customer.registrationDate).toLocaleDateString('vi-VN')}
${t('admin.customerDetail.lastLogin')}: ${customer.lastLoginDate ? new Date(customer.lastLoginDate).toLocaleDateString('vi-VN') : 'N/A'}

${t('admin.customerDetail.statistics')}
================================
${t('admin.customerDetail.totalOrders')}: ${customer.totalOrders}
${t('admin.customerDetail.totalSpent')}: ${customer.totalSpent.toLocaleString('vi-VN')} đ
${t('admin.customerDetail.averageOrderValue')}: ${customer.averageOrderValue.toLocaleString('vi-VN')} đ
${t('admin.customerDetail.lastOrder')}: ${customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString('vi-VN') : 'N/A'}

${t('admin.customerDetail.tags')}
================================
${tags.length > 0 ? tags.join(', ') : t('admin.customerDetail.noTags')}

${t('admin.customerDetail.notes')}
================================
${customer.notes || t('admin.customerDetail.noNotes')}
    `;

    const blob = new Blob([dataContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `khach-hang-${customer.firstName}-${customer.lastName}.txt`;
    link.click();
  };

  const handlePrintData = (): void => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('admin.customerDetail.notFound')}</h2>
        <Link to="/admin/customers">
          <Button>{t('admin.customerDetail.backToList')}</Button>
        </Link>
      </div>
    );
  }

  const orders = mockOrders[customer.id] || [];
  const statusConfigCurrent = statusConfig[customer.status];

  const orderColumns = [
    {
      key: 'orderNumber' as keyof Order,
      title: t('admin.customerDetail.orderNumber'),
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
      key: 'date' as keyof Order,
      title: t('admin.customerDetail.orderDate'),
      render: (value: string) => new Date(value).toLocaleDateString('vi-VN'),
    },
    {
      key: 'items' as keyof Order,
      title: t('admin.customerDetail.products'),
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-gray-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'total' as keyof Order,
      title: t('admin.customerDetail.total'),
      render: (value: number) => (
        <span className="font-semibold text-gray-900">{value.toLocaleString('vi-VN')} đ</span>
      ),
    },
    {
      key: 'status' as keyof Order,
      title: t('admin.customerDetail.status'),
      render: (value: string) => {
        const config: Record<string, { label: string; color: string }> = {
          pending: { label: t('admin.orders.status.pending'), color: 'bg-yellow-100 text-yellow-800' },
          processing: { label: t('admin.orders.status.processing'), color: 'bg-blue-100 text-blue-800' },
          shipped: { label: t('admin.orders.status.shipped'), color: 'bg-purple-100 text-purple-800' },
          delivered: { label: t('admin.orders.status.delivered'), color: 'bg-green-100 text-green-800' },
          cancelled: { label: t('admin.orders.status.cancelled'), color: 'bg-red-100 text-red-800' },
        };
        const statusConfig = config[value] || { label: value, color: 'bg-gray-100 text-gray-800' };
        return (
          <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', statusConfig.color)}>
            {statusConfig.label}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/customers')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {customer.firstName} {customer.lastName}
            </h1>
            <Breadcrumbs />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrintData} className="gap-2">
            <Printer className="w-4 h-4" />
            {t('admin.customerDetail.print')}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData} className="gap-2">
            <Download className="w-4 h-4" />
            {t('admin.customerDetail.export')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">{t('admin.customerDetail.personalInfo')}</h2>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                  statusConfigCurrent.color
                )}
              >
                {statusConfigCurrent.label}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">{t('admin.customerDetail.email')}</p>
                    <a
                      href={`mailto:${customer.email}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {customer.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">{t('admin.customerDetail.phone')}</p>
                    <a
                      href={`tel:${customer.phone}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {customer.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">{t('admin.customerDetail.registrationDate')}</p>
                    <p className="font-medium text-gray-900">
                      {new Date(customer.registrationDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>

                {customer.lastLoginDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">{t('admin.customerDetail.lastLogin')}</p>
                      <p className="font-medium text-gray-900">
                        {new Date(customer.lastLoginDate).toLocaleDateString('vi-VN')} lúc{' '}
                        {new Date(customer.lastLoginDate).toLocaleTimeString('vi-VN')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {customer.dateOfBirth && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">{t('admin.customerDetail.dateOfBirth')}</p>
                      <p className="font-medium text-gray-900">
                        {new Date(customer.dateOfBirth).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                )}

                {customer.gender && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">{t('admin.customerDetail.gender')}</p>
                      <p className="font-medium text-gray-900">
                        {customer.gender === 'male'
                          ? t('admin.customerDetail.male')
                          : customer.gender === 'female'
                          ? t('admin.customerDetail.female')
                          : t('admin.customerDetail.other')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{t('admin.customerDetail.tags')}</h3>
                {!editingTags && (
                  <Button size="sm" variant="ghost" onClick={() => setEditingTags(true)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {editingTags ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      placeholder={t('admin.customerDetail.addTag')}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button size="sm" onClick={handleAddTag}>
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-blue-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={handleSaveTags}>
                      <Save className="w-4 h-4 mr-1" />
                      {t('admin.customerDetail.saveTags')}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingTags(false)}>
                      <X className="w-4 h-4 mr-1" />
                      {t('common.cancel')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.length > 0 ? (
                    tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">{t('admin.customerDetail.noTags')}</p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{t('admin.customerDetail.notes')}</h3>
                {!editingNotes && (
                  <Button size="sm" variant="ghost" onClick={() => setEditingNotes(true)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {editingNotes ? (
                <div className="space-y-2">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('admin.customerDetail.addNote')}
                  />
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={handleSaveNotes}>
                      <Save className="w-4 h-4 mr-1" />
                      {t('admin.customerDetail.saveNotes')}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingNotes(false)}>
                      <X className="w-4 h-4 mr-1" />
                      {t('common.cancel')}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">{customer.notes || t('admin.customerDetail.noNotes')}</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('admin.customerDetail.addresses')}</h2>
            {customer.addresses.length > 0 ? (
              <div className="space-y-4">
                {customer.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={cn(
                      'p-4 rounded-lg border-2',
                      address.isDefault
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">
                              {address.type === 'home'
                                ? t('admin.customerDetail.home')
                                : address.type === 'work'
                                ? t('admin.customerDetail.work')
                                : t('admin.customerDetail.other')}
                            </p>
                            {address.isDefault && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <CheckCircle className="w-3 h-3" />
                                {t('admin.customerDetail.defaultAddress')}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{address.address}</p>
                        <p className="text-sm text-gray-600">
                          {address.state}, {address.city}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.postalCode}, {address.country}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">{t('admin.customerDetail.noAddresses')}</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('admin.customerDetail.orderHistory')}</h2>
            {orders.length > 0 ? (
              <DataTable
                data={orders}
                columns={orderColumns}
                idField="id"
                searchable={false}
                emptyMessage={t('admin.customerDetail.noOrders')}
                mobileView
              />
            ) : (
              <p className="text-sm text-gray-600">{t('admin.customerDetail.noOrders')}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.customerDetail.statistics')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{t('admin.customerDetail.totalOrders')}</span>
                </div>
                <span className="font-semibold text-gray-900">{customer.totalOrders}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{t('admin.customerDetail.totalSpent')}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {customer.totalSpent.toLocaleString('vi-VN')} đ
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{t('admin.customerDetail.averageOrderValue')}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {customer.averageOrderValue.toLocaleString('vi-VN')} đ
                </span>
              </div>

              {customer.lastOrderDate && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{t('admin.customerDetail.lastOrder')}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {new Date(customer.lastOrderDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{t('admin.customerDetail.wishlist')}</span>
                </div>
                <span className="font-semibold text-gray-900">{customer.wishlistCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{t('admin.customerDetail.coupons')}</span>
                </div>
                <span className="font-semibold text-gray-900">{customer.couponCount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.customerDetail.quickActions')}</h2>
            <div className="space-y-3">
              <select
                value={customer.status}
                onChange={(e) => handleStatusChange(e.target.value as CustomerStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(statusConfig).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <Button variant="outline" className="w-full gap-2">
                <Mail className="w-4 h-4" />
                {t('admin.customerDetail.sendEmail')}
              </Button>

              <Button variant="outline" className="w-full gap-2">
                <Phone className="w-4 h-4" />
                {t('admin.customerDetail.callPhone')}
              </Button>

              <Button variant="outline" className="w-full gap-2">
                <FileText className="w-4 h-4" />
                {t('admin.customerDetail.exportReport')}
              </Button>

              {customer.status !== 'blocked' && (
                <Button
                  variant="outline"
                  className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Ban className="w-4 h-4" />
                  {t('admin.customerDetail.blockAccount')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
