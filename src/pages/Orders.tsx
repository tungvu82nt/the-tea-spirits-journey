import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Filter, ChevronRight, Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/ui/pagination";
import { OrderCardSkeleton } from "@/components/ui/skeleton";
import { SectionErrorBoundary } from "@/components/SectionErrorBoundary";
import { toast } from "sonner";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
  itemsPreview: Array<{
    name: string;
    image: string;
    quantity: number;
  }>;
}

const Orders = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001234",
      date: "2024-01-15",
      status: "delivered",
      total: 1299,
      items: 3,
      itemsPreview: [
        { name: "普洱古树茶饼", image: "/product-puerh-tea.jpg", quantity: 2 },
        { name: "贵州茅台", image: "/product-baijiu.jpg", quantity: 1 },
      ],
    },
    {
      id: "2",
      orderNumber: "ORD-2024-001233",
      date: "2024-01-12",
      status: "shipped",
      total: 899,
      items: 2,
      itemsPreview: [
        { name: "龙井特级", image: "/product-longjing.jpg", quantity: 1 },
        { name: "五粮液", image: "/product-wuliangye.jpg", quantity: 1 },
      ],
    },
    {
      id: "3",
      orderNumber: "ORD-2024-001232",
      date: "2024-01-10",
      status: "processing",
      total: 599,
      items: 1,
      itemsPreview: [
        { name: "铁观音", image: "/product-tieguanyin.jpg", quantity: 1 },
      ],
    },
    {
      id: "4",
      orderNumber: "ORD-2024-001231",
      date: "2024-01-08",
      status: "pending",
      total: 2499,
      items: 4,
      itemsPreview: [
        { name: "大红袍", image: "/product-dahongpao.jpg", quantity: 2 },
        { name: "剑南春", image: "/product-jiannanchun.jpg", quantity: 2 },
      ],
    },
    {
      id: "5",
      orderNumber: "ORD-2024-001230",
      date: "2024-01-05",
      status: "cancelled",
      total: 399,
      items: 1,
      itemsPreview: [
        { name: "黄山毛峰", image: "/product-huangshan.jpg", quantity: 1 },
      ],
    },
  ];

  const getStatusConfig = (status: OrderStatus) => {
    const configs = {
      pending: {
        label: t("orders.pending"),
        icon: Clock,
        color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      },
      processing: {
        label: t("orders.processing"),
        icon: Package,
        color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      },
      shipped: {
        label: t("orders.shipped"),
        icon: Truck,
        color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      },
      delivered: {
        label: t("orders.delivered"),
        icon: CheckCircle,
        color: "bg-green-100 text-green-800 hover:bg-green-200",
      },
      cancelled: {
        label: t("orders.cancelled"),
        icon: XCircle,
        color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      },
    };
    return configs[status];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("orders.searchPlaceholder"));
  };

  const handleOrderClick = (orderId: string) => {
    navigate(`/account/orders/${orderId}`);
  };

  const handleReorder = (e: React.MouseEvent, orderNumber: string) => {
    e.stopPropagation();
    toast.success(`${t("orders.reorder")} ${orderNumber}`);
  };

  const handleCancelOrder = (e: React.MouseEvent, orderNumber: string) => {
    e.stopPropagation();
    toast.success(`${t("orders.cancelOrder")} ${orderNumber}`);
  };

  const filteredOrders = mockOrders.filter((order) => {
    const matchesTab = activeTab === "all" || order.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            {t("orders.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("orders.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl shadow-soft p-6 mb-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={t("orders.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  {t("orders.filter")}
                </Button>
              </form>
            </div>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as OrderStatus | "all")} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="all">{t("orders.allOrders")}</TabsTrigger>
                <TabsTrigger value="pending">{t("orders.pending")}</TabsTrigger>
                <TabsTrigger value="processing">{t("orders.processing")}</TabsTrigger>
                <TabsTrigger value="shipped">{t("orders.shipped")}</TabsTrigger>
                <TabsTrigger value="delivered">{t("orders.delivered")}</TabsTrigger>
                <TabsTrigger value="cancelled">{t("orders.cancelled")}</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                <SectionErrorBoundary>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <OrderCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : filteredOrders.length === 0 ? (
                  <Card className="p-12 text-center">
                    <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t("orders.noOrders")}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery ? t("orders.noMatchingOrders") : t("orders.youHaveNoOrders")}
                    </p>
                    {!searchQuery && (
                      <Button onClick={() => navigate("/shop")}>
                        {t("orders.startShopping")}
                      </Button>
                    )}
                  </Card>
                ) : (
                  <>
                    {paginatedOrders.map((order) => {
                      const statusConfig = getStatusConfig(order.status);
                      const StatusIcon = statusConfig.icon;

                      return (
                        <Card
                          key={order.id}
                          className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => handleOrderClick(order.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleOrderClick(order.id);
                            }
                          }}
                          aria-label={`${t("orders.orderNumber")} ${order.orderNumber}, ${t("orders.status")}: ${statusConfig.label}`}
                        >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium text-foreground">
                                {order.orderNumber}
                              </h3>
                              <Badge className={statusConfig.color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {t("orders.date")}: {order.date}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>

                        <div className="flex gap-4 mb-4">
                          {order.itemsPreview.map((item, idx) => (
                            <div key={idx} className="relative">
                              <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {idx === order.itemsPreview.length - 1 && order.items > order.itemsPreview.length && (
                                <div className="absolute -top-1 -right-1 bg-foreground text-background text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                  +{order.items - order.itemsPreview.length}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <Separator className="my-4" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {t("orders.itemsCount", { count: order.items })}
                            </span>
                            <span className="text-lg font-bold text-wine">
                              ¥{order.total.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {order.status === "pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => handleCancelOrder(e, order.orderNumber)}
                                >
                                  {t("orders.cancelOrder")}
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={(e) => handleReorder(e, order.orderNumber)}
                                >
                                  {t("orders.payNow")}
                                </Button>
                              </>
                            )}
                            {order.status === "delivered" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => handleReorder(e, order.orderNumber)}
                              >
                                {t("orders.reorder")}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOrderClick(order.id)}
                            >
                              {t("orders.viewDetails")}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                  </>
                )}

                {!isLoading && filteredOrders.length > 0 && (
                  <div className="mt-6">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      showSizeChanger
                      pageSize={pageSize}
                      onPageSizeChange={setPageSize}
                      totalItems={filteredOrders.length}
                    />
                  </div>
                )}
                </SectionErrorBoundary>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 shadow-soft">
              <h3 className="font-medium text-foreground mb-4">{t("orders.orderStatistics")}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("orders.allOrders")}</span>
                  <span className="font-medium">{mockOrders.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("orders.pending")}</span>
                  <span className="font-medium text-yellow-600">
                    {mockOrders.filter((o) => o.status === "pending").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("orders.processing")}</span>
                  <span className="font-medium text-blue-600">
                    {mockOrders.filter((o) => o.status === "processing").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("orders.shipped")}</span>
                  <span className="font-medium text-purple-600">
                    {mockOrders.filter((o) => o.status === "shipped").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("orders.delivered")}</span>
                  <span className="font-medium text-green-600">
                    {mockOrders.filter((o) => o.status === "delivered").length}
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t("orders.totalSpent")}</span>
                <span className="font-bold text-wine">
                  ¥{mockOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
