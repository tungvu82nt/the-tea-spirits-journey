import { useState } from "react";
import { CreditCard, Plus, Edit, Trash2, Check, Lock, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type CardType = "visa" | "mastercard" | "amex" | "unionpay" | "other";

interface PaymentMethod {
  id: string;
  type: CardType;
  last4: string;
  holderName: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  isVerified: boolean;
}

const PaymentMethods = () => {
  const { t } = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "visa",
      last4: "4242",
      holderName: "张三",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
      isVerified: true,
    },
    {
      id: "2",
      type: "mastercard",
      last4: "8888",
      holderName: "张三",
      expiryMonth: "06",
      expiryYear: "2026",
      isDefault: false,
      isVerified: true,
    },
    {
      id: "3",
      type: "unionpay",
      last4: "1234",
      holderName: "张三",
      expiryMonth: "09",
      expiryYear: "2024",
      isDefault: false,
      isVerified: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [newMethod, setNewMethod] = useState<PaymentMethod>({
    id: "",
    type: "visa",
    last4: "",
    holderName: "",
    expiryMonth: "",
    expiryYear: "",
    isDefault: false,
    isVerified: false,
  });

  const getCardIcon = (type: CardType) => {
    switch (type) {
      case "visa":
        return "💳";
      case "mastercard":
        return "💳";
      case "amex":
        return "💳";
      case "unionpay":
        return "💳";
      default:
        return "💳";
    }
  };

  const getCardLabel = (type: CardType) => {
    switch (type) {
      case "visa":
        return t("paymentMethods.visa");
      case "mastercard":
        return t("paymentMethods.mastercard");
      case "amex":
        return t("paymentMethods.amex");
      case "unionpay":
        return t("paymentMethods.unionpay");
      default:
        return t("paymentMethods.other");
    }
  };

  const getCardColor = (type: CardType) => {
    switch (type) {
      case "visa":
        return "bg-blue-100 text-blue-800";
      case "mastercard":
        return "bg-orange-100 text-orange-800";
      case "amex":
        return "bg-blue-100 text-blue-800";
      case "unionpay":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddPaymentMethod = () => {
    if (!newMethod.holderName || !newMethod.last4 || !newMethod.expiryMonth || !newMethod.expiryYear) {
      toast.error(t("paymentMethods.fillRequiredFields"));
      return;
    }

    if (newMethod.last4.length !== 4) {
      toast.error(t("paymentMethods.last4MustBe4Digits"));
      return;
    }

    const methodToAdd: PaymentMethod = {
      ...newMethod,
      id: Date.now().toString(),
    };

    if (methodToAdd.isDefault) {
      setPaymentMethods(paymentMethods.map((m) => ({ ...m, isDefault: false })));
    }

    setPaymentMethods([...paymentMethods, methodToAdd]);
    setNewMethod({
      id: "",
      type: "visa",
      last4: "",
      holderName: "",
      expiryMonth: "",
      expiryYear: "",
      isDefault: false,
      isVerified: false,
    });
    setIsAddDialogOpen(false);
    toast.success(t("paymentMethods.paymentMethodAdded"));
  };

  const handleEditPaymentMethod = () => {
    if (!editingMethod) return;

    if (!editingMethod.holderName || !editingMethod.last4 || !editingMethod.expiryMonth || !editingMethod.expiryYear) {
      toast.error(t("paymentMethods.fillRequiredFields"));
      return;
    }

    if (editingMethod.last4.length !== 4) {
      toast.error(t("paymentMethods.last4MustBe4Digits"));
      return;
    }

    if (editingMethod.isDefault) {
      setPaymentMethods(paymentMethods.map((m) => ({ ...m, isDefault: false })));
    }

    setPaymentMethods(paymentMethods.map((m) => (m.id === editingMethod.id ? editingMethod : m)));
    setEditingMethod(null);
    setIsEditDialogOpen(false);
    toast.success(t("paymentMethods.paymentMethodUpdated"));
  };

  const handleDeletePaymentMethod = (methodId: string) => {
    const methodToDelete = paymentMethods.find((m) => m.id === methodId);
    if (methodToDelete?.isDefault) {
      toast.error(t("paymentMethods.cannotDeleteDefault"));
      return;
    }
    setPaymentMethods(paymentMethods.filter((m) => m.id !== methodId));
    toast.success(t("paymentMethods.paymentMethodDeleted"));
  };

  const handleSetDefault = (methodId: string) => {
    setPaymentMethods(
      paymentMethods.map((m) => ({
        ...m,
        isDefault: m.id === methodId,
      }))
    );
    toast.success(t("paymentMethods.defaultPaymentMethodSet"));
  };

  const handleEditClick = (method: PaymentMethod) => {
    setEditingMethod({ ...method });
    setIsEditDialogOpen(true);
  };

  const handleVerifyPaymentMethod = (methodId: string) => {
    toast.success(t("paymentMethods.verificationCodeSent"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              {t("paymentMethods.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("paymentMethods.subtitle")}
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("paymentMethods.addPaymentMethod")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t("paymentMethods.addPaymentMethod")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t("paymentMethods.cardType")}</Label>
                  <RadioGroup
                    value={newMethod.type}
                    onValueChange={(value) =>
                      setNewMethod({ ...newMethod, type: value as CardType })
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="visa" id="visa" />
                      <Label htmlFor="visa" className="cursor-pointer">Visa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mastercard" id="mastercard" />
                      <Label htmlFor="mastercard" className="cursor-pointer">Mastercard</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unionpay" id="unionpay" />
                      <Label htmlFor="unionpay" className="cursor-pointer">{t("paymentMethods.unionpay")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer">{t("paymentMethods.other")}</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="card-number">{t("paymentMethods.last4Digits")} *</Label>
                  <Input
                    id="card-number"
                    placeholder="****"
                    maxLength={4}
                    value={newMethod.last4}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, last4: e.target.value.replace(/\D/g, "") })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="holder-name">{t("paymentMethods.holderName")} *</Label>
                  <Input
                    id="holder-name"
                    placeholder={t("paymentMethods.holderNamePlaceholder")}
                    value={newMethod.holderName}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, holderName: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry-month">{t("paymentMethods.expiryMonth")} *</Label>
                    <Input
                      id="expiry-month"
                      placeholder="MM"
                      maxLength={2}
                      value={newMethod.expiryMonth}
                      onChange={(e) =>
                        setNewMethod({ ...newMethod, expiryMonth: e.target.value.replace(/\D/g, "") })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry-year">{t("paymentMethods.expiryYear")} *</Label>
                    <Input
                      id="expiry-year"
                      placeholder="YYYY"
                      maxLength={4}
                      value={newMethod.expiryYear}
                      onChange={(e) =>
                        setNewMethod({ ...newMethod, expiryYear: e.target.value.replace(/\D/g, "") })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="default"
                    checked={newMethod.isDefault}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, isDefault: e.target.checked })
                    }
                  />
                  <Label htmlFor="default" className="cursor-pointer">
                    {t("paymentMethods.setAsDefault")}
                  </Label>
                </div>
                <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                  <Lock className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    {t("paymentMethods.sslEncryptionNotice")}
                  </p>
                </div>
                <Button onClick={handleAddPaymentMethod} className="w-full">
                  {t("paymentMethods.addPaymentMethod")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              className={`p-6 shadow-soft relative ${
                method.isDefault ? "border-wine border-2" : ""
              }`}
            >
              {method.isDefault && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-wine text-white gap-1">
                    <Check className="w-3 h-3" />
                    {t("paymentMethods.defaultPaymentMethod")}
                  </Badge>
                </div>
              )}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{getCardIcon(method.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-foreground">{method.holderName}</h3>
                    <Badge className={getCardColor(method.type)}>
                      {getCardLabel(method.type)}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>**** **** **** {method.last4}</p>
                    <p>
                      {t("paymentMethods.validUntil")}: {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {method.isVerified ? (
                  <Badge variant="secondary" className="gap-1">
                    <Shield className="w-3 h-3" />
                    {t("paymentMethods.verified")}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1 text-yellow-600 border-yellow-600">
                    <AlertCircle className="w-3 h-3" />
                    {t("paymentMethods.unverified")}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 pt-4 border-t">
                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                    className="flex-1"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    {t("paymentMethods.setAsDefault")}
                  </Button>
                )}
                {!method.isVerified && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerifyPaymentMethod(method.id)}
                    className="flex-1"
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    {t("paymentMethods.verify")}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(method)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {t("paymentMethods.edit")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePaymentMethod(method.id)}
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {t("paymentMethods.delete")}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <Card className="p-12 text-center shadow-soft">
            <CreditCard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {t("paymentMethods.noPaymentMethods")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("paymentMethods.noPaymentMethodsDesc")}
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              {t("paymentMethods.addPaymentMethod")}
            </Button>
          </Card>
        )}

        <Card className="p-6 shadow-soft">
          <h3 className="font-medium text-foreground mb-4">{t("paymentMethods.securityTips")}</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">{t("paymentMethods.sslEncryption")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("paymentMethods.sslEncryptionDesc")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">{t("paymentMethods.pciDssCompliance")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("paymentMethods.pciDssComplianceDesc")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">{t("paymentMethods.verifyPaymentMethod")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("paymentMethods.verifyPaymentMethodDesc")}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t("paymentMethods.editPaymentMethod")}</DialogTitle>
            </DialogHeader>
            {editingMethod && (
              <div className="space-y-4">
                <div>
                  <Label>{t("paymentMethods.cardType")}</Label>
                  <RadioGroup
                    value={editingMethod.type}
                    onValueChange={(value) =>
                      setEditingMethod({ ...editingMethod, type: value as CardType })
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="visa" id="edit-visa" />
                      <Label htmlFor="edit-visa" className="cursor-pointer">Visa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mastercard" id="edit-mastercard" />
                      <Label htmlFor="edit-mastercard" className="cursor-pointer">Mastercard</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unionpay" id="edit-unionpay" />
                      <Label htmlFor="edit-unionpay" className="cursor-pointer">{t("paymentMethods.unionpay")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="edit-other" />
                      <Label htmlFor="edit-other" className="cursor-pointer">{t("paymentMethods.other")}</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="edit-card-number">{t("paymentMethods.last4Digits")} *</Label>
                  <Input
                    id="edit-card-number"
                    placeholder="****"
                    maxLength={4}
                    value={editingMethod.last4}
                    onChange={(e) =>
                      setEditingMethod({ ...editingMethod, last4: e.target.value.replace(/\D/g, "") })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-holder-name">{t("paymentMethods.holderName")} *</Label>
                  <Input
                    id="edit-holder-name"
                    placeholder={t("paymentMethods.holderNamePlaceholder")}
                    value={editingMethod.holderName}
                    onChange={(e) =>
                      setEditingMethod({ ...editingMethod, holderName: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-expiry-month">{t("paymentMethods.expiryMonth")} *</Label>
                    <Input
                      id="edit-expiry-month"
                      placeholder="MM"
                      maxLength={2}
                      value={editingMethod.expiryMonth}
                      onChange={(e) =>
                        setEditingMethod({ ...editingMethod, expiryMonth: e.target.value.replace(/\D/g, "") })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-expiry-year">{t("paymentMethods.expiryYear")} *</Label>
                    <Input
                      id="edit-expiry-year"
                      placeholder="YYYY"
                      maxLength={4}
                      value={editingMethod.expiryYear}
                      onChange={(e) =>
                        setEditingMethod({ ...editingMethod, expiryYear: e.target.value.replace(/\D/g, "") })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-default"
                    checked={editingMethod.isDefault}
                    onChange={(e) =>
                      setEditingMethod({ ...editingMethod, isDefault: e.target.checked })
                    }
                  />
                  <Label htmlFor="edit-default" className="cursor-pointer">
                    {t("paymentMethods.setAsDefault")}
                  </Label>
                </div>
                <Button onClick={handleEditPaymentMethod} className="w-full">
                  {t("paymentMethods.saveChanges")}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PaymentMethods;
