import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, X, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ProductForm = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const productSchema = z.object({
    name: z.string().min(1, t('admin.productForm.nameRequired')).max(200, t('admin.productForm.nameMaxLength')),
    sku: z.string().min(1, t('admin.productForm.skuRequired')).max(50, t('admin.productForm.skuMaxLength')),
    category: z.string().min(1, t('admin.productForm.categoryRequired')),
    price: z.number().min(0, t('admin.productForm.priceMustBePositive')),
    comparePrice: z.number().min(0, t('admin.productForm.priceMustBePositive')).optional(),
    costPrice: z.number().min(0, t('admin.productForm.priceMustBePositive')).optional(),
    stock: z.number().int().min(0, t('admin.productForm.stockMustBePositive')),
    lowStockThreshold: z.number().int().min(0, t('admin.productForm.stockMustBePositive')),
    status: z.enum(['active', 'inactive', 'draft']),
    description: z.string().max(2000, t('admin.productForm.descriptionMaxLength')).optional(),
    shortDescription: z.string().max(500, t('admin.productForm.shortDescriptionMaxLength')).optional(),
    weight: z.number().min(0, t('admin.productForm.weightMustBePositive')).optional(),
    dimensions: z.object({
      length: z.number().min(0).optional(),
      width: z.number().min(0).optional(),
      height: z.number().min(0).optional(),
    }).optional(),
    tags: z.array(z.string()).optional(),
    images: z.array(z.string()).min(1, t('admin.productForm.atLeastOneImage')),
  });

  type ProductFormData = z.infer<typeof productSchema>;

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold: number;
  status: 'active' | 'inactive' | 'draft';
  description?: string;
  shortDescription?: string;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  tags?: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const mockProduct: Product = {
  id: '1',
  name: 'Trà Oolong Đài Loan',
  sku: 'TEA-001',
  category: 'Trà Oolong',
  price: 280000,
  comparePrice: 320000,
  costPrice: 150000,
  stock: 150,
  lowStockThreshold: 30,
  status: 'active',
  description: 'Trà Oolong Đài Loan cao cấp được thu hoạch từ những đồi chè nổi tiếng tại Đài Loan. Với hương thơm thanh khiết và vị ngọt hậu sâu lắng, đây là loại trà được ưa chuộng nhất trong các dòng trà Oolong.',
  shortDescription: 'Trà Oolong Đài Loan cao cấp với hương thơm thanh khiết và vị ngọt hậu sâu lắng.',
  weight: 100,
  dimensions: {
    length: 10,
    width: 8,
    height: 5,
  },
  tags: ['organic', 'premium', 'taiwan'],
  images: ['/placeholder-product-1.jpg'],
  createdAt: '2024-01-10',
  updatedAt: '2024-01-15',
};

const categories = [
  'Trà Oolong',
  'Trà Xanh',
  'Trà Đen',
  'Trà Trắng',
  'Trà Hoa',
  'Trà Gia Vị',
  'Trà Đặc Biệt',
];

const ProductForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      category: '',
      price: 0,
      stock: 0,
      lowStockThreshold: 30,
      status: 'draft',
      tags: [],
      images: [],
    },
  });

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      setTimeout(() => {
        setProduct(mockProduct);
        setImages(mockProduct.images);
        setValue('name', mockProduct.name);
        setValue('sku', mockProduct.sku);
        setValue('category', mockProduct.category);
        setValue('price', mockProduct.price);
        setValue('comparePrice', mockProduct.comparePrice || 0);
        setValue('costPrice', mockProduct.costPrice || 0);
        setValue('stock', mockProduct.stock);
        setValue('lowStockThreshold', mockProduct.lowStockThreshold);
        setValue('status', mockProduct.status);
        setValue('description', mockProduct.description);
        setValue('shortDescription', mockProduct.shortDescription);
        setValue('weight', mockProduct.weight || 0);
        setValue('dimensions', mockProduct.dimensions);
        setValue('tags', mockProduct.tags);
        setValue('images', mockProduct.images);
        setLoading(false);
      }, 500);
    }
  }, [isEditing, setValue]);

  const onSubmit = async (data: ProductFormData): Promise<void> => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(isEditing ? t('admin.productForm.updateSuccess') : t('admin.productForm.createSuccess'));
      navigate('/admin/products');
    } catch (error) {
      toast.error(t('admin.productForm.errorSaving'));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (): void => {
    const newImage = `/placeholder-image-${Date.now()}.jpg`;
    setImages([...images, newImage]);
    setValue('images', [...images, newImage]);
  };

  const handleRemoveImage = (index: number): void => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue('images', newImages);
  };

  const handleAddTag = (): void => {
    const tag = tagInput.trim();
    if (tag && !watch('tags')?.includes(tag)) {
      setValue('tags', [...(watch('tags') || []), tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string): void => {
    setValue('tags', (watch('tags') || []).filter((t) => t !== tag));
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/products')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? t('admin.productForm.editProduct') : t('admin.productForm.addProduct')}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {isEditing ? t('admin.productForm.updateInfo') : t('admin.productForm.fillInfo')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate('/admin/products')}>
            <X className="w-4 h-4 mr-2" />
            {t('admin.productForm.cancel')}
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? t('admin.productForm.saving') : isEditing ? t('admin.productForm.update') : t('admin.productForm.saveProduct')}
          </Button>
        </div>
      </div>

      {loading && isEditing ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">{t('admin.productForm.loading')}</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.productForm.basicInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {t('admin.productForm.name')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder={t('admin.productForm.namePlaceholder')}
                        {...register('name')}
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku">
                        SKU <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="sku"
                        placeholder={t('admin.productForm.skuPlaceholder')}
                        {...register('sku')}
                      />
                      {errors.sku && <p className="text-sm text-red-500">{errors.sku.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      {t('admin.productForm.category')} <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={watch('category')}
                      onValueChange={(value) => setValue('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('admin.productForm.selectCategory')} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">{t('admin.productForm.shortDescription')}</Label>
                    <Textarea
                      id="shortDescription"
                      placeholder={t('admin.productForm.shortDescriptionPlaceholder')}
                      rows={2}
                      {...register('shortDescription')}
                    />
                    {errors.shortDescription && (
                      <p className="text-sm text-red-500">{errors.shortDescription.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t('admin.productForm.description')}</Label>
                    <Textarea
                      id="description"
                      placeholder={t('admin.productForm.descriptionPlaceholder')}
                      rows={6}
                      {...register('description')}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.productForm.pricing')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        {t('admin.productForm.price')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        {...register('price', { valueAsNumber: true })}
                      />
                      {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comparePrice">{t('admin.productForm.comparePrice')}</Label>
                      <Input
                        id="comparePrice"
                        type="number"
                        placeholder="0"
                        {...register('comparePrice', { valueAsNumber: true })}
                      />
                      {errors.comparePrice && (
                        <p className="text-sm text-red-500">{errors.comparePrice.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="costPrice">{t('admin.productForm.costPrice')}</Label>
                      <Input
                        id="costPrice"
                        type="number"
                        placeholder="0"
                        {...register('costPrice', { valueAsNumber: true })}
                      />
                      {errors.costPrice && (
                        <p className="text-sm text-red-500">{errors.costPrice.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">
                        {t('admin.productForm.stock')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="0"
                        {...register('stock', { valueAsNumber: true })}
                      />
                      {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lowStockThreshold">{t('admin.productForm.lowStockThreshold')}</Label>
                      <Input
                        id="lowStockThreshold"
                        type="number"
                        placeholder="30"
                        {...register('lowStockThreshold', { valueAsNumber: true })}
                      />
                      {errors.lowStockThreshold && (
                        <p className="text-sm text-red-500">{errors.lowStockThreshold.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.productForm.shipping')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">{t('admin.productForm.weight')}</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="0"
                        {...register('weight', { valueAsNumber: true })}
                      />
                      {errors.weight && <p className="text-sm text-red-500">{errors.weight.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="length">{t('admin.productForm.length')}</Label>
                      <Input
                        id="length"
                        type="number"
                        placeholder="0"
                        {...register('dimensions.length', { valueAsNumber: true })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">{t('admin.productForm.width')}</Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder="0"
                        {...register('dimensions.width', { valueAsNumber: true })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">{t('admin.productForm.height')}</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="0"
                        {...register('dimensions.height', { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.productForm.images')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleImageUpload}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t('admin.productForm.addImage')}
                  </Button>
                  {errors.images && <p className="text-sm text-red-500">{errors.images.message}</p>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.productForm.tags')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder={t('admin.productForm.tagPlaceholder')}
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button type="button" variant="outline" onClick={handleAddTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {watch('tags')?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.productForm.status')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">{t('admin.productForm.status')}</Label>
                    <Select
                      value={watch('status')}
                      onValueChange={(value) => setValue('status', value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">{t('admin.productForm.active')}</SelectItem>
                        <SelectItem value="inactive">{t('admin.productForm.inactive')}</SelectItem>
                        <SelectItem value="draft">{t('admin.productForm.draft')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductForm;
