import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Plus, Edit, Trash2, Check, Phone, Mail, Home, Building, MapPin as MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

type AddressType = "home" | "work" | "other";

interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  address: string;
  postalCode: string;
  type: AddressType;
  isDefault: boolean;
}

const Addresses = () => {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "张三",
      phone: "138****8888",
      province: "北京市",
      city: "北京市",
      district: "朝阳区",
      address: "建国路88号",
      postalCode: "100025",
      type: "home",
      isDefault: true,
    },
    {
      id: "2",
      name: "张三",
      phone: "138****8888",
      province: "上海市",
      city: "上海市",
      district: "浦东新区",
      address: "陆家嘴环路1000号",
      postalCode: "200120",
      type: "work",
      isDefault: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Address>({
    id: "",
    name: "",
    phone: "",
    province: "",
    city: "",
    district: "",
    address: "",
    postalCode: "",
    type: "home",
    isDefault: false,
  });

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address) {
      toast.error(t("addresses.fillRequiredFields"));
      return;
    }

    const addressToAdd: Address = {
      ...newAddress,
      id: Date.now().toString(),
    };

    if (addressToAdd.isDefault) {
      setAddresses(addresses.map((a) => ({ ...a, isDefault: false })));
    }

    setAddresses([...addresses, addressToAdd]);
    setNewAddress({
      id: "",
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      address: "",
      postalCode: "",
      type: "home",
      isDefault: false,
    });
    setIsAddDialogOpen(false);
    toast.success(t("addresses.addressAdded"));
  };

  const handleEditAddress = () => {
    if (!editingAddress) return;

    if (!editingAddress.name || !editingAddress.phone || !editingAddress.address) {
      toast.error(t("addresses.fillRequiredFields"));
      return;
    }

    if (editingAddress.isDefault) {
      setAddresses(addresses.map((a) => ({ ...a, isDefault: false })));
    }

    setAddresses(addresses.map((a) => (a.id === editingAddress.id ? editingAddress : a)));
    setEditingAddress(null);
    setIsEditDialogOpen(false);
    toast.success(t("addresses.addressUpdated"));
  };

  const handleDeleteAddress = (addressId: string) => {
    const addressToDelete = addresses.find((a) => a.id === addressId);
    if (addressToDelete?.isDefault) {
      toast.error(t("addresses.cannotDeleteDefault"));
      return;
    }
    setAddresses(addresses.filter((a) => a.id !== addressId));
    toast.success(t("addresses.addressDeleted"));
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      }))
    );
    toast.success(t("addresses.defaultAddressSet"));
  };

  const handleEditClick = (address: Address) => {
    setEditingAddress({ ...address });
    setIsEditDialogOpen(true);
  };

  const getTypeIcon = (type: AddressType) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />;
      case "work":
        return <Building className="w-4 h-4" />;
      default:
        return <MapPinIcon className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: AddressType) => {
    switch (type) {
      case "home":
        return t("addresses.home");
      case "work":
        return t("addresses.work");
      default:
        return t("addresses.other");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              {t("addresses.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("addresses.subtitle")}
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("addresses.addAddress")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t("addresses.addAddress")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("addresses.name")} *</Label>
                    <Input
                      id="name"
                      placeholder={t("addresses.namePlaceholder")}
                      value={newAddress.name}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("addresses.phone")} *</Label>
                    <Input
                      id="phone"
                      placeholder={t("addresses.phonePlaceholder")}
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="province">{t("addresses.province")}</Label>
                    <Input
                      id="province"
                      placeholder={t("addresses.provincePlaceholder")}
                      value={newAddress.province}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, province: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">{t("addresses.city")}</Label>
                    <Input
                      id="city"
                      placeholder={t("addresses.cityPlaceholder")}
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">{t("addresses.district")}</Label>
                    <Input
                      id="district"
                      placeholder={t("addresses.districtPlaceholder")}
                      value={newAddress.district}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, district: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">{t("addresses.address")} *</Label>
                  <Input
                    id="address"
                    placeholder={t("addresses.addressPlaceholder")}
                    value={newAddress.address}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">{t("addresses.postalCode")}</Label>
                  <Input
                    id="postalCode"
                    placeholder={t("addresses.postalCodePlaceholder")}
                    value={newAddress.postalCode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, postalCode: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>{t("addresses.type")}</Label>
                  <RadioGroup
                    value={newAddress.type}
                    onValueChange={(value) =>
                      setNewAddress({ ...newAddress, type: value as AddressType })
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home" className="flex items-center gap-2 cursor-pointer">
                        <Home className="w-4 h-4" />
                        {t("addresses.home")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="work" id="work" />
                      <Label htmlFor="work" className="flex items-center gap-2 cursor-pointer">
                        <Building className="w-4 h-4" />
                        {t("addresses.work")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="flex items-center gap-2 cursor-pointer">
                        <MapPinIcon className="w-4 h-4" />
                        {t("addresses.other")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="default"
                    checked={newAddress.isDefault}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, isDefault: e.target.checked })
                    }
                  />
                  <Label htmlFor="default" className="cursor-pointer">
                    {t("addresses.setDefault")}
                  </Label>
                </div>
                <Button onClick={handleAddAddress} className="w-full">
                  {t("addresses.save")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={`p-6 shadow-soft relative ${
                address.isDefault ? "border-wine border-2" : ""
              }`}
            >
              {address.isDefault && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-wine text-white gap-1">
                    <Check className="w-3 h-3" />
                    {t("addresses.default")}
                  </Badge>
                </div>
              )}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-wine/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-wine" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-foreground">{address.name}</h3>
                    <Badge variant="secondary" className="gap-1">
                      {getTypeIcon(address.type)}
                      {getTypeLabel(address.type)}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{address.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="w-4 h-4 mt-0.5" />
                      <span>
                        {address.province}
                        {address.city}
                        {address.district}
                        {address.address}
                      </span>
                    </div>
                    {address.postalCode && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{t("addresses.postalCode")}: {address.postalCode}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                    className="flex-1"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    {t("addresses.setDefault")}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(address)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {t("addresses.edit")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteAddress(address.id)}
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {t("addresses.delete")}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {addresses.length === 0 && (
          <Card className="p-12 text-center shadow-soft">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {t("addresses.noAddresses")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("addresses.noAddressesDesc")}
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              {t("addresses.addAddress")}
            </Button>
          </Card>
        )}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t("addresses.editAddress")}</DialogTitle>
            </DialogHeader>
            {editingAddress && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">{t("addresses.name")} *</Label>
                    <Input
                      id="edit-name"
                      placeholder={t("addresses.namePlaceholder")}
                      value={editingAddress.name}
                      onChange={(e) =>
                        setEditingAddress({ ...editingAddress, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-phone">{t("addresses.phone")} *</Label>
                    <Input
                      id="edit-phone"
                      placeholder={t("addresses.phonePlaceholder")}
                      value={editingAddress.phone}
                      onChange={(e) =>
                        setEditingAddress({ ...editingAddress, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-province">{t("addresses.province")}</Label>
                    <Input
                      id="edit-province"
                      placeholder={t("addresses.provincePlaceholder")}
                      value={editingAddress.province}
                      onChange={(e) =>
                        setEditingAddress({ ...editingAddress, province: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-city">{t("addresses.city")}</Label>
                    <Input
                      id="edit-city"
                      placeholder={t("addresses.cityPlaceholder")}
                      value={editingAddress.city}
                      onChange={(e) =>
                        setEditingAddress({ ...editingAddress, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-district">{t("addresses.district")}</Label>
                    <Input
                      id="edit-district"
                      placeholder={t("addresses.districtPlaceholder")}
                      value={editingAddress.district}
                      onChange={(e) =>
                        setEditingAddress({ ...editingAddress, district: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-address">{t("addresses.address")} *</Label>
                  <Input
                    id="edit-address"
                    placeholder={t("addresses.addressPlaceholder")}
                    value={editingAddress.address}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, address: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-postalCode">{t("addresses.postalCode")}</Label>
                  <Input
                    id="edit-postalCode"
                    placeholder={t("addresses.postalCodePlaceholder")}
                    value={editingAddress.postalCode}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, postalCode: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>{t("addresses.type")}</Label>
                  <RadioGroup
                    value={editingAddress.type}
                    onValueChange={(value) =>
                      setEditingAddress({ ...editingAddress, type: value as AddressType })
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="edit-home" />
                      <Label htmlFor="edit-home" className="flex items-center gap-2 cursor-pointer">
                        <Home className="w-4 h-4" />
                        {t("addresses.home")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="work" id="edit-work" />
                      <Label htmlFor="edit-work" className="flex items-center gap-2 cursor-pointer">
                        <Building className="w-4 h-4" />
                        {t("addresses.work")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="edit-other" />
                      <Label htmlFor="edit-other" className="flex items-center gap-2 cursor-pointer">
                        <MapPinIcon className="w-4 h-4" />
                        {t("addresses.other")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-default"
                    checked={editingAddress.isDefault}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, isDefault: e.target.checked })
                    }
                  />
                  <Label htmlFor="edit-default" className="cursor-pointer">
                    {t("addresses.setDefault")}
                  </Label>
                </div>
                <Button onClick={handleEditAddress} className="w-full">
                  {t("addresses.save")}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Addresses;
