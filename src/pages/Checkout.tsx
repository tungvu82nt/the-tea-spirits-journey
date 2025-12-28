import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Truck, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  Shield,
  Calendar,
  Clock
} from "lucide-react";
import productPuerh from "@/assets/product-puerh-tea.jpg";
import productBaijiu from "@/assets/product-baijiu.jpg";

type CheckoutStep = "shipping" | "payment" | "review" | "confirm";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  giftWrap?: boolean;
}

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isLoading, setIsLoading] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    address: "",
    postalCode: "",
    isDefault: false,
  });

  const [paymentData, setPaymentData] = useState({
    method: "wechat",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });

  const [deliveryData, setDeliveryData] = useState({
    method: "standard",
    date: "",
    time: "",
    notes: "",
  });

  const cartItems: CartItem[] = [
    {
      id: 1,
      name: t("account.banzhangAncientPuerh"),
      price: 2680,
      quantity: 1,
      image: productPuerh,
      giftWrap: true,
    },
    {
      id: 2,
      name: "国韵酱香",
      price: 2980,
      quantity: 2,
      image: productBaijiu,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.floor(subtotal * 0.12);
  const shipping = subtotal >= 2000 ? 0 : 20;
  const giftWrapFee = cartItems.filter(item => item.giftWrap).length * 20;
  const total = subtotal - discount + shipping + giftWrapFee;

  const steps = [
    { id: "shipping", label: t("checkout.shippingAddress"), icon: MapPin },
    { id: "payment", label: t("checkout.paymentMethod"), icon: CreditCard },
    { id: "review", label: t("checkout.orderReview"), icon: Check },
    { id: "confirm", label: t("checkout.completePayment"), icon: Shield },
  ];

  const handleNextStep = () => {
    if (currentStep === "shipping" && !shippingData.fullName) {
      toast({
        title: t("checkout.completeInfo"),
        description: t("checkout.completeAddress"),
        variant: "destructive",
      });
      return;
    }

    if (currentStep === "payment" && paymentData.method === "card" && !paymentData.cardNumber) {
      toast({
        title: t("checkout.completeInfo"),
        description: t("checkout.completePaymentInfo"),
        variant: "destructive",
      });
      return;
    }

    if (currentStep === "confirm") {
      handleSubmitOrder();
      return;
    }

    setCurrentStep(prev => {
      const currentIndex = steps.findIndex(step => step.id === prev);
      return steps[currentIndex + 1].id as CheckoutStep;
    });
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => {
      const currentIndex = steps.findIndex(step => step.id === prev);
      return steps[currentIndex - 1].id as CheckoutStep;
    });
  };

  const handleSubmitOrder = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: t("checkout.orderSubmitted"),
        description: t("checkout.orderSubmittedDesc"),
      });
      
      navigate("/account/orders");
    } catch (error) {
      toast({
        title: t("checkout.orderSubmitFailed"),
        description: t("checkout.orderSubmitFailedDesc"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderShippingStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl text-foreground mb-4">{t("checkout.shippingAddress")}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("checkout.recipientName")} *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  placeholder={t("checkout.enterName")}
                  value={shippingData.fullName}
                  onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("checkout.phoneNumber")} *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t("checkout.enterPhone")}
                  value={shippingData.phone}
                  onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                  className="pl-10"
                  maxLength={11}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="province">{t("checkout.province")} *</Label>
              <select
                id="province"
                value={shippingData.province}
                onChange={(e) => setShippingData({ ...shippingData, province: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-lg bg-background"
                required
              >
                <option value="">{t("checkout.selectProvince")}</option>
                <option value="北京">北京</option>
                <option value="上海">上海</option>
                <option value="广东">广东</option>
                <option value="浙江">浙江</option>
                <option value="江苏">江苏</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t("checkout.city")} *</Label>
              <select
                id="city"
                value={shippingData.city}
                onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-lg bg-background"
                required
              >
                <option value="">{t("checkout.selectCity")}</option>
                <option value="北京市">北京市</option>
                <option value="上海市">上海市</option>
                <option value="广州市">广州市</option>
                <option value="杭州市">杭州市</option>
                <option value="南京市">南京市</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">{t("checkout.district")} *</Label>
              <select
                id="district"
                value={shippingData.district}
                onChange={(e) => setShippingData({ ...shippingData, district: e.target.value })}
                className="w-full h-12 px-4 border border-border rounded-lg bg-background"
                required
              >
                <option value="">{t("checkout.selectDistrict")}</option>
                <option value="朝阳区">朝阳区</option>
                <option value="浦东新区">浦东新区</option>
                <option value="天河区">天河区</option>
                <option value="西湖区">西湖区</option>
                <option value="鼓楼区">鼓楼区</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">{t("checkout.detailedAddress")} *</Label>
            <Input
              id="address"
              placeholder={t("checkout.enterAddress")}
              value={shippingData.address}
              onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">{t("checkout.postalCode")}</Label>
            <Input
              id="postalCode"
              placeholder={t("checkout.enterPostalCode")}
              value={shippingData.postalCode}
              onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
              maxLength={6}
            />
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="isDefault"
              checked={shippingData.isDefault}
              onCheckedChange={(checked) => setShippingData({ ...shippingData, isDefault: checked as boolean })}
            />
            <Label htmlFor="isDefault" className="cursor-pointer">
              {t("checkout.setDefault")}
            </Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl text-foreground mb-4">{t("checkout.deliveryOptions")}</h3>
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>{t("checkout.deliveryMethod")}</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "standard", name: t("checkout.standardDelivery"), desc: "2-5天", price: shipping === 0 ? t("cart.freeShipping") : "¥20" },
                { id: "express", name: t("checkout.expressDelivery"), desc: "1-2天", price: "¥30" },
                { id: "sameday", name: t("checkout.sameDayDelivery"), desc: t("checkout.sameDayDelivery"), price: "¥50" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setDeliveryData({ ...deliveryData, method: option.id })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    deliveryData.method === option.id
                      ? "border-wine bg-wine/5"
                      : "border-border hover:border-wine/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{option.name}</span>
                    <span className="text-wine">{option.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">{t("checkout.deliveryDate")}</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="deliveryDate"
                  type="date"
                  value={deliveryData.date}
                  onChange={(e) => setDeliveryData({ ...deliveryData, date: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryTime">{t("checkout.deliveryTime")}</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select
                  id="deliveryTime"
                  value={deliveryData.time}
                  onChange={(e) => setDeliveryData({ ...deliveryData, time: e.target.value })}
                  className="w-full h-12 pl-10 border border-border rounded-lg bg-background"
                >
                  <option value="">{t("checkout.deliveryTime")}</option>
                  <option value="morning">上午 (9:00-12:00)</option>
                  <option value="afternoon">下午 (14:00-18:00)</option>
                  <option value="evening">晚上 (19:00-21:00)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t("checkout.orderNotes")}</Label>
            <textarea
              id="notes"
              placeholder={t("checkout.enterNotes")}
              value={deliveryData.notes}
              onChange={(e) => setDeliveryData({ ...deliveryData, notes: e.target.value })}
              className="w-full min-h-[100px] px-4 py-3 border border-border rounded-lg bg-background resize-none"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground text-right">
              {deliveryData.notes.length}/200
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl text-foreground mb-4">{t("checkout.paymentMethod")}</h3>
        <div className="space-y-4">
          {[
            { id: "wechat", name: t("checkout.wechatPay"), icon: "微", color: "bg-green-600" },
            { id: "alipay", name: t("checkout.alipay"), icon: "支", color: "bg-blue-600" },
            { id: "card", name: t("checkout.bankCard"), icon: "💳", color: "bg-gray-600" },
          ].map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentData({ ...paymentData, method: method.id })}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                paymentData.method === method.id
                  ? "border-wine bg-wine/5"
                  : "border-border hover:border-wine/50"
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${method.color} flex items-center justify-center text-white font-bold`}>
                {method.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{method.name}</p>
                {method.id === "card" && (
                  <p className="text-sm text-muted-foreground">支持信用卡、借记卡</p>
                )}
              </div>
              {paymentData.method === method.id && (
                <Check className="w-6 h-6 text-wine" />
              )}
            </button>
          ))}
        </div>
      </div>

      {paymentData.method === "card" && (
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <h4 className="font-medium text-foreground mb-4">{t("checkout.cardInfo")}</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">{t("checkout.cardNumber")} *</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder={t("checkout.enterCardNumber")}
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                maxLength={16}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardHolder">{t("checkout.cardHolder")} *</Label>
                <Input
                  id="cardHolder"
                  placeholder={t("checkout.enterCardHolder")}
                  value={paymentData.cardHolder}
                  onChange={(e) => setPaymentData({ ...paymentData, cardHolder: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">{t("checkout.expiryDate")} *</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                  maxLength={5}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cvv">{t("checkout.cvv")} *</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder={t("checkout.enterCVV")}
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                  maxLength={3}
                  required
                />
              </div>

              <div className="flex items-center space-x-3 pt-6">
                <Checkbox
                  id="saveCard"
                  checked={paymentData.saveCard}
                  onCheckedChange={(checked) => setPaymentData({ ...paymentData, saveCard: checked as boolean })}
                />
                <Label htmlFor="saveCard" className="cursor-pointer">
                  {t("checkout.saveCard")}
                </Label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-green-600 shrink-0 mt-1" />
          <div>
            <p className="font-medium text-green-900 mb-1">{t("checkout.securePayment")}</p>
            <p className="text-sm text-green-700">{t("checkout.securePaymentDesc")}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl text-foreground mb-4">{t("checkout.shippingAddress")}</h3>
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-6 h-6 text-wine shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-foreground">{shippingData.fullName}</p>
              <p className="text-sm text-muted-foreground">{shippingData.phone}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {shippingData.province} {shippingData.city} {shippingData.district} {shippingData.address}
              </p>
              {shippingData.postalCode && (
                <p className="text-xs text-muted-foreground">邮编: {shippingData.postalCode}</p>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setCurrentStep("shipping")}>
            {t("checkout.modifyAddress")}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl text-foreground mb-4">{t("checkout.deliveryMethod")}</h3>
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <div className="flex items-start gap-3">
            <Truck className="w-6 h-6 text-wine shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {deliveryData.method === "standard" ? t("checkout.standardDelivery") : 
                 deliveryData.method === "express" ? t("checkout.expressDelivery") : t("checkout.sameDayDelivery")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {deliveryData.date && `${t("checkout.deliveryDate")}: ${deliveryData.date}`}
                {deliveryData.time && ` · ${deliveryData.time === "morning" ? "上午" : deliveryData.time === "afternoon" ? "下午" : "晚上"}`}
              </p>
              {deliveryData.notes && (
                <p className="text-xs text-muted-foreground mt-1">备注: {deliveryData.notes}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl text-foreground mb-4">{t("checkout.paymentMethod")}</h3>
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-wine" />
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {paymentData.method === "wechat" ? t("checkout.wechatPay") : 
                 paymentData.method === "alipay" ? t("checkout.alipay") : t("checkout.bankCard")}
              </p>
              {paymentData.method === "card" && (
                <p className="text-sm text-muted-foreground">
                  **** **** **** {paymentData.cardNumber.slice(-4)}
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentStep("payment")}>
              {t("checkout.modifyPayment")}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-wine/5 border border-wine/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-wine shrink-0" />
          <div>
            <p className="font-medium text-foreground mb-2">{t("checkout.orderReview")}</p>
            <p className="text-sm text-muted-foreground">
              {t("checkout.orderConfirmDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-display text-3xl text-foreground mb-4">{t("checkout.orderConfirmation")}</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("checkout.orderConfirmSuccess")}
        </p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-soft space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{t("checkout.orderNumber")}</span>
          <span className="font-medium text-foreground">YY2024122601</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{t("checkout.orderTime")}</span>
          <span className="font-medium text-foreground">2024-12-26 14:30:25</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{t("checkout.paymentMethod")}</span>
          <span className="font-medium text-foreground">
            {paymentData.method === "wechat" ? t("checkout.wechatPay") : 
             paymentData.method === "alipay" ? t("checkout.alipay") : t("checkout.bankCard")}
          </span>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-green-600 shrink-0" />
          <div>
            <p className="font-medium text-green-900 mb-2">{t("checkout.paymentSecurity")}</p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• {t("checkout.paymentSecurityTip1")}</li>
              <li>• {t("checkout.paymentSecurityTip2")}</li>
              <li>• {t("checkout.paymentSecurityTip3")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <Link to="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-wine transition-colors">
              <ChevronLeft className="w-4 h-4" />
              {t("checkout.backToCart")}
            </Link>
          </div>

          <h1 className="font-display text-4xl text-foreground mb-8">{t("checkout.title")}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-2xl text-foreground">
                    {steps.find(step => step.id === currentStep)?.label}
                  </h2>
                  <div className="flex items-center gap-2">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index <= steps.findIndex(s => s.id === currentStep)
                              ? "bg-wine text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          <step.icon className="w-4 h-4" />
                        </div>
                        {index < steps.length - 1 && (
                          <ChevronRight className={`w-4 h-4 ${
                            index < steps.findIndex(s => s.id === currentStep) ? "text-wine" : "text-muted-foreground"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-8" />

                {currentStep === "shipping" && renderShippingStep()}
                {currentStep === "payment" && renderPaymentStep()}
                {currentStep === "review" && renderReviewStep()}
                {currentStep === "confirm" && renderConfirmStep()}

                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === "shipping"}
                  >
                    {t("checkout.previous")}
                  </Button>
                  <Button
                    variant="wine"
                    onClick={handleNextStep}
                    disabled={isLoading}
                  >
                    {isLoading ? t("checkout.processing") : 
                     currentStep === "confirm" ? t("checkout.confirmPayment") : t("checkout.next")}
                    {!isLoading && <ChevronRight className="w-5 h-5 ml-2" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-24">
                <h2 className="font-display text-xl text-foreground mb-6">{t("cart.orderSummary")}</h2>

                <div className="space-y-4 mb-6">
                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground">{t("checkout.productList")}</h3>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{item.name}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                              <span className="text-sm font-medium text-wine">
                                ¥{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                      <span className="font-medium">¥{subtotal.toLocaleString()}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>{t("cart.discount")}</span>
                        <span className="font-medium">-¥{discount.toLocaleString()}</span>
                      </div>
                    )}

                    {giftWrapFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("cart.giftWrap")}</span>
                        <span className="font-medium">¥{giftWrapFee.toLocaleString()}</span>
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
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span>{t("cart.authenticGuarantee")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span>{t("cart.sevenDayReturn")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span>{t("cart.freeShippingGuarantee")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
