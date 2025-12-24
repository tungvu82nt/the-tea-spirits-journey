import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronRight, 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Headphones, 
  Settings, 
  LogOut,
  ShoppingBag,
  Gift,
  Award,
  TrendingUp,
  Phone
} from "lucide-react";
import productBaijiu from "@/assets/product-baijiu.jpg";

const menuItems = [
  { icon: Package, label: "我的订单", href: "/account/orders", badge: "3" },
  { icon: Heart, label: "我的收藏", href: "/account/wishlist", badge: null },
  { icon: ShoppingBag, label: "我的藏品", href: "/account/collection", badge: "12" },
  { icon: MapPin, label: "收货地址", href: "/account/addresses", badge: null },
  { icon: CreditCard, label: "支付方式", href: "/account/payment", badge: null },
  { icon: Gift, label: "优惠券", href: "/account/coupons", badge: "5" },
  { icon: Settings, label: "账户设置", href: "/account/settings", badge: null },
];

const recentOrders = [
  {
    id: "YY2024122401",
    date: "2024-12-20",
    status: "已发货",
    total: "¥3,880",
    items: [
      { name: "茶酒双臻礼盒", image: productBaijiu },
    ],
  },
  {
    id: "YY2024121501",
    date: "2024-12-15",
    status: "已完成",
    total: "¥2,680",
    items: [
      { name: "班章古树普洱", image: productBaijiu },
    ],
  },
];

const collectionHighlights = [
  {
    id: 1,
    name: "2019年班章普洱",
    purchaseDate: "2022-03-15",
    purchasePrice: "¥1,680",
    currentValue: "¥2,480",
    appreciation: "+47%",
    image: productBaijiu,
  },
  {
    id: 2,
    name: "15年酱香国韵",
    purchaseDate: "2023-08-20",
    purchasePrice: "¥2,980",
    currentValue: "¥3,280",
    appreciation: "+10%",
    image: productBaijiu,
  },
];

const Account = () => {
  const user = {
    name: "张先生",
    level: "黄金会员",
    points: 12800,
    phone: "138****8888",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-wine transition-colors">首页</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">个人中心</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* User Card */}
              <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center">
                    <User className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl">{user.name}</h2>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gold" />
                      <span className="text-sm text-gold">{user.level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-primary-foreground/60">积分</p>
                    <p className="text-xl font-display text-gold">{user.points.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-primary-foreground/60">手机</p>
                    <p className="text-lg">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="bg-card rounded-2xl p-4 shadow-soft">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-secondary transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-wine transition-colors" />
                        <span className="text-foreground group-hover:text-wine transition-colors">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-wine text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-border mt-4 pt-4">
                  <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive">
                    <LogOut className="w-5 h-5" />
                    <span>退出登录</span>
                  </button>
                </div>
              </div>

              {/* VIP Concierge */}
              <div id="concierge" className="bg-gold/10 border border-gold/30 rounded-2xl p-6 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Headphones className="w-8 h-8 text-gold" />
                  <div>
                    <h3 className="font-display text-lg text-foreground">专属管家</h3>
                    <p className="text-sm text-muted-foreground">1对1 VIP服务</p>
                  </div>
                </div>
                <Button variant="gold" size="lg" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  立即呼叫
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Recent Orders */}
              <section className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl text-foreground">近期订单</h3>
                  <Link to="/account/orders" className="text-sm text-wine hover:underline">
                    查看全部
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">订单号: {order.id}</span>
                          <span className="text-sm text-muted-foreground">{order.date}</span>
                        </div>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          order.status === "已发货" 
                            ? "bg-gold/20 text-gold" 
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                              <span className="text-foreground">{item.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-display text-wine">{order.total}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            查看详情
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Collection Highlights */}
              <section className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl text-foreground">我的藏品</h3>
                    <span className="bg-wine/10 text-wine text-xs px-2 py-1 rounded-full">升值提醒</span>
                  </div>
                  <Link to="/account/collection" className="text-sm text-wine hover:underline">
                    查看全部
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {collectionHighlights.map((item) => (
                    <div key={item.id} className="border border-border rounded-xl p-4 hover:border-gold/50 transition-colors">
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">{item.name}</h4>
                          <p className="text-xs text-muted-foreground mb-3">购入日期: {item.purchaseDate}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">当前估值</p>
                              <p className="text-lg font-display text-wine">{item.currentValue}</p>
                            </div>
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="w-4 h-4" />
                              <span className="font-medium">{item.appreciation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
