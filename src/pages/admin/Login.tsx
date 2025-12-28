import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { authUtils, csrfUtils } from '@/lib/auth';

const AdminLogin = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!formData.username.trim()) {
      setError(t('admin.login.usernameRequired'));
      return;
    }

    if (!formData.password) {
      setError(t('admin.login.passwordRequired'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (formData.username === 'admin' && formData.password === 'admin123') {
        const csrfToken = csrfUtils.generateToken();
        authUtils.setCsrfToken(csrfToken);
        authUtils.setTokens({
          accessToken: 'mock-admin-token',
          refreshToken: 'mock-refresh-token',
        });
        localStorage.setItem('adminUser', JSON.stringify({ username: formData.username, role: 'admin' }));
        toast.success('Đăng nhập thành công');
        navigate('/admin/dashboard');
      } else {
        setError('Tên người dùng hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setError('Đăng nhập thất bại, vui lòng thử lại');
      toast.error('Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-4">
            <span className="text-white font-bold text-2xl">雅</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Hệ thống quản trị雅韵茶酒</h1>
          <p className="text-slate-400">Vui lòng đăng nhập để tiếp tục</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Tên người dùng</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Nhập tên người dùng"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10"
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>{t('admin.login.rememberMe')}</span>
              </label>
              <Link to="/admin/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                {t('admin.login.forgotPassword')}
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t('admin.login.loggingIn') : t('admin.login.loginButton')}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600">
              测试账号: admin / admin123
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
            返回前台首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
