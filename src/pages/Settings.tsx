import { useState } from "react";
import { useTranslation } from "react-i18next";
import { User, Mail, Phone, Lock, Bell, Shield, Globe, Moon, Sun, LogOut, Trash2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  gender: "male" | "female" | "other";
  birthday: string;
  location: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "private";
  showActivity: boolean;
  allowMessages: boolean;
}

const Settings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    phone: "138****8888",
    avatar: "",
    bio: "热爱茶文化，喜欢收藏各种名茶和好酒",
    gender: "male",
    birthday: "1990-01-01",
    location: "北京市",
  });

  const [editProfile, setEditProfile] = useState<UserProfile>({ ...profile });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "private",
    showActivity: false,
    allowMessages: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("zh-CN");

  const handleSaveProfile = () => {
    if (!editProfile.name || !editProfile.email) {
      toast.error(t("settings.fillRequiredFields"));
      return;
    }
    setProfile({ ...editProfile });
    setIsEditProfileDialogOpen(false);
    toast.success(t("settings.profileUpdated"));
  };

  const handleChangePassword = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error(t("settings.fillRequiredFields"));
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(t("settings.passwordMismatch"));
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error(t("settings.passwordTooShort"));
      return;
    }

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangePasswordDialogOpen(false);
    toast.success(t("settings.passwordChanged"));
  };

  const handleDeleteAccount = () => {
    toast.success(t("settings.accountDeleted"));
    setIsDeleteAccountDialogOpen(false);
  };

  const handleLogout = () => {
    toast.success(t("settings.loggedOut"));
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    toast.success(t("settings.notificationsUpdated"));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: string | boolean) => {
    setPrivacy({ ...privacy, [key]: value });
    toast.success(t("settings.privacyUpdated"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            {t("settings.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("settings.subtitle")}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="profile">{t("settings.profile")}</TabsTrigger>
            <TabsTrigger value="security">{t("settings.security")}</TabsTrigger>
            <TabsTrigger value="notifications">{t("settings.notifications")}</TabsTrigger>
            <TabsTrigger value="privacy">{t("settings.privacy")}</TabsTrigger>
            <TabsTrigger value="preferences">{t("settings.preferences")}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6 shadow-soft">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-muted rounded-full overflow-hidden flex items-center justify-center">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-wine text-white"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{profile.name}</h2>
                  <p className="text-muted-foreground mb-4">{profile.bio}</p>
                  <Dialog open={isEditProfileDialogOpen} onOpenChange={setIsEditProfileDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">{t("settings.editProfile")}</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{t("settings.editProfile")}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">{t("settings.name")} *</Label>
                          <Input
                            id="name"
                            value={editProfile.name}
                            onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t("settings.email")} *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editProfile.email}
                            onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">{t("settings.phone")}</Label>
                          <Input
                            id="phone"
                            value={editProfile.phone}
                            onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="bio">{t("settings.bio")}</Label>
                          <Textarea
                            id="bio"
                            value={editProfile.bio}
                            onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="gender">{t("settings.gender")}</Label>
                            <select
                              id="gender"
                              value={editProfile.gender}
                              onChange={(e) => setEditProfile({ ...editProfile, gender: e.target.value as "male" | "female" | "other" })}
                              className="w-full mt-1.5 px-3 py-2 border border-input rounded-md bg-background"
                            >
                              <option value="male">{t("settings.male")}</option>
                              <option value="female">{t("settings.female")}</option>
                              <option value="other">{t("settings.other")}</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="birthday">{t("settings.birthday")}</Label>
                            <Input
                              id="birthday"
                              type="date"
                              value={editProfile.birthday}
                              onChange={(e) => setEditProfile({ ...editProfile, birthday: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="location">{t("settings.location")}</Label>
                          <Input
                            id="location"
                            value={editProfile.location}
                            onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleSaveProfile} className="w-full">
                          {t("settings.save")}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{t("settings.email")}</p>
                    <p className="font-medium text-foreground">{profile.email}</p>
                  </div>
                  <Button variant="ghost" size="sm">{t("settings.edit")}</Button>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{t("settings.phone")}</p>
                    <p className="font-medium text-foreground">{profile.phone}</p>
                  </div>
                  <Button variant="ghost" size="sm">{t("settings.edit")}</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6 shadow-soft space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{t("settings.changePassword")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.changePasswordDesc")}</p>
                  </div>
                </div>
                <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">{t("settings.changePassword")}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("settings.changePassword")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">{t("settings.currentPassword")} *</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-password">{t("settings.newPassword")} *</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">{t("settings.confirmPassword")} *</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleChangePassword} className="w-full">
                        {t("settings.confirmChange")}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{t("settings.twoFactorAuth")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.twoFactorAuthDesc")}</p>
                  </div>
                </div>
                <Button variant="outline">{t("settings.setup")}</Button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium text-foreground mb-4">{t("settings.dangerZone")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-foreground">{t("settings.deleteAccount")}</p>
                        <p className="text-sm text-muted-foreground">{t("settings.deleteAccountDesc")}</p>
                      </div>
                    </div>
                    <Dialog open={isDeleteAccountDialogOpen} onOpenChange={setIsDeleteAccountDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">{t("settings.deleteAccount")}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("settings.deleteAccountConfirm")}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            {t("settings.deleteAccountWarning")}
                          </p>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              onClick={() => setIsDeleteAccountDialogOpen(false)}
                              className="flex-1"
                            >
                              {t("settings.cancel")}
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteAccount} className="flex-1">
                              {t("settings.confirmDelete")}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6 shadow-soft">
              <h2 className="font-medium text-foreground mb-6">{t("settings.notificationPreferences")}</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{t("settings.emailNotifications")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.emailNotificationsDesc")}</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={() => handleNotificationChange("emailNotifications")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{t("settings.smsNotifications")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.smsNotificationsDesc")}</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={() => handleNotificationChange("smsNotifications")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{t("settings.pushNotifications")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.pushNotificationsDesc")}</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={() => handleNotificationChange("pushNotifications")}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{t("settings.orderUpdates")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.orderUpdatesDesc")}</p>
                  </div>
                  <Switch
                    checked={notifications.orderUpdates}
                    onCheckedChange={() => handleNotificationChange("orderUpdates")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{t("settings.promotions")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.promotionsDesc")}</p>
                  </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={() => handleNotificationChange("promotions")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{t("settings.newsletter")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.newsletterDesc")}</p>
                  </div>
                  <Switch
                    checked={notifications.newsletter}
                    onCheckedChange={() => handleNotificationChange("newsletter")}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="p-6 shadow-soft">
              <h2 className="font-medium text-foreground mb-6">{t("settings.privacySettings")}</h2>
              <div className="space-y-6">
                <div>
                  <Label>{t("settings.profileVisibility")}</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      variant={privacy.profileVisibility === "public" ? "default" : "outline"}
                      onClick={() => handlePrivacyChange("profileVisibility", "public")}
                    >
                      {t("settings.public")}
                    </Button>
                    <Button
                      variant={privacy.profileVisibility === "private" ? "default" : "outline"}
                      onClick={() => handlePrivacyChange("profileVisibility", "private")}
                    >
                      {t("settings.private")}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{t("settings.showActivity")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.showActivityDesc")}</p>
                  </div>
                  <Switch
                    checked={privacy.showActivity}
                    onCheckedChange={(checked) => handlePrivacyChange("showActivity", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{t("settings.allowMessages")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.allowMessagesDesc")}</p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => handlePrivacyChange("allowMessages", checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="p-6 shadow-soft">
              <h2 className="font-medium text-foreground mb-6">{t("settings.preferenceSettings")}</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <div>
                      <p className="font-medium text-foreground">{t("settings.darkMode")}</p>
                      <p className="text-sm text-muted-foreground">{t("settings.darkModeDesc")}</p>
                    </div>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={(checked) => {
                      setDarkMode(checked);
                      toast.success(checked ? t("settings.darkModeEnabled") : t("settings.lightModeEnabled"));
                    }}
                  />
                </div>
                <div>
                  <Label>{t("settings.language")}</Label>
                  <select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      toast.success(t("settings.languageUpdated"));
                    }}
                    className="w-full mt-2 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="zh-TW">繁體中文</option>
                    <option value="en-US">English</option>
                  </select>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{t("settings.logout")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings.logoutDesc")}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  {t("settings.logout")}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
