import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ticket, Plus, Copy, Calendar, Tag, Percent, Gift, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

type CouponType = "discount" | "percentage" | "free_shipping" | "gift";

type CouponStatus = "available" | "used" | "expired";

interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  description: string;
  minAmount: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  status: CouponStatus;
  usageCount: number;
  maxUsage: number;
  categories?: string[];
  products?: string[];
}

const Coupons = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<CouponStatus>("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");

  const mockCoupons: Coupon[] = [
    {
      id: "1",
      code: "NEWUSER2024",
      type: "percentage",
      value: 15,
      description: "新用户专享折扣",
      minAmount: 100,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "available",
      usageCount: 0,
      maxUsage: 1,
    },
    {
      id: "2",
      code: "TEALOVER100",
      type: "discount",
      value: 50,
      description: "茶叶专享优惠券",
      minAmount: 200,
      maxDiscount: 100,
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      status: "available",
      usageCount: 0,
      maxUsage: 3,
      categories: ["tea"],
    },
    {
      id: "3",
      code: "FREESHIP2024",
      type: "free_shipping",
      value: 0,
      description: "免运费优惠券",
      minAmount: 99,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "available",
      usageCount: 0,
      maxUsage: 5,
    },
    {
      id: "4",
      code: "WINE20OFF",
      type: "percentage",
      value: 20,
      description: "酒类专享折扣",
      minAmount: 300,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "used",
      usageCount: 1,
      maxUsage: 2,
      categories: ["liquor"],
    },
    {
      id: "5",
      code: "EXPIRED2023",
      type: "discount",
      value: 30,
      description: "过期优惠券",
      minAmount: 150,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "expired",
      usageCount: 0,
      maxUsage: 1,
    },
  ];

  const getCouponIcon = (type: CouponType) => {
    switch (type) {
      case "discount":
        return <Tag className="w-5 h-5" />;
      case "percentage":
        return <Percent className="w-5 h-5" />;
      case "free_shipping":
        return <Gift className="w-5 h-5" />;
      case "gift":
        return <Gift className="w-5 h-5" />;
      default:
        return <Ticket className="w-5 h-5" />;
    }
  };

  const getCouponValue = (coupon: Coupon) => {
    switch (coupon.type) {
      case "discount":
        return `¥${coupon.value}`;
      case "percentage":
        return `${coupon.value}%`;
      case "free_shipping":
        return t("coupons.freeShipping");
      case "gift":
        return t("coupons.gift");
      default:
        return "";
    }
  };

  const getCouponColor = (status: CouponStatus) => {
    switch (status) {
      case "available":
        return "bg-wine text-white";
      case "used":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("coupons.searchPlaceholder"));
  };

  const handleRedeemCoupon = () => {
    if (!redeemCode.trim()) {
      toast.error(t("coupons.invalidCode"));
      return;
    }
    toast.success(t("coupons.redeemSuccess"));
    setRedeemCode("");
    setIsRedeemDialogOpen(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(t("coupons.copied"));
  };

  const handleUseCoupon = (couponId: string) => {
    toast.success(t("coupons.useCoupon"));
  };

  const filteredCoupons = mockCoupons.filter((coupon) => {
    const matchesTab = coupon.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const availableCoupons = mockCoupons.filter((c) => c.status === "available");
  const usedCoupons = mockCoupons.filter((c) => c.status === "used");
  const expiredCoupons = mockCoupons.filter((c) => c.status === "expired");

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              {t("coupons.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("coupons.subtitle")}
            </p>
          </div>
          <Dialog open={isRedeemDialogOpen} onOpenChange={setIsRedeemDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("coupons.redeem")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("coupons.redeem")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("coupons.redeemCode")}
                  </label>
                  <Input
                    placeholder={t("coupons.redeemCode")}
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                  />
                </div>
                <Button onClick={handleRedeemCoupon} className="w-full">
                  {t("coupons.redeemButton")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6 mb-6 shadow-soft">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder={t("coupons.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              {t("coupons.filter")}
            </Button>
          </form>
        </Card>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CouponStatus)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="available" className="relative">
              {t("coupons.available")}
              {availableCoupons.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-wine text-white text-xs px-2 py-0.5">
                  {availableCoupons.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="used" className="relative">
              {t("coupons.used")}
              {usedCoupons.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs px-2 py-0.5">
                  {usedCoupons.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="expired" className="relative">
              {t("coupons.expired")}
              {expiredCoupons.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5">
                  {expiredCoupons.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredCoupons.length === 0 ? (
              <Card className="p-12 text-center shadow-soft">
                <Ticket className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {t("coupons.noCoupons")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? t("coupons.noMatchingCoupons") : t("coupons.youHaveNoCoupons")}
                </p>
                {!searchQuery && activeTab === "available" && (
                  <Button onClick={() => setIsRedeemDialogOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    {t("coupons.redeem")}
                  </Button>
                )}
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoupons.map((coupon) => (
                  <Card
                    key={coupon.id}
                    className={`overflow-hidden shadow-soft ${
                      coupon.status !== "available" ? "opacity-60" : ""
                    }`}
                  >
                    <div className={`${getCouponColor(coupon.status)} p-4`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getCouponIcon(coupon.type)}
                          <span className="text-2xl font-bold">
                            {getCouponValue(coupon)}
                          </span>
                        </div>
                        <Ticket className="w-8 h-8 opacity-50" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-foreground mb-2">
                        {coupon.description}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span>{t("coupons.code")}: {coupon.code}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {t("coupons.validUntil")}: {coupon.startDate} {t("coupons.to")} {coupon.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span>
                            {t("coupons.minAmount")}: ¥{coupon.minAmount}
                            {coupon.maxDiscount && `，${t("coupons.maxDiscount")}: ¥${coupon.maxDiscount}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4" />
                          <span>
                            {t("coupons.usage")}: {coupon.usageCount}/{coupon.maxUsage}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {coupon.status === "available" ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopyCode(coupon.code)}
                              className="flex-1 gap-1"
                            >
                              <Copy className="w-4 h-4" />
                              {t("coupons.copyCode")}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleUseCoupon(coupon.id)}
                              className="flex-1"
                            >
                              {t("coupons.useCoupon")}
                            </Button>
                          </>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="w-full justify-center py-2"
                          >
                            {coupon.status === "used" ? t("coupons.alreadyUsed") : t("coupons.expired")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Card className="p-6 mt-6 shadow-soft">
          <h3 className="font-medium text-foreground mb-4">{t("coupons.couponNotes")}</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-wine font-medium">1</span>
              </div>
              <p>{t("coupons.note1")}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-wine font-medium">2</span>
              </div>
              <p>{t("coupons.note2")}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-wine font-medium">3</span>
              </div>
              <p>{t("coupons.note3")}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-wine font-medium">4</span>
              </div>
              <p>{t("coupons.note4")}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Coupons;
