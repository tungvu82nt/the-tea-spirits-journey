import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, AlertTriangle, TrendingUp, TrendingDown, Search, Filter, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  lowStockThreshold: number;
  reservedStock: number;
  availableStock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastRestocked: string;
  totalSold: number;
  averageMonthlySales: number;
  estimatedDaysRemaining: number;
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Trà Oolong Đài Loan',
    sku: 'TEA-001',
    category: 'Trà Oolong',
    currentStock: 150,
    lowStockThreshold: 30,
    reservedStock: 20,
    availableStock: 130,
    status: 'in_stock',
    lastRestocked: '2024-01-10',
    totalSold: 450,
    averageMonthlySales: 150,
    estimatedDaysRemaining: 26,
  },
  {
    id: '2',
    productId: '2',
    productName: 'Trà Xanh Nhật Bản',
    sku: 'TEA-002',
    category: 'Trà Xanh',
    currentStock: 89,
    lowStockThreshold: 30,
    reservedStock: 15,
    availableStock: 74,
    status: 'in_stock',
    lastRestocked: '2024-01-12',
    totalSold: 380,
    averageMonthlySales: 120,
    estimatedDaysRemaining: 18,
  },
  {
    id: '3',
    productId: '4',
    productName: 'Trà Sen',
    sku: 'TEA-004',
    category: 'Trà Hoa',
    currentStock: 45,
    lowStockThreshold: 30,
    reservedStock: 10,
    availableStock: 35,
    status: 'low_stock',
    lastRestocked: '2024-01-18',
    totalSold: 280,
    averageMonthlySales: 90,
    estimatedDaysRemaining: 12,
  },
  {
    id: '4',
    productId: '5',
    productName: 'Trà Pu-erh',
    sku: 'TEA-005',
    category: 'Trà Đen',
    currentStock: 30,
    lowStockThreshold: 30,
    reservedStock: 5,
    availableStock: 25,
    status: 'low_stock',
    lastRestocked: '2024-01-20',
    totalSold: 320,
    averageMonthlySales: 100,
    estimatedDaysRemaining: 7,
  },
  {
    id: '5',
    productId: '10',
    productName: 'Trà Bạch Mộc',
    sku: 'TEA-010',
    category: 'Trà Trắng',
    currentStock: 25,
    lowStockThreshold: 30,
    reservedStock: 5,
    availableStock: 20,
    status: 'low_stock',
    lastRestocked: '2024-02-05',
    totalSold: 150,
    averageMonthlySales: 50,
    estimatedDaysRemaining: 12,
  },
  {
    id: '6',
    productId: '11',
    productName: 'Trà Hoa Hồng',
    sku: 'TEA-011',
    category: 'Trà Hoa',
    currentStock: 55,
    lowStockThreshold: 30,
    reservedStock: 10,
    availableStock: 45,
    status: 'in_stock',
    lastRestocked: '2024-02-08',
    totalSold: 200,
    averageMonthlySales: 70,
    estimatedDaysRemaining: 19,
  },
  {
    id: '7',
    productId: '12',
    productName: 'Trà Chanh',
    sku: 'TEA-012',
    category: 'Trà Gia Vị',
    currentStock: 0,
    lowStockThreshold: 30,
    reservedStock: 0,
    availableStock: 0,
    status: 'out_of_stock',
    lastRestocked: '2024-01-10',
    totalSold: 180,
    averageMonthlySales: 60,
    estimatedDaysRemaining: 0,
  },
];

