import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Plus, Grid, List, Search, Edit, Trash2, Share2, Heart, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Pagination } from "@/components/ui/pagination";
import { CollectionItemSkeleton } from "@/components/ui/skeleton";
import { SectionErrorBoundary } from "@/components/SectionErrorBoundary";
import { toast } from "sonner";

interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  coverImage: string;
  createdAt: string;
  isPublic: boolean;
}

interface CollectionItem {
  id: string;
  name: string;
  price: number;
  image: string;
  collectionId: string;
}

const Collection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCollection, setNewCollection] = useState({ name: "", description: "", isPublic: false });
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const mockCollections: Collection[] = [
    {
      id: "1",
      name: "我的茶单",
      description: "收藏的优质茶叶",
      itemCount: 12,
      coverImage: "/product-puerh-tea.jpg",
      createdAt: "2024-01-15",
      isPublic: false,
    },
    {
      id: "2",
      name: "珍藏酒类",
      description: "高端白酒收藏",
      itemCount: 8,
      coverImage: "/product-baijiu.jpg",
      createdAt: "2024-01-12",
      isPublic: true,
    },
    {
      id: "3",
      name: "节日礼物",
      description: "适合送礼的精选商品",
      itemCount: 15,
      coverImage: "/product-longjing.jpg",
      createdAt: "2024-01-10",
      isPublic: false,
    },
    {
      id: "4",
      name: "新品关注",
      description: "近期上架的新品",
      itemCount: 6,
      coverImage: "/product-tieguanyin.jpg",
      createdAt: "2024-01-08",
      isPublic: false,
    },
  ];

  const mockCollectionItems: CollectionItem[] = [
    { id: "1", name: "普洱古树茶饼", price: 580, image: "/product-puerh-tea.jpg", collectionId: "1" },
    { id: "2", name: "龙井特级", price: 680, image: "/product-longjing.jpg", collectionId: "1" },
    { id: "3", name: "铁观音", price: 480, image: "/product-tieguanyin.jpg", collectionId: "1" },
    { id: "4", name: "贵州茅台", price: 1499, image: "/product-baijiu.jpg", collectionId: "2" },
    { id: "5", name: "五粮液", price: 899, image: "/product-wuliangye.jpg", collectionId: "2" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("wishlist.searching"));
  };

  const handleCreateCollection = () => {
    if (!newCollection.name.trim()) {
      toast.error(t("collection.nameRequired"));
      return;
    }
    toast.success(t("collection.createdSuccess"));
    setNewCollection({ name: "", description: "", isPublic: false });
    setIsCreateDialogOpen(false);
  };

  const handleEditCollection = (collection: Collection) => {
    toast.success(t("collection.editCollection"));
  };

  const handleDeleteCollection = (collectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(t("collection.deletedSuccess"));
  };

  const handleShareCollection = (collectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(t("collection.linkCopied"));
  };

  const handleCollectionClick = (collection: Collection) => {
    setSelectedCollection(collection);
  };

  const handleBackToCollections = () => {
    setSelectedCollection(null);
  };

  const filteredCollections = mockCollections.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCollections.length / pageSize);
  const paginatedCollections = filteredCollections.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const collectionItems = selectedCollection
    ? mockCollectionItems.filter((item) => item.collectionId === selectedCollection.id)
    : [];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (selectedCollection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={handleBackToCollections}
            className="mb-6 gap-2"
          >
            <FolderOpen className="w-4 h-4" />
            {t("collection.backToCollections")}
          </Button>

          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-4">
                <div className="w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={selectedCollection.coverImage}
                    alt={selectedCollection.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                    {selectedCollection.name}
                  </h1>
                  <p className="text-muted-foreground mb-3">
                    {selectedCollection.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      {t("collection.itemCount", { count: selectedCollection.itemCount })}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {t("collection.createdAt")} {selectedCollection.createdAt}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => handleEditCollection(selectedCollection)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => handleShareCollection(selectedCollection.id, e)}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collectionItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden shadow-soft hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                <div className="aspect-square bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-lg font-bold text-wine">
                    ¥{item.price.toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              {t("collection.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("collection.subtitle")}
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("collection.createCollection")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("collection.newCollection")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("collection.collectionName")}
                  </label>
                  <Input
                    placeholder={t("collection.collectionNamePlaceholder")}
                    value={newCollection.name}
                    onChange={(e) =>
                      setNewCollection({ ...newCollection, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("collection.description")}
                  </label>
                  <Textarea
                    placeholder={t("collection.descriptionPlaceholder")}
                    value={newCollection.description}
                    onChange={(e) =>
                      setNewCollection({ ...newCollection, description: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="public"
                    checked={newCollection.isPublic}
                    onChange={(e) =>
                      setNewCollection({ ...newCollection, isPublic: e.target.checked })
                    }
                  />
                  <label htmlFor="public" className="text-sm text-foreground">
                    {t("collection.publicCollection")}
                  </label>
                </div>
                <Button onClick={handleCreateCollection} className="w-full">
                  {t("collection.create")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6 mb-6 shadow-soft">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder={t("collection.searchPlaceholder")}
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

        <SectionErrorBoundary>
          {isLoading ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <CollectionItemSkeleton key={i} />
            ))}
          </div>
        ) : filteredCollections.length === 0 ? (
          <Card className="p-12 text-center shadow-soft">
            <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {t("collection.empty")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? t("wishlist.noMatchFound") : t("collection.emptyMessage")}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                {t("collection.createCollection")}
              </Button>
            )}
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedCollections.map((collection) => (
              <Card
                key={collection.id}
                className="overflow-hidden shadow-soft hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleCollectionClick(collection)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCollectionClick(collection);
                  }
                }}
                aria-label={`${collection.name}，${collection.itemCount} 件商品`}
              >
                <div className="relative aspect-video bg-muted">
                  <img
                    src={collection.coverImage}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={(e) => handleEditCollection(collection)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={(e) => handleShareCollection(collection.id, e)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={(e) => handleDeleteCollection(collection.id, e)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {collection.isPublic && (
                    <Badge className="absolute top-3 right-3 bg-white text-black">
                      {t("collection.public")}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="gap-1">
                      <Heart className="w-3 h-3" />
                      {t("collection.itemCount", { count: collection.itemCount })}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {collection.createdAt}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedCollections.map((collection) => (
              <Card
                key={collection.id}
                className="p-4 shadow-soft hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCollectionClick(collection)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCollectionClick(collection);
                  }
                }}
                aria-label={`${collection.name}，${collection.itemCount} 件商品`}
              >
                <div className="flex gap-4">
                  <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={collection.coverImage}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">
                          {collection.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {collection.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {collection.isPublic && (
                          <Badge className="bg-white text-black">{t("collection.public")}</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="gap-1">
                          <Heart className="w-3 h-3" />
                          {t("collection.itemCount", { count: collection.itemCount })}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {t("collection.createdAt")} {collection.createdAt}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleEditCollection(collection)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleShareCollection(collection.id, e)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleDeleteCollection(collection.id, e)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && filteredCollections.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showSizeChanger
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              totalItems={filteredCollections.length}
            />
          </div>
        )}
        </SectionErrorBoundary>
      </div>
    </div>
  );
};

export default Collection;
