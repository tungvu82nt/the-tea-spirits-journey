import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Download,
  Printer,
  Edit,
  Save,
  X,
  FileText,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { cn } from '@/lib/utils';
import { Order, OrderStatus } from './Orders';
import { showUndoToast } from '@/lib/undo';

const getStatusConfig = (t: (key: string) => string): Record<OrderStatus, { label: string; icon: typeof Package; color: string }> => ({
  pending: { label: t('admin.orders.status.pending'), icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: t('admin.orders.status.processing'), icon: Package, color: 'bg-blue-100 text-blue-800' },
  shipped: { label: t('admin.orders.status.shipped'), icon: Truck, color: 'bg-purple-100 text-purple-800' },
  delivered: { label: t('admin.orders.status.delivered'), icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  cancelled: { label: t('admin.orders.status.cancelled'), icon: XCircle, color: 'bg-red-100 text-red-800' },
  refunded: { label: t('admin.orders.status.refunded'), icon: AlertCircle, color: 'bg-orange-100 text-orange-800' },
});

const getPaymentStatusConfig = (t: (key: string) => string): Record<string, { label: string; color: string }> => ({
  pending: { label: t('admin.orderDetail.paymentStatusPending'), color: 'bg-yellow-100 text-yellow-800' },
  paid: { label: t('admin.orderDetail.paymentStatusPaid'), color: 'bg-green-100 text-green-800' },
  failed: { label: t('admin.orderDetail.paymentStatusFailed'), color: 'bg-red-100 text-red-800' },
  refunded: { label: t('admin.orderDetail.paymentStatusRefunded'), color: 'bg-orange-100 text-orange-800' },
});

const getPaymentMethodConfig = (t: (key: string) => string): Record<string, { label: string; icon: typeof CreditCard }> => ({
  credit_card: { label: t('admin.orderDetail.creditCard'), icon: CreditCard },
  paypal: { label: t('admin.orderDetail.paypal'), icon: CreditCard },
  bank_transfer: { label: t('admin.orderDetail.bankTransfer'), icon: CreditCard },
  cash_on_delivery: { label: t('admin.orderDetail.cashOnDelivery'), icon: DollarSign },
});

interface OrderTimeline {
  id: string;
  status: OrderStatus;
  timestamp: string;
  note?: string;
  actor: string;
}

const getMockTimelines = (t: (key: string) => string): Record<string, OrderTimeline[]> => ({
  '1': [
    {
      id: '1',
      status: 'pending',
      timestamp: '2024-12-20T10:30:00Z',
      actor: t('admin.orderDetail.system'),
      note: t('admin.orderDetail.orderCreated'),
    },
    {
      id: '2',
      status: 'processing',
      timestamp: '2024-12-21T14:15:00Z',
      actor: t('admin.orderDetail.admin'),
      note: t('admin.orderDetail.orderConfirmed'),
    },
  ],
  '2': [
    {
      id: '1',
      status: 'pending',
      timestamp: '2024-12-18T15:45:00Z',
      actor: t('admin.orderDetail.system'),
      note: t('admin.orderDetail.orderCreated'),
    },
    {
      id: '2',
      status: 'processing',
      timestamp: '2024-12-19T09:00:00Z',
      actor: t('admin.orderDetail.admin'),
      note: t('admin.orderDetail.orderProcessing'),
    },
    {
      id: '3',
      status: 'shipped',
      timestamp: '2024-12-22T09:30:00Z',
      actor: t('admin.orderDetail.admin'),
      note: t('admin.orderDetail.orderShipped'),
    },
  ],
  '3': [
    {
      id: '1',
      status: 'pending',
      timestamp: '2024-12-10T08:20:00Z',
      actor: t('admin.orderDetail.system'),
      note: t('admin.orderDetail.orderCreated'),
    },
    {
      id: '2',
      status: 'processing',
      timestamp: '2024-12-11T10:00:00Z',
      actor: t('admin.orderDetail.admin'),
      note: t('admin.orderDetail.orderProcessing'),
    },
    {
      id: '3',
      status: 'shipped',
      timestamp: '2024-12-12T14:30:00Z',
      actor: t('admin.orderDetail.admin'),
      note: t('admin.orderDetail.orderShipped'),
    },
    {
      id: '4',
      status: 'delivered',
      timestamp: '2024-12-15T16:45:00Z',
      actor: t('admin.orderDetail.customer'),
      note: t('admin.orderDetail.orderDelivered'),
    },
  ],
  '4': [
    {
      id: '1',
      status: 'pending',
      timestamp: '2024-12-23T11:00:00Z',
      actor: t('admin.orderDetail.system'),
      note: t('admin.orderDetail.orderCreated'),
    },
  ],
  '5': [
    {
      id: '1',
      status: 'pending',
      timestamp: '2024-12-15T14:30:00Z',
      actor: t('admin.orderDetail.system'),
      note: t('admin.orderDetail.orderCreated'),
    },
    {
      id: '2',
      status: 'cancelled',
      timestamp: '2024-12-16T09:00:00Z',
      actor: t('admin.orderDetail.customer'),
      note: t('admin.orderDetail.orderCancelled'),
    },
  ],
});

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

export const OrderDetail = (): JSX.Element => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [editingTracking, setEditingTracking] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const statusConfig = getStatusConfig(t);
  const paymentStatusConfig = getPaymentStatusConfig(t);
  const paymentMethodConfig = getPaymentMethodConfig(t);
  const mockTimelines = getMockTimelines(t);

  useEffect(() => {
    const foundOrder = mockOrders.find((o) => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
      setNotes(foundOrder.notes || '');
      setTrackingNumber(foundOrder.trackingNumber || '');
    }
    setLoading(false);
  }, [id]);

  const handleStatusChange = (newStatus: OrderStatus): void => {
    if (!order) return;

    const previousStatus = order.status;
    const updatedOrder = { ...order, status: newStatus, updatedAt: new Date().toISOString() };
    setOrder(updatedOrder);

    showUndoToast(
      t('admin.orderDetail.statusUpdated', { status: statusConfig[newStatus].label }),
      () => {
        setOrder({ ...updatedOrder, status: previousStatus });
      }
    );
  };

  const handleSaveNotes = (): void => {
    if (!order) return;

    const previousNotes = order.notes;
    const updatedOrder = { ...order, notes, updatedAt: new Date().toISOString() };
    setOrder(updatedOrder);
    setEditingNotes(false);

    showUndoToast(t('admin.orderDetail.notesUpdated'), () => {
      setOrder({ ...updatedOrder, notes: previousNotes });
      setNotes(previousNotes || '');
    });
  };

  const handleSaveTracking = (): void => {
    if (!order) return;

    const previousTracking = order.trackingNumber;
    const updatedOrder = { ...order, trackingNumber, updatedAt: new Date().toISOString() };
    setOrder(updatedOrder);
    setEditingTracking(false);

    showUndoToast(t('admin.orderDetail.trackingUpdated'), () => {
      setOrder({ ...updatedOrder, trackingNumber: previousTracking });
      setTrackingNumber(previousTracking || '');
    });
  };

  const handlePrintInvoice = (): void => {
    window.print();
  };

  const handleExportInvoice = (): void => {
    if (!order) return;

    const invoiceContent = `
${t('admin.orderDetail.invoice')}
================================
${t('admin.orderDetail.orderNumber')}: ${order.orderNumber}
${t('admin.orderDetail.orderDate')}: ${new Date(order.createdAt).toLocaleDateString('vi-VN')}
${t('admin.orderDetail.customerName')}: ${order.customerName}
${t('admin.orderDetail.email')}: ${order.customerEmail}
${t('admin.orderDetail.phone')}: ${order.customerPhone}

${t('admin.orderDetail.shippingAddress')}:
${order.shippingAddress.address}
${order.shippingAddress.state}, ${order.shippingAddress.city}
${order.shippingAddress.postalCode}, ${order.shippingAddress.country}

${t('admin.orderDetail.orderItems')}:
--------------------------------
${order.items
  .map(
    (item) =>
      `${item.productName} x${item.quantity} = ${(item.quantity * item.price).toLocaleString('vi-VN')} đ`
  )
  .join('\n')}

${t('admin.orderDetail.subtotal')}: ${order.subtotal.toLocaleString('vi-VN')} đ
${t('admin.orderDetail.shippingCost')}: ${order.shippingCost.toLocaleString('vi-VN')} đ
${t('admin.orderDetail.discount')}: ${order.discount.toLocaleString('vi-VN')} đ
--------------------------------
${t('admin.orderDetail.total')}: ${order.total.toLocaleString('vi-VN')} đ

${t('admin.orderDetail.paymentMethodLabel')}: ${paymentMethodConfig[order.paymentMethod].label}
${t('admin.orderDetail.statusLabel')}: ${statusConfig[order.status].label}
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `hoa-don-${order.orderNumber}.txt`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('admin.orderDetail.notFound')}</h2>
        <Link to="/admin/orders">
          <Button>{t('admin.orderDetail.backToList')}</Button>
        </Link>
      </div>
    );
  }

  const timeline = mockTimelines[order.id] || [];
  const statusConfigCurrent = statusConfig[order.status];
  const StatusIcon = statusConfigCurrent.icon;
  const paymentStatusConfigCurrent = paymentStatusConfig[order.paymentStatus];
  const paymentMethodConfigCurrent = paymentMethodConfig[order.paymentMethod];
  const PaymentMethodIcon = paymentMethodConfigCurrent.icon;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/orders')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
            <Breadcrumbs />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrintInvoice} className="gap-2">
            <Printer className="w-4 h-4" />
            {t('admin.orderDetail.print')}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportInvoice} className="gap-2">
            <Download className="w-4 h-4" />
            {t('admin.orderDetail.export')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">{t('admin.orderDetail.orderInfo')}</h2>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                  statusConfigCurrent.color
                )}
              >
                <StatusIcon className="w-4 h-4" />
                {statusConfigCurrent.label}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">{t('admin.orderDetail.orderDate')}</p>
                    <p className="font-medium text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')} {t('admin.orderDetail.at')}{' '}
                      {new Date(order.createdAt).toLocaleTimeString('vi-VN')}
                    </p>
                  </div>
                </div>

                {order.estimatedDelivery && (
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">{t('admin.orderDetail.estimatedDelivery')}</p>
                      <p className="font-medium text-gray-900">{order.estimatedDelivery}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <PaymentMethodIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">{t('admin.orderDetail.paymentMethod')}</p>
                    <p className="font-medium text-gray-900">{paymentMethodConfigCurrent.label}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">{t('admin.orderDetail.paymentStatus')}</p>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                        paymentStatusConfigCurrent.color
                      )}
                    >
                      {paymentStatusConfigCurrent.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">{t('admin.orderDetail.shippingAddress')}</p>
                    <p className="font-medium text-gray-900">{order.shippingAddress.address}</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.state}, {order.shippingAddress.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{t('admin.orderDetail.trackingNumber')}</p>
                      {editingTracking ? (
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <Button size="sm" onClick={handleSaveTracking}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingTracking(false)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{order.trackingNumber}</p>
                          <Button size="sm" variant="ghost" onClick={() => setEditingTracking(true)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">{t('admin.orderDetail.notes')}</h3>
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
                    placeholder={t('admin.orderDetail.addNote')}
                  />
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={handleSaveNotes}>
                      <Save className="w-4 h-4 mr-1" />
                      {t('admin.orderDetail.saveNotes')}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingNotes(false)}>
                      <X className="w-4 h-4 mr-1" />
                      {t('common.cancel')}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">{order.notes || t('admin.orderDetail.noNotes')}</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('admin.orderDetail.orderItems')}</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.productName}</h3>
                    <p className="text-sm text-gray-600">{t('admin.orderDetail.quantity')}: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {(item.quantity * item.price).toLocaleString('vi-VN')} đ
                    </p>
                    <p className="text-sm text-gray-600">{item.price.toLocaleString('vi-VN')} đ/{t('admin.orderDetail.product')}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('admin.orderDetail.subtotal')}</span>
                <span className="font-medium text-gray-900">{order.subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('admin.orderDetail.shippingCost')}</span>
                <span className="font-medium text-gray-900">{order.shippingCost.toLocaleString('vi-VN')} đ</span>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('admin.orderDetail.tax')}</span>
                  <span className="font-medium text-gray-900">{order.tax.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('admin.orderDetail.discount')}</span>
                  <span className="font-medium text-green-600">
                    -{order.discount.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span className="text-gray-900">{t('admin.orderDetail.total')}</span>
                <span className="text-blue-600">{order.total.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('admin.orderDetail.orderTimeline')}</h2>
            <div className="space-y-6">
              {timeline.map((event, index) => {
                const eventStatusConfig = statusConfig[event.status];
                const EventStatusIcon = eventStatusConfig.icon;
                const isLast = index === timeline.length - 1;

                return (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center',
                          eventStatusConfig.color
                        )}
                      >
                        <EventStatusIcon className="w-5 h-5" />
                      </div>
                      {!isLast && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{eventStatusConfig.label}</p>
                          <p className="text-sm text-gray-600">{event.note}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {new Date(event.timestamp).toLocaleDateString('vi-VN')} {t('admin.orderDetail.at')}{' '}
                            {new Date(event.timestamp).toLocaleTimeString('vi-VN')}
                          </p>
                          <p className="text-xs text-gray-500">{t('admin.orderDetail.by')} {event.actor}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.orderDetail.customerName')}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {order.customerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{t('admin.orderDetail.customer')}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a
                    href={`mailto:${order.customerEmail}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {order.customerEmail}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a
                    href={`tel:${order.customerPhone}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {order.customerPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.orderDetail.quickActions')}</h2>
            <div className="space-y-3">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(statusConfig).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <Button variant="outline" className="w-full gap-2">
                <FileText className="w-4 h-4" />
                {t('admin.orderDetail.exportInvoice')}
              </Button>

              <Button variant="outline" className="w-full gap-2">
                <Mail className="w-4 h-4" />
                {t('admin.orderDetail.sendConfirmationEmail')}
              </Button>

              <Button variant="outline" className="w-full gap-2">
                <Phone className="w-4 h-4" />
                {t('admin.orderDetail.callCustomer')}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.orderDetail.statistics')}</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('admin.orderDetail.totalProducts')}</span>
                <span className="font-medium text-gray-900">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('admin.orderDetail.avgPricePerItem')}</span>
                <span className="font-medium text-gray-900">
                  {Math.round(order.subtotal / order.items.reduce((sum, item) => sum + item.quantity, 0)).toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('admin.orderDetail.discount')}</span>
                <span className="font-medium text-green-600">
                  {order.discount > 0 ? `${order.discount.toLocaleString('vi-VN')} đ` : '0 đ'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
