import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Save,
  Bell,
  Shield,
  Users,
  Globe,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { cn } from '@/lib/utils';

interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  currency: string;
  language: string;
  timezone: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  orderNotifications: boolean;
  customerNotifications: boolean;
  inventoryAlerts: boolean;
  lowStockThreshold: number;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordMinLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}

const mockGeneralSettings: GeneralSettings = {
  siteName: '雅韵茶酒',
  siteDescription: 'Cửa hàng trà và rượu cao cấp',
  contactEmail: 'contact@yayun-tea-liquor.com',
  contactPhone: '0901234567',
  address: '123 Đường Nguyễn Huệ',
  city: 'Hồ Chí Minh',
  state: 'Quận 1',
  postalCode: '700000',
  country: 'Việt Nam',
  currency: 'VND',
  language: 'vi',
  timezone: 'Asia/Ho_Chi_Minh',
};

const mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  orderNotifications: true,
  customerNotifications: true,
  inventoryAlerts: true,
  lowStockThreshold: 10,
};

const mockSecuritySettings: SecuritySettings = {
  twoFactorAuth: false,
  sessionTimeout: 30,
  passwordMinLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn Admin',
    email: 'admin@yayun.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-12-23T14:30:00Z',
    createdAt: '2024-01-01T08:00:00Z',
  },
  {
    id: '2',
    name: 'Trần Thị Editor',
    email: 'editor@yayun.com',
    role: 'editor',
    status: 'active',
    lastLogin: '2024-12-22T09:15:00Z',
    createdAt: '2024-02-15T10:00:00Z',
  },
  {
    id: '3',
    name: 'Lê Văn Viewer',
    email: 'viewer@yayun.com',
    role: 'viewer',
    status: 'active',
    lastLogin: '2024-12-20T16:45:00Z',
    createdAt: '2024-03-20T14:00:00Z',
  },
  {
    id: '4',
    name: 'Phạm Thị Inactive',
    email: 'inactive@yayun.com',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2024-11-15T11:30:00Z',
    createdAt: '2024-04-10T09:00:00Z',
  },
];