const InventoryManagement = (): JSX.Element => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove' | 'set'>('add');
  const [adjustmentAmount, setAdjustmentAmount] = useState(0);
  const [adjustmentReason, setAdjustmentReason] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  const filteredInventory = inventory.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  const stats = {
    totalProducts: inventory.length,
    inStock: inventory.filter((i) => i.status === 'in_stock').length,
    lowStock: inventory.filter((i) => i.status === 'low_stock').length,
    outOfStock: inventory.filter((i) => i.status === 'out_of_stock').length,
    totalStock: inventory.reduce((sum, i) => sum + i.currentStock, 0),
    totalValue: inventory.reduce((sum, i) => sum + (i.currentStock * 280000), 0),
  };

  const handleAdjustStock = (item: InventoryItem): void => {
    setSelectedItem(item);
    setAdjustmentType('add');
    setAdjustmentAmount(0);
    setAdjustmentReason('');
    setDialogOpen(true);
  };

  const handleBulkRestock = (): void => {
    const lowStockItems = inventory.filter((i) => i.status === 'low_stock' || i.status === 'out_of_stock');
    if (lowStockItems.length === 0) {
      toast.info('Không có sản phẩm cần nhập kho');
      return;
    }
    setSelectedIds(lowStockItems.map((i) => i.id));
    toast.info(`Đã chọn ${lowStockItems.length} sản phẩm để nhập kho`);
  };

  const handleSubmitAdjustment = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!selectedItem || adjustmentAmount <= 0) {
      toast.error(t('admin.inventory.enterValidQuantity'));
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      let newStock = selectedItem.currentStock;
      if (adjustmentType === 'add') {
        newStock += adjustmentAmount;
      } else if (adjustmentType === 'remove') {
        newStock = Math.max(0, newStock - adjustmentAmount);
      } else {
        newStock = adjustmentAmount;
      }

      const newStatus: InventoryItem['status'] =
        newStock === 0
          ? 'out_of_stock'
          : newStock < selectedItem.lowStockThreshold
          ? 'low_stock'
          : 'in_stock';

      setInventory((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                currentStock: newStock,
                availableStock: newStock - item.reservedStock,
                status: newStatus,
              }
            : item
        )
      );

      toast.success('Điều chỉnh tồn kho thành công');
      setDialogOpen(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: InventoryItem['status']): React.ReactNode => {
    const variants: Record<InventoryItem['status'], 'default' | 'secondary' | 'destructive'> = {
      in_stock: 'default',
      low_stock: 'secondary',
      out_of_stock: 'destructive',
    };

    const labels: Record<InventoryItem['status'], string> = {
      in_stock: 'Còn hàng',
      low_stock: 'Sắp hết',
      out_of_stock: 'Hết hàng',
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getDaysRemainingColor = (days: number): string => {
    if (days === 0) return 'text-red-600';
    if (days < 7) return 'text-red-600';
    if (days < 14) return 'text-orange-600';
    return 'text-green-600';
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const columns: Column<InventoryItem>[] = [
    {
      key: 'productName',
      title: 'Sản phẩm',
      sortable: true,
      render: (value: string, row: InventoryItem) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">SKU: {row.sku}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Danh mục',
      sortable: true,
    },
    {
      key: 'currentStock',
      title: 'Tồn kho',
      sortable: true,
      render: (value: number, row: InventoryItem) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">Đã đặt: {row.reservedStock}</div>
        </div>
      ),
    },
    {
      key: 'availableStock',
      title: 'Có sẵn',
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-blue-600">{value}</span>
      ),
    },
    {
      key: 'status',
      title: 'Trạng thái',
      sortable: true,
      render: (value: InventoryItem['status']) => getStatusBadge(value),
    },
    {
      key: 'estimatedDaysRemaining',
      title: 'Dự kiến còn',
      sortable: true,
      render: (value: number) => (
        <span className={`font-medium ${getDaysRemainingColor(value)}`}>
          {value === 0 ? 'Hết hàng' : `${value} ngày`}
        </span>
      ),
    },
    {
      key: 'averageMonthlySales',
      title: 'TB bán/tháng',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      title: 'Thao tác',
      sortable: false,
      render: (_: any, row: InventoryItem) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAdjustStock(row)}
          className="gap-1"
        >
          <Edit className="w-4 h-4" />
          Điều chỉnh
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.inventory.title')}</h1>
          <p className="text-sm text-gray-600 mt-1">{t('admin.inventory.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleBulkRestock}>
            <Plus className="w-4 h-4 mr-2" />
            {t('admin.inventory.restockLowStock')}
          </Button>
          <Button onClick={() => navigate('/admin/products')}>
            <Package className="w-4 h-4 mr-2" />
            {t('admin.inventory.manageProducts')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t('admin.inventory.totalProducts')}</CardTitle>
            <Package className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-gray-500 mt-1">{t('admin.inventory.managing')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t('admin.inventory.inStock')}</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.inStock}</div>
            <p className="text-xs text-gray-500 mt-1">{t('admin.inventory.products')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t('admin.inventory.lowStock')}</CardTitle>
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.lowStock}</div>
            <p className="text-xs text-gray-500 mt-1">{t('admin.inventory.needRestock')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t('admin.inventory.outOfStock')}</CardTitle>
            <TrendingDown className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
            <p className="text-xs text-gray-500 mt-1">{t('admin.inventory.products')}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('admin.inventory.inventoryList')}</CardTitle>
            <div className="flex items-center gap-3">
              <Select
                value={statusFilter}
                onValueChange={(value: any) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('admin.inventory.all')}</SelectItem>
                  <SelectItem value="in_stock">{t('admin.inventory.inStock')}</SelectItem>
                  <SelectItem value="low_stock">{t('admin.inventory.lowStock')}</SelectItem>
                  <SelectItem value="out_of_stock">{t('admin.inventory.outOfStock')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredInventory}
            columns={columns}
            searchable={true}
            searchPlaceholder={t('admin.inventory.searchCategory')}
            searchableFields={['productName', 'sku', 'category']}
            selectable={true}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            idField="id"
            pageSize={10}
            loading={loading}
            emptyMessage={t('admin.inventory.noProductsFound')}
          />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('admin.inventory.adjustStock')}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <form onSubmit={handleSubmitAdjustment} className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{selectedItem.productName}</p>
                <p className="text-sm text-gray-500">SKU: {selectedItem.sku}</p>
                <div className="mt-2 text-sm">
                  <span className="text-gray-600">{t('admin.inventory.currentStock')}: </span>
                  <span className="font-medium">{selectedItem.currentStock}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjustmentType">{t('admin.inventory.adjustmentType')}</Label>
                <Select
                  value={adjustmentType}
                  onValueChange={(value: any) => setAdjustmentType(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">{t('admin.inventory.addStock')}</SelectItem>
                    <SelectItem value="remove">{t('admin.inventory.removeStock')}</SelectItem>
                    <SelectItem value="set">{t('admin.inventory.setStock')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjustmentAmount">
                  {t('admin.inventory.quantity')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="adjustmentAmount"
                  type="number"
                  min="1"
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(parseInt(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjustmentReason">{t('admin.inventory.reason')}</Label>
                <Input
                  id="adjustmentReason"
                  placeholder={t('admin.inventory.reasonPlaceholder')}
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                {adjustmentType === 'add' && (
                  <p>{t('admin.inventory.newStock')}: {selectedItem.currentStock + adjustmentAmount}</p>
                )}
                {adjustmentType === 'remove' && (
                  <p>{t('admin.inventory.newStock')}: {Math.max(0, selectedItem.currentStock - adjustmentAmount)}</p>
                )}
                {adjustmentType === 'set' && (
                  <p>{t('admin.inventory.newStock')}: {adjustmentAmount}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t('admin.inventory.cancel')}
                </Button>
                <Button type="submit" disabled={loading || adjustmentAmount <= 0}>
                  {loading ? t('admin.inventory.saving') : t('admin.inventory.confirm')}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
