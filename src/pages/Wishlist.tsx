import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, ShoppingCart, Trash2, Filter, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/ui/pagination";
import { WishlistItemSkeleton } from "@/components/ui/skeleton";
import { SectionErrorBoundary } from "@/components/SectionErrorBoundary";
import { toast } from "sonner";

type ProductType = "tea" | "liquor" | "all";

interface WishlistItem {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  addedDate: string;
  category: string;
  specifications?: string;
}

const Wishlist = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ProductType | "all">("all");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const mockWishlistItems: WishlistItem[] = [
    {
      id: "1",
      name: "普洱古树茶饼 357g",
      type: "tea",
      price: 580,
      originalPrice: 680,
      image: "/product-puerh-tea.jpg",
      inStock: true,
      addedDate: "2024-01-15",
      category: "普洱茶",
      specifications: "2018年陈化",
    },
    {
      id: "2",
      name: "贵州茅台 53度 500ml",
      type: "liquor",
      price: 1499,
      image: "/product-baijiu.jpg",
      inStock: true,
      addedDate: "2024-01-14",
      category: "白酒",
      specifications: "飞天茅台",
    },
    {
      id: "3",
      name: "龙井特级 250g",
      type: "tea",
      price: 680,
      originalPrice: 780,
      image: "/product-longjing.jpg",
      inStock: false,
      addedDate: "2024-01-13",
      category: "绿茶",
      specifications: "明前茶",
    },
    {
      id: "4",
      name: "五粮液 52度 500ml",
      type: "liquor",
      price: 899,
      originalPrice: 999,
      image: "/product-wuliangye.jpg",
      inStock: true,
      addedDate: "2024-01-12",
      category: "白酒",
    },
    {
      id: "5",
      name: "铁观音 250g",
      type: "tea",
      price: 480,
      image: "/product-tieguanyin.jpg",
      inStock: true,
      addedDate: "2024-01-11",
      category: "乌龙茶",
      specifications: "浓香型",
    },
    {
      id: "6",
      name: "剑南春 52度 500ml",
      type: "liquor",
      price: 680,
      image: "/product-jiannanchun.jpg",
      inStock: true,
      addedDate: "2024-01-10",
      category: "白酒",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("wishlist.searching"));
  };

  const handleAddToCart = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(t("cart.added"));
  };

  const handleAddAllToCart = () => {
    const inStockItems = filteredItems.filter((item) => item.inStock);
    toast.success(`${inStockItems.length} ${t("cart.item")} ${t("cart.appliedCoupon")}`);
  };

  const handleRemoveFromWishlist = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(t("wishlist.remove"));
  };

  const handleRemoveSelected = () => {
    toast.success(`${t("wishlist.selected")}`);
    setSelectedItems(new Set());
  };

  const handleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map((item) => item.id)));
    }
  };

  const handleProductClick = (itemId: string) => {
    navigate(`/products/${itemId}`);
  };

  const filteredItems = mockWishlistItems.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const inStockItems = filteredItems.filter((item) => item.inStock);
  const totalPrice = inStockItems.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display text-4xl font-bold text-foreground">
              {t("wishlist.title")}
            </h1>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {t("wishlist.itemCount", { count: mockWishlistItems.length })}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {t("wishlist.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="p-6 mb-6 shadow-soft">
              <div className="flex flex-col sm:flex-row gap-4">
                <form onSubmit={handleSearch} className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={t("wishlist.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </form>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-wine text-white" : ""}
                  >
                    <Grid className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-wine text-white" : ""}
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ProductType | "all")} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">{t("wishlist.allProducts")}</TabsTrigger>
                <TabsTrigger value="tea">{t("wishlist.tea")}</TabsTrigger>
                <TabsTrigger value="liquor">{t("wishlist.liquor")}</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <SectionErrorBoundary>
                  {isLoading ? (
                  <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <WishlistItemSkeleton key={i} />
                    ))}
                  </div>
                ) : filteredItems.length === 0 ? (
                  <Card className="p-12 text-center shadow-soft">
                    <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t("wishlist.empty")}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery ? t("wishlist.noMatchFound") : t("wishlist.emptyMessage")}
                    </p>
                    {!searchQuery && (
                      <Button onClick={() => navigate("/shop")}>
                        {t("wishlist.startShopping")}
                      </Button>
                    )}
                  </Card>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.size === paginatedItems.length}
                          onChange={handleSelectAll}
                          className="w-4 h-4"
                          aria-label={t("common.selectAll")}
                        />
                        <span className="text-sm text-muted-foreground">
                          {t("wishlist.selected", { count: selectedItems.size })}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {selectedItems.size > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveSelected}
                            className="gap-2"
                            aria-label={t("wishlist.removeSelected")}
                          >
                            <Trash2 className="w-4 h-4" />
                            {t("wishlist.removeSelected")}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={handleAddAllToCart}
                          disabled={inStockItems.length === 0}
                          className="gap-2"
                          aria-label={t("wishlist.addAllToCart")}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {t("wishlist.addAllToCart")}
                        </Button>
                      </div>
                    </div>

                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedItems.map((item) => (
                          <Card
                            key={item.id}
                            className="overflow-hidden shadow-soft hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleProductClick(item.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handleProductClick(item.id);
                              }
                            }}
                            aria-label={`${item.name}，价格：¥${item.price}`}
                          >
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedItems.has(item.id)}
                                onChange={() => handleSelectItem(item.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-3 left-3 z-10 w-4 h-4"
                              />
                              <div className="aspect-square bg-muted">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {!item.inStock && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <Badge className="bg-white text-black">{t("wishlist.outOfStock")}</Badge>
                                </div>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                                onClick={(e) => handleRemoveFromWishlist(item.id, e)}
                              >
                                <Heart className="w-5 h-5 text-wine fill-wine" />
                              </Button>
                            </div>
                            <div className="p-4">
                              <Badge variant="secondary" className="mb-2">
                                {item.category}
                              </Badge>
                              <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                                {item.name}
                              </h3>
                              {item.specifications && (
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.specifications}
                                </p>
                              )}
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-lg font-bold text-wine">
                                    ¥{item.price.toLocaleString()}
                                  </p>
                                  {item.originalPrice && (
                                    <p className="text-sm text-muted-foreground line-through">
                                      ¥{item.originalPrice.toLocaleString()}
                                    </p>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  onClick={(e) => handleAddToCart(item.id, e)}
                                  disabled={!item.inStock}
                                >
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  {t("wishlist.addToCart")}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {paginatedItems.map((item) => (
                          <Card
                            key={item.id}
                            className="p-4 shadow-soft hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleProductClick(item.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handleProductClick(item.id);
                              }
                            }}
                            aria-label={`${item.name}，价格：¥${item.price}`}
                          >
                            <div className="flex gap-4">
                              <input
                                type="checkbox"
                                checked={selectedItems.has(item.id)}
                                onChange={() => handleSelectItem(item.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 mt-4"
                              />
                              <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <Badge variant="secondary" className="mb-2">
                                      {item.category}
                                    </Badge>
                                    <h3 className="font-medium text-foreground">
                                      {item.name}
                                    </h3>
                                    {item.specifications && (
                                      <p className="text-sm text-muted-foreground">
                                        {item.specifications}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => handleRemoveFromWishlist(item.id, e)}
                                  >
                                    <Heart className="w-5 h-5 text-wine fill-wine" />
                                  </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-lg font-bold text-wine">
                                      ¥{item.price.toLocaleString()}
                                    </p>
                                    {item.originalPrice && (
                                      <p className="text-sm text-muted-foreground line-through">
                                        ¥{item.originalPrice.toLocaleString()}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    {!item.inStock && (
                                      <Badge className="bg-gray-100 text-gray-800">
                                        {t("wishlist.outOfStock")}
                                      </Badge>
                                    )}
                                    <Button
                                      size="sm"
                                      onClick={(e) => handleAddToCart(item.id, e)}
                                      disabled={!item.inStock}
                                    >
                                      <ShoppingCart className="w-4 h-4 mr-1" />
                                      {t("wishlist.addToCart")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {!isLoading && filteredItems.length > 0 && (
                  <div className="mt-6">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      showSizeChanger
                      pageSize={pageSize}
                      onPageSizeChange={setPageSize}
                      totalItems={filteredItems.length}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