export const Settings = (): JSX.Element => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'users'>('general');
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(mockGeneralSettings);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSaveGeneralSettings = async (): Promise<void> => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const handleSaveNotificationSettings = async (): Promise<void> => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const handleSaveSecuritySettings = async (): Promise<void> => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const handleAddUser = (): void => {
    const newUser: User = {
      id: Date.now().toString(),
      name: 'Người dùng mới',
      email: 'newuser@yayun.com',
      role: 'viewer',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const handleDeleteUser = (userId: string): void => {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleToggleUserStatus = (userId: string): void => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };

  const tabs = [
    { id: 'general' as const, label: t('admin.settings.general'), icon: Globe },
    { id: 'notifications' as const, label: t('admin.settings.notifications'), icon: Bell },
    { id: 'security' as const, label: t('admin.settings.security'), icon: Shield },
    { id: 'users' as const, label: t('admin.settings.users'), icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
        <Breadcrumbs />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  )}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin website</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên website
                    </label>
                    <input
                      type="text"
                      value={generalSettings.siteName}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, siteName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả website
                    </label>
                    <textarea
                      value={generalSettings.siteDescription}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin liên hệ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email liên hệ
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={generalSettings.contactEmail}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={generalSettings.contactPhone}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={generalSettings.address}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, address: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thành phố
                    </label>
                    <input
                      type="text"
                      value={generalSettings.city}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, city: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quận/Huyện
                    </label>
                    <input
                      type="text"
                      value={generalSettings.state}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, state: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mã bưu chính
                    </label>
                    <input
                      type="text"
                      value={generalSettings.postalCode}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, postalCode: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quốc gia
                    </label>
                    <input
                      type="text"
                      value={generalSettings.country}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, country: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Cài đặt khu vực</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đồng tiền
                    </label>
                    <select
                      value={generalSettings.currency}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, currency: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="VND">Việt Nam Đồng (VND)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngôn ngữ
                    </label>
                    <select
                      value={generalSettings.language}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, language: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Múi giờ
                    </label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, timezone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Asia/Ho_Chi_Minh">Hồ Chí Minh (GMT+7)</option>
                      <option value="Asia/Hanoi">Hà Nội (GMT+7)</option>
                      <option value="Asia/Da_Nang">Đà Nẵng (GMT+7)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveGeneralSettings} disabled={saving} className="gap-2">
                  <Save className="w-4 h-4" />
                  {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.settings.emailNotifications')}</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{t('admin.settings.emailNotifications')}</p>
                        <p className="text-sm text-gray-600">{t('admin.settings.emailNotificationsDesc')}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{t('admin.settings.orderNotifications')}</p>
                        <p className="text-sm text-gray-600">{t('admin.settings.orderNotificationsDesc')}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.orderNotifications}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          orderNotifications: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{t('admin.settings.customerNotifications')}</p>
                        <p className="text-sm text-gray-600">{t('admin.settings.customerNotificationsDesc')}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.customerNotifications}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          customerNotifications: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.settings.inventoryAlerts')}</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{t('admin.settings.lowStockAlert')}</p>
                        <p className="text-sm text-gray-600">{t('admin.settings.lowStockAlertDesc')}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.inventoryAlerts}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          inventoryAlerts: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('admin.settings.lowStockThreshold')}
                    </label>
                    <input
                      type="number"
                      value={notificationSettings.lowStockThreshold}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          lowStockThreshold: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotificationSettings} disabled={saving} className="gap-2">
                  <Save className="w-4 h-4" />
                  {saving ? t('admin.settings.saving') : t('admin.settings.saveSettings')}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.settings.twoFactorAuth')}</h2>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{t('admin.settings.twoFactorAuth')}</p>
                      <p className="text-sm text-gray-600">Thêm lớp bảo mật bổ sung cho tài khoản</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('admin.settings.sessionTimeout')}</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tự động đăng xuất sau (phút)
                  </label>
                  <input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: parseInt(e.target.value) || 30,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Yêu cầu mật khẩu</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('admin.settings.passwordMinLength')}
                    </label>
                    <input
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordMinLength: parseInt(e.target.value) || 8,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">{t('admin.settings.requireUppercase')}</p>
                      <p className="text-sm text-gray-600">Mật khẩu phải chứa ít nhất một chữ hoa</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.requireUppercase}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          requireUppercase: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">{t('admin.settings.requireLowercase')}</p>
                      <p className="text-sm text-gray-600">Mật khẩu phải chứa ít nhất một chữ thường</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.requireLowercase}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          requireLowercase: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">{t('admin.settings.requireNumbers')}</p>
                      <p className="text-sm text-gray-600">Mật khẩu phải chứa ít nhất một số</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.requireNumbers}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          requireNumbers: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">{t('admin.settings.requireSpecialChars')}</p>
                      <p className="text-sm text-gray-600">Mật khẩu phải chứa ít nhất một ký tự đặc biệt</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.requireSpecialChars}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          requireSpecialChars: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSecuritySettings} disabled={saving} className="gap-2">
                  <Save className="w-4 h-4" />
                  {saving ? t('admin.settings.saving') : t('admin.settings.saveSettings')}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{t('admin.settings.users')}</h2>
                <Button onClick={handleAddUser} className="gap-2">
                  <Plus className="w-4 h-4" />
                  {t('admin.settings.addUser')}
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tên</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Vai trò</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Trạng thái</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Đăng nhập cuối</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                              user.role === 'admin'
                                ? 'bg-purple-100 text-purple-800'
                                : user.role === 'editor'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            )}
                          >
                            {user.role === 'admin' ? 'Quản trị viên' : user.role === 'editor' ? 'Biên tập viên' : 'Người xem'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            )}
                          >
                            {user.status === 'active' ? (
                              <>
                                <Check className="w-3 h-3" />
                                {t('admin.settings.userActivated')}
                              </>
                            ) : (
                              <>
                                <X className="w-3 h-3" />
                                {t('admin.settings.userDeactivated')}
                              </>
                            )}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString('vi-VN')
                            : 'Chưa đăng nhập'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleToggleUserStatus(user.id)}
                            >
                              {user.status === 'active' ? (
                                <X className="w-4 h-4 text-red-600" />
                              ) : (
                                <Check className="w-4 h-4 text-green-600" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
