import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Gift } from "lucide-react";
import productPuerh from "@/assets/product-puerh-tea.jpg";
import productBaijiu from "@/assets/product-baijiu.jpg";

interface CartItem {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  category: "tea" | "liquor";
  variant?: string;
  giftWrap?: boolean;
}

const Cart = () => {
  const { t } = useTranslation();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: t("account.banzhangAncientPuerh"),
      subtitle: "2018年春茶 · 357g茶饼",
      price: 2680,
      originalPrice: 2980,
      quantity: 1,
      image: productPuerh,
      category: "tea",
      variant: "357g",
    },
    {
      id: 2,
      name: "国韵酱香",
      subtitle: "15年窖藏 · 500ml",
      price: 2980,
      quantity: 2,
      image: productBaijiu,
      category: "liquor",
      variant: "500ml",
    },
  ]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: t("cart.itemRemoved"),
      description: t("cart.itemRemovedDesc"),
    });
  };

  const toggleGiftWrap = (id: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          return { ...item, giftWrap: !item.giftWrap };
        }
        return item;
      })
    );
  };

  const applyCoupon = () => {
    if (couponCode === "VIP888") {
      setAppliedCoupon(couponCode);
      toast({
        title: t("cart.couponApplied"),
        description: "已享受8.8折优惠",
      });
    } else {
      toast({
        title: t("cart.couponInvalid"),
        description: t("cart.couponInvalidDesc"),
        variant: "destructive",
      });
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast({
      title: t("cart.couponRemoved"),
      description: t("cart.couponRemovedDesc"),
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? Math.floor(subtotal * 0.12) : 0;
  const shipping = subtotal >= 2000 ? 0 : 20;
  const total = subtotal - discount + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: t("cart.cartEmpty"),
        description: t("cart.cartEmptyDesc"),
        variant: "destructive",
      });
      return;
    }
    toast({
      title: t("checkout.goToCheckout"),
      description: t("checkout.goToCheckout"),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display text-4xl text-foreground mb-2">{t("cart.title")}</h1>
            <p className="text-muted-foreground">
              {t("cart.totalItems")} {cartItems.length} {t("cart.totalItemsSuffix")}
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-display text-2xl text-foreground mb-3">{t("cart.emptyCart")}</h2>
              <p className="text-muted-foreground mb-8">{t("cart.emptyCartDesc")}</p>
              <Link to="/tea">
                <Button variant="wine" size="lg">
                  {t("cart.goShopping")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-card rounded-xl p-6 shadow-soft">
                    <div className="flex gap-6">
                      <Link to={`/${item.category === "tea" ? "tea" : "liquor"}/${item.id}`} className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </Link>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Link
                              to={`/${item.category === "tea" ? "tea" : "liquor"}/${item.id}`}
                              className="font-display text-xl text-foreground hover:text-wine transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>
                            {item.variant && (
                              <p className="text-xs text-muted-foreground mt-1">{t("cart.specification")}: {item.variant}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            {item.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                ¥{item.originalPrice.toLocaleString()}
                              </p>
                            )}
                            <p className="text-2xl font-display text-wine">
                              ¥{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                          <Checkbox
                            id={`gift-${item.id}`}
                            checked={item.giftWrap || false}
                            onCheckedChange={(checked) => toggleGiftWrap(item.id)}
                          />
                          <Label htmlFor={`gift-${item.id}`} className="text-sm text-muted-foreground cursor-pointer flex items-center gap-2">
                            <Gift className="w-4 h-4" />
                            {t("cart.giftWrap")}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 shadow-soft sticky top-24">
                  <h2 className="font-display text-xl text-foreground mb-6">{t("cart.orderSummary")}</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                      <span className="font-medium">¥{subtotal.toLocaleString()}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>{t("cart.discount")}</span>
                        <span className="font-medium">-¥{discount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("cart.shipping")}</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">{t("cart.freeShipping")}</span>
                        ) : (
                          `¥${shipping}`
                        )}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg">
                      <span className="font-medium">{t("cart.total")}</span>
                      <span className="font-display text-wine">¥{total.toLocaleString()}</span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {t("cart.freeShippingThreshold")}{(2000 - subtotal).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <Label htmlFor="coupon">{t("cart.couponCode")}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="coupon"
                        placeholder={t("cart.enterCouponCode")}
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1"
                        disabled={!!appliedCoupon}
                      />
                      {appliedCoupon ? (
                        <Button variant="outline" onClick={removeCoupon}>
                          {t("cart.remove")}
                        </Button>
                      ) : (
                        <Button variant="outline" onClick={applyCoupon}>
                          {t("cart.apply")}
                        </Button>
                      )}
                    </div>
                    {appliedCoupon && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                        <p className="text-green-900 font-medium">{t("cart.couponApplied")}: {appliedCoupon}</p>
                        <p className="text-green-700">享受8.8折优惠</p>
                      </div>
                    )}
                  </div>

                  <Link to="/checkout" onClick={handleCheckout}>
                    <Button variant="wine" size="lg" className="w-full">
                      {t("cart.checkout")}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>

                  <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                      <span>{t("cart.authenticGuarantee")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                      <span>{t("cart.sevenDayReturn")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                      <span>{t("cart.freeShippingGuarantee")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
