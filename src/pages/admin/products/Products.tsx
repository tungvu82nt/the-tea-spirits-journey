import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Package, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable, Column } from '@/components/admin/DataTable';
import { SkeletonTable } from '@/components/admin/Skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { showUndoToast } from '@/lib/undo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  image?: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Trà Oolong Đài Loan',
    sku: 'TEA-001',
    category: 'Trà Oolong',
    price: 280000,
    stock: 150,
    status: 'active',
    createdAt: '2024-01-10',
    image: '/placeholder-product-1.jpg',
  },
  {
    id: '2',
    name: 'Trà Xanh Nhật Bản',
    sku: 'TEA-002',
    category: 'Trà Xanh',
    price: 320000,
    stock: 89,
    status: 'active',
    createdAt: '2024-01-12',
    image: '/placeholder-product-2.jpg',
  },
  {
    id: '3',
    name: 'Trà Hoa Cúc',
    sku: 'TEA-003',
    category: 'Trà Hoa',
    price: 180000,
    stock: 200,
    status: 'active',
    createdAt: '2024-01-15',
    image: '/placeholder-product-3.jpg',
  },
  {
    id: '4',
    name: 'Trà Sen',
    sku: 'TEA-004',
    category: 'Trà Hoa',
    price: 220000,
    stock: 45,
    status: 'inactive',
    createdAt: '2024-01-18',
    image: '/placeholder-product-4.jpg',
  },
  {
    id: '5',
    name: 'Trà Pu-erh',
    sku: 'TEA-005',
    category: 'Trà Đen',
    price: 450000,
    stock: 30,
    status: 'active',
    createdAt: '2024-01-20',
    image: '/placeholder-product-5.jpg',
  },
  {
    id: '6',
    name: 'Trà Lài',
    sku: 'TEA-006',
    category: 'Trà Hoa',
    price: 195000,
    stock: 120,
    status: 'draft',
    createdAt: '2024-01-22',
    image: '/placeholder-product-6.jpg',
  },
  {
    id: '7',
    name: 'Trà Gừng',
    sku: 'TEA-007',
    category: 'Trà Gia Vị',
    price: 165000,
    stock: 75,
    status: 'active',
    createdAt: '2024-01-25',
    image: '/placeholder-product-7.jpg',
  },
  {
    id: '8',
    name: 'Trà Quế',
    sku: 'TEA-008',
    category: 'Trà Gia Vị',
    price: 175000,
    stock: 60,
    status: 'active',
    createdAt: '2024-01-28',
    image: '/placeholder-product-8.jpg',
  },
  {
    id: '9',
    name: 'Trà Hồng',
    sku: 'TEA-009',
    category: 'Trà Đen',
    price: 240000,
    stock: 95,
    status: 'active',
    createdAt: '2024-02-01',
    image: '/placeholder-product-9.jpg',
  },
  {
    id: '10',
    name: 'Trà Bạch Mộc',
    sku: 'TEA-010',
    category: 'Trà Trắng',
    price: 380000,
    stock: 25,
    status: 'active',
    createdAt: '2024-02-05',
    image: '/placeholder-product-10.jpg',
  },
  {
    id: '11',
    name: 'Trà Hoa Hồng',
    sku: 'TEA-011',
    category: 'Trà Hoa',
    price: 210000,
    stock: 55,
    status: 'active',
    createdAt: '2024-02-08',
    image: '/placeholder-product-11.jpg',
  },
  {
    id: '12',
    name: 'Trà Chanh',
    sku: 'TEA-012',
    category: 'Trà Gia Vị',
    price: 155000,
    stock: 110,
    status: 'inactive',
    createdAt: '2024-02-10',
    image: '/placeholder-product-12.jpg',
  },
];

