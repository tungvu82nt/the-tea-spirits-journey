import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, FolderTree, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  image?: string;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Trà Oolong',
    slug: 'tra-oolong',
    description: 'Các loại trà Oolong cao cấp từ Đài Loan và Trung Quốc',
    productCount: 15,
    status: 'active',
    createdAt: '2024-01-01',
    image: '/category-oolong.jpg',
  },
  {
    id: '2',
    name: 'Trà Xanh',
    slug: 'tra-xanh',
    description: 'Trà xanh Nhật Bản và các loại trà xanh khác',
    productCount: 20,
    status: 'active',
    createdAt: '2024-01-02',
    image: '/category-green.jpg',
  },
  {
    id: '3',
    name: 'Trà Đen',
    slug: 'tra-den',
    description: 'Các loại trà đen truyền thống và hiện đại',
    productCount: 12,
    status: 'active',
    createdAt: '2024-01-03',
    image: '/category-black.jpg',
  },
  {
    id: '4',
    name: 'Trà Trắng',
    slug: 'tra-trang',
    description: 'Trà trắng thượng hạng',
    productCount: 8,
    status: 'active',
    createdAt: '2024-01-04',
    image: '/category-white.jpg',
  },
  {
    id: '5',
    name: 'Trà Hoa',
    slug: 'tra-hoa',
    description: 'Các loại trà hoa thơm ngát',
    productCount: 18,
    status: 'active',
    createdAt: '2024-01-05',
    image: '/category-flower.jpg',
  },
  {
    id: '6',
    name: 'Trà Gia Vị',
    slug: 'tra-gia-vi',
    description: 'Trà kết hợp với các loại gia vị',
    productCount: 10,
    status: 'active',
    createdAt: '2024-01-06',
    image: '/category-spice.jpg',
  },
  {
    id: '7',
    name: 'Trà Đặc Biệt',
    slug: 'tra-dac-biet',
    description: 'Các loại trà đặc biệt và hiếm',
    productCount: 5,
    status: 'inactive',
    createdAt: '2024-01-07',
    image: '/category-special.jpg',
  },
];

const CategoryManagement = (): JSX.Element => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
  });

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (): void => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', status: 'active' });
    setDialogOpen(true);
  };

  const handleEditCategory = (category: Category): void => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      status: category.status,
    });
    setDialogOpen(true);
  };

  const handleDeleteCategory = (category: Category): void => {
    if (category.productCount > 0) {
      toast.error('Không thể xóa danh mục đang có sản phẩm');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${category.name}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
      toast.success('Đã xóa danh mục thành công');
    }
  };

  const handleToggleStatus = (category: Category): void => {
    const newStatus: Category['status'] = category.status === 'active' ? 'inactive' : 'active';
    setCategories((prev) =>
      prev.map((c) => (c.id === category.id ? { ...c, status: newStatus } : c))
    );
    toast.success(newStatus === 'active' ? t('admin.categories.activated') : t('admin.categories.deactivated'));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingCategory) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id
              ? { ...c, ...formData }
              : c
          )
        );
        toast.success('Cập nhật danh mục thành công');
      } else {
        const newCategory: Category = {
          id: String(categories.length + 1),
          ...formData,
          productCount: 0,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setCategories((prev) => [...prev, newCategory]);
        toast.success('Tạo danh mục thành công');
      }

      setDialogOpen(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (value: string): void => {
    setFormData({ ...formData, name: value, slug: generateSlug(value) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.categories.title')}</h1>
          <p className="text-sm text-gray-600 mt-1">{t('admin.categories.subtitle')}</p>
        </div>
        <Button onClick={handleAddCategory}>
          <Plus className="w-4 h-4 mr-2" />
          {t('admin.categories.addCategory')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('admin.categories.allCategories')}</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t('admin.categories.searchCategory')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FolderTree className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>{t('admin.categories.noCategoriesFound')}</p>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FolderTree className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <Badge variant={category.status === 'active' ? 'default' : 'secondary'}>
                          {category.status === 'active' ? t('admin.categories.active') : t('admin.categories.inactive')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{t('admin.categories.slug')}: {category.slug}</p>
                      {category.description && (
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{t('admin.categories.productCount')}</p>
                      <p className="text-lg font-semibold text-gray-900">{category.productCount}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">{t('admin.categories.openMenu')}</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t('admin.categories.actions')}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                        <Edit className="w-4 h-4 mr-2" />
                        {t('admin.categories.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(category)}>
                        {category.status === 'active' ? t('admin.categories.deactivate') : t('admin.categories.activate')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteCategory(category)}
                        className="text-red-600"
                        disabled={category.productCount > 0}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t('admin.categories.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? t('admin.categories.editCategory') : t('admin.categories.addNewCategory')}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('admin.categories.name')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder={t('admin.categories.namePlaceholder')}
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                {t('admin.categories.slug')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                placeholder={t('admin.categories.slugPlaceholder')}
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('admin.categories.description')}</Label>
              <Textarea
                id="description"
                placeholder={t('admin.categories.descriptionPlaceholder')}
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t('admin.categories.status')}</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">{t('admin.categories.active')}</option>
                <option value="inactive">{t('admin.categories.inactive')}</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                {t('admin.inventory.cancel')}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? t('admin.inventory.saving') : editingCategory ? t('admin.categories.save') : t('admin.categories.save')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
