import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

const Account = () => {
  const { t } = useTranslation();

  const menuItems = [
    { icon: Package, label: t("account.myOrders"), href: "/account/orders", badge: "3" },
    { icon: Heart, label: t("account.myWishlist"), href: "/account/wishlist", badge: null },
    { icon: ShoppingBag, label: t("account.myCollection"), href: "/account/collection", badge: "12" },
    { icon: MapPin, label: t("account.shippingAddresses"), href: "/account/addresses", badge: null },
    { icon: CreditCard, label: t("account.paymentMethods"), href: "/account/payment", badge: null },
    { icon: Gift, label: t("account.coupons"), href: "/account/coupons", badge: "5" },
    { icon: Settings, label: t("account.accountSettings"), href: "/account/settings", badge: null },
  ];

  const recentOrders = [
    {
      id: "YY2024122401",
      date: "2024-12-20",
      status: t("account.statusShipped"),
      total: "¥3,880",
      items: [
        { name: t("account.teaWineGiftBox"), image: productBaijiu },
      ],
    },
    {
      id: "YY2024121501",
      date: "2024-12-15",
      status: t("account.statusCompleted"),
      total: "¥2,680",
      items: [
        { name: t("account.banzhangAncientPuerh"), image: productBaijiu },
      ],
    },
  ];

  const collectionHighlights = [
    {
      id: 1,
      name: t("account.year2019BanzhangPuerh"),
      purchaseDate: "2022-03-15",
      purchasePrice: "¥1,680",
      currentValue: "¥2,480",
      appreciation: "+47%",
      image: productBaijiu,
    },
    {
      id: 2,
      name: t("account.year15SauceFlavor"),
      purchaseDate: "2023-08-20",
      purchasePrice: "¥2,980",
      currentValue: "¥3,280",
      appreciation: "+10%",
      image: productBaijiu,
    },
  ];

  const user = {
    name: "张先生",
    level: t("account.goldMember"),
    points: 12800,
    phone: "138****8888",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-wine transition-colors">{t("account.home")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{t("account.personalCenter")}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
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
                    <p className="text-primary-foreground/60">{t("account.points")}</p>
                    <p className="text-xl font-display text-gold">{user.points.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-primary-foreground/60">{t("account.phone")}</p>
                    <p className="text-lg">{user.phone}</p>
                  </div>
                </div>
              </div>

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
                    <span>{t("account.logout")}</span>
                  </button>
                </div>
              </div>

              <div id="concierge" className="bg-gold/10 border border-gold/30 rounded-2xl p-6 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Headphones className="w-8 h-8 text-gold" />
                  <div>
                    <h3 className="font-display text-lg text-foreground">{t("account.vipConcierge")}</h3>
                    <p className="text-sm text-muted-foreground">{t("account.vipService")}</p>
                  </div>
                </div>
                <Button variant="gold" size="lg" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  {t("account.callNow")}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <section className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl text-foreground">{t("account.recentOrders")}</h3>
                  <Link to="/account/orders" className="text-sm text-wine hover:underline">
                    {t("account.viewAll")}
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{t("account.orderNumber")}: {order.id}</span>
                          <span className="text-sm text-muted-foreground">{order.date}</span>
                        </div>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          order.status === t("account.statusShipped") 
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
                            {t("account.viewDetails")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl text-foreground">{t("account.myCollection")}</h3>
                    <span className="bg-wine/10 text-wine text-xs px-2 py-1 rounded-full">{t("account.appreciationAlert")}</span>
                  </div>
                  <Link to="/account/collection" className="text-sm text-wine hover:underline">
                    {t("account.viewAll")}
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {collectionHighlights.map((item) => (
                    <div key={item.id} className="border border-border rounded-xl p-4 hover:border-gold/50 transition-colors">
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">{item.name}</h4>
                          <p className="text-xs text-muted-foreground mb-3">{t("account.purchaseDate")}: {item.purchaseDate}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">{t("account.currentValue")}</p>
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