const ProductList = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = (): void => {
    navigate('/admin/products/new');
  };

  const handleEditProduct = (product: Product): void => {
    navigate(`/admin/products/${product.id}/edit`);
  };

  const handleViewProduct = (product: Product): void => {
    navigate(`/admin/products/${product.id}`);
  };

  const handleDeleteProduct = (product: Product): void => {
    if (confirm(t('admin.confirmDeleteProduct', { name: product.name }))) {
      const deletedProducts = products.filter((p) => p.id !== product.id);
      setProducts(deletedProducts);
      
      showUndoToast(t('admin.productDeleted'), () => {
        setProducts(deletedProducts);
      });
    }
  };

  const handleBulkDelete = (): void => {
    if (confirm(t('admin.confirmBulkDelete', { count: selectedIds.length }))) {
      const deletedProducts = products.filter((p) => !selectedIds.includes(p.id));
      setProducts(deletedProducts);
      setSelectedIds([]);
      
      showUndoToast(t('admin.productsDeleted', { count: selectedIds.length }), () => {
        setProducts(deletedProducts);
        setSelectedIds([]);
      });
    }
  };

  const handleToggleStatus = (product: Product): void => {
    const newStatus: Product['status'] = product.status === 'active' ? 'inactive' : 'active';
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p))
    );
    toast.success(newStatus === 'active' ? t('admin.productActivated') : t('admin.productDeactivated'));
  };

  const getStatusBadge = (status: Product['status']): React.ReactNode => {
    const variants: Record<Product['status'], 'default' | 'secondary' | 'outline'> = {
      active: 'default',
      inactive: 'secondary',
      draft: 'outline',
    };

    const labels: Record<Product['status'], string> = {
      active: t('admin.statusActive'),
      inactive: t('admin.statusInactive'),
      draft: t('admin.statusDraft'),
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getStockStatus = (stock: number): React.ReactNode => {
    if (stock === 0) {
      return <span className="text-red-600 font-medium">{t('admin.stockOut')}</span>;
    }
    if (stock < 30) {
      return <span className="text-orange-600 font-medium">{t('admin.stockLow')}</span>;
    }
    return <span className="text-green-600 font-medium">{stock}</span>;
  };

  const columns: Column<Product>[] = [
    {
      key: 'image',
      title: t('admin.productImage'),
      sortable: false,
      width: '80px',
      render: (value: string) => (
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
          {value ? (
            <img src={value} alt="Product" className="w-full h-full object-cover" />
          ) : (
            <Package className="w-6 h-6 text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: 'name',
      title: t('admin.productName'),
      sortable: true,
      render: (value: string, row: Product) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">SKU: {row.sku}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: t('admin.productCategory'),
      sortable: true,
    },
    {
      key: 'price',
      title: t('admin.productPrice'),
      sortable: true,
      render: (value: number) => <span className="font-medium">{formatPrice(value)}</span>,
    },
    {
      key: 'stock',
      title: t('admin.productStock'),
      sortable: true,
      render: (value: number) => getStockStatus(value),
    },
    {
      key: 'status',
      title: t('admin.productStatus'),
      sortable: true,
      render: (value: Product['status']) => getStatusBadge(value),
    },
    {
      key: 'createdAt',
      title: t('common.createdAt'),
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('vi-VN'),
    },
    {
      key: 'actions',
      title: t('admin.actions'),
      sortable: false,
      width: '100px',
      render: (_: any, row: Product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">{t('admin.openMenu')}</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('admin.actions')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleViewProduct(row)}>
              <Eye className="w-4 h-4 mr-2" />
              {t('admin.viewDetails')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditProduct(row)}>
              <Edit className="w-4 h-4 mr-2" />
              {t('admin.editProduct')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleStatus(row)}>
              {row.status === 'active' ? t('admin.deactivate') : t('admin.activate')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDeleteProduct(row)} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              {t('admin.deleteProduct')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.manageProducts')}</h1>
          <p className="text-sm text-gray-600 mt-1">{t('admin.manageProductList')}</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <Button variant="outline" onClick={handleBulkDelete} className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              {t('admin.delete')} ({selectedIds.length})
            </Button>
          )}
          <Button onClick={handleAddProduct}>
            <Plus className="w-4 h-4 mr-2" />
            {t('admin.addProduct')}
          </Button>
        </div>
      </div>

      {loading ? (
        <SkeletonTable rows={10} columns={7} />
      ) : (
        <DataTable
          data={products}
          columns={columns}
          searchable={true}
          searchPlaceholder={t('admin.searchPlaceholder')}
          searchableFields={['name', 'sku', 'category']}
          selectable={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          idField="id"
          pageSize={10}
          loading={loading}
          emptyMessage={t('admin.noProductsFound')}
        />
      )}
    </div>
  );
};

export default ProductList;
