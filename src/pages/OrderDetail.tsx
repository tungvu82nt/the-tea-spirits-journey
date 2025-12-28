import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, Copy, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  specifications?: string;
}

interface OrderDetail {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  paymentMethod: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  timeline: Array<{
    status: string;
    date: string;
    description: string;
    completed: boolean;
  }>;
}

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [isCopied, setIsCopied] = useState(false);

  const mockOrder: OrderDetail = {
    id: "1",
    orderNumber: "ORD-2024-001234",
    date: "2024-01-15 14:30:25",
    status: "shipped",
    total: 1299,
    subtotal: 1250,
    shipping: 49,
    discount: 0,
    paymentMethod: "支付宝",
    shippingAddress: {
      name: "张三",
      phone: "138****8888",
      address: "朝阳区建国路88号",
      city: "北京市",
      province: "北京市",
      postalCode: "100025",
    },
    items: [
      {
        id: "1",
        name: "普洱古树茶饼 357g",
        image: "/product-puerh-tea.jpg",
        price: 580,
        quantity: 2,
        specifications: "2018年陈化",
      },
      {
        id: "2",
        name: "贵州茅台 53度 500ml",
        image: "/product-baijiu.jpg",
        price: 90,
        quantity: 1,
        specifications: "飞天茅台",
      },
    ],
    trackingNumber: "SF1234567890",
    estimatedDelivery: "2024-01-18",
    timeline: [
      {
        status: "pending",
        date: "2024-01-15 14:30:25",
        description: "订单已创建，等待付款",
        completed: true,
      },
      {
        status: "processing",
        date: "2024-01-15 14:35:12",
        description: "付款成功，订单处理中",
        completed: true,
      },
      {
        status: "shipped",
        date: "2024-01-16 10:20:00",
        description: "商品已发货，顺丰快递承运",
        completed: true,
      },
      {
        status: "delivered",
        date: "预计 2024-01-18",
        description: "等待收货",
        completed: false,
      },
    ],
  };

  const getStatusConfig = (status: OrderStatus) => {
    const configs = {
      pending: {
        label: "待付款",
        icon: Clock,
        color: "bg-yellow-100 text-yellow-800",
      },
      processing: {
        label: "处理中",
        icon: Package,
        color: "bg-blue-100 text-blue-800",
      },
      shipped: {
        label: "已发货",
        icon: Truck,
        color: "bg-purple-100 text-purple-800",
      },
      delivered: {
        label: "已送达",
        icon: CheckCircle,
        color: "bg-green-100 text-green-800",
      },
      cancelled: {
        label: "已取消",
        icon: XCircle,
        color: "bg-gray-100 text-gray-800",
      },
    };
    return configs[status];
  };

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(mockOrder.orderNumber);
    setIsCopied(true);
    toast.success("订单号已复制");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTrackPackage = () => {
    toast.success("正在跳转到物流追踪页面...");
  };

  const handleContactSupport = () => {
    toast.success("正在打开客服对话框...");
  };

  const handleCancelOrder = () => {
    toast.success("订单已取消");
    navigate("/account/orders");
  };

  const handleReorder = () => {
    toast.success("商品已添加到购物车");
    navigate("/cart");
  };

  const statusConfig = getStatusConfig(mockOrder.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/account/orders")}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回订单列表
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                订单详情
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">
                  订单号: {mockOrder.orderNumber}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyOrderNumber}
                  className="h-6 px-2 gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {isCopied ? "已复制" : "复制"}
                </Button>
              </div>
            </div>
            <Badge className={statusConfig.color + " text-sm px-4 py-2"}>
              <StatusIcon className="w-4 h-4 mr-2" />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 shadow-soft">
              <h2 className="font-medium text-foreground mb-4">订单进度</h2>
              <div className="space-y-6">
                {mockOrder.timeline.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-wine text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      {index < mockOrder.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-2 ${
                            step.completed ? "bg-wine" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-foreground">{step.description}</h3>
                        <span className="text-sm text-muted-foreground">{step.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {mockOrder.status === "shipped" && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">物流单号</p>
                      <p className="font-medium text-foreground">{mockOrder.trackingNumber}</p>
                    </div>
                    <Button variant="outline" onClick={handleTrackPackage}>
                      查看物流
                    </Button>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-1">预计送达</p>
                    <p className="font-medium text-foreground">{mockOrder.estimatedDelivery}</p>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6 shadow-soft">
              <h2 className="font-medium text-foreground mb-4">商品清单</h2>
              <div className="space-y-4">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">{item.name}</h3>
                      {item.specifications && (
                        <p className="text-sm text-muted-foreground mb-2">
                          规格: {item.specifications}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          数量: {item.quantity}
                        </span>
                        <span className="font-medium text-wine">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <h2 className="font-medium text-foreground mb-4">收货信息</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">
                      {mockOrder.shippingAddress.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mockOrder.shippingAddress.province}
                      {mockOrder.shippingAddress.city}
                      {mockOrder.shippingAddress.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      邮编: {mockOrder.shippingAddress.postalCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {mockOrder.shippingAddress.phone}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 shadow-soft">
              <h2 className="font-medium text-foreground mb-4">订单信息</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">下单时间</span>
                  <span className="text-foreground">{mockOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">支付方式</span>
                  <span className="text-foreground">{mockOrder.paymentMethod}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <h2 className="font-medium text-foreground mb-4">费用明细</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">商品小计</span>
                  <span className="text-foreground">
                    ¥{mockOrder.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">运费</span>
                  <span className="text-foreground">
                    ¥{mockOrder.shipping.toLocaleString()}
                  </span>
                </div>
                {mockOrder.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>优惠券折扣</span>
                    <span>-¥{mockOrder.discount.toLocaleString()}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">订单总额</span>
                  <span className="text-xl font-bold text-wine">
                    ¥{mockOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <h2 className="font-medium text-foreground mb-4">订单操作</h2>
              <div className="space-y-3">
                {mockOrder.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleCancelOrder}
                    >
                      取消订单
                    </Button>
                    <Button className="w-full">立即付款</Button>
                  </>
                )}
                {mockOrder.status === "shipped" && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleContactSupport}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      联系客服
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleTrackPackage}
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      追踪物流
                    </Button>
                  </>
                )}
                {mockOrder.status === "delivered" && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleReorder}
                    >
                      再次购买
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleContactSupport}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      联系客服
                    </Button>
                  </>
                )}
                {mockOrder.status === "cancelled" && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleReorder}
                  >
                    重新下单
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
