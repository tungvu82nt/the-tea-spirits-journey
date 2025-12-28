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
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowRight, Phone, Lock } from "lucide-react";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: t('auth.loginSuccess'),
        description: t('auth.loginSuccessDesc'),
      });
      
      navigate("/account");
    } catch (error) {
      toast({
        title: t('auth.loginFailed'),
        description: t('auth.loginFailedDesc'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: t('auth.socialLogin'),
      description: t('auth.socialLoginDesc', { provider }),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl text-foreground mb-3">{t('auth.welcomeBack')}</h1>
              <p className="text-muted-foreground">{t('auth.welcomeBackDesc')}</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('auth.phone')}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('auth.phonePlaceholder11')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('auth.passwordPlaceholder')}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      {t('auth.rememberMe')}
                    </Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-wine hover:underline">
                    {t('auth.forgotPassword')}
                  </Link>
                </div>

                <Button type="submit" variant="wine" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? t('auth.loggingIn') : t('auth.login')}
                  {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-4">{t('auth.orLoginWith')}</p>
                <div className="flex justify-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="w-12 h-12"
                    onClick={() => handleSocialLogin(t('auth.wechat'))}
                  >
                    <span className="text-green-600 font-bold">{t('auth.wechat').substring(0, 1)}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="w-12 h-12"
                    onClick={() => handleSocialLogin(t('auth.alipay'))}
                  >
                    <span className="text-blue-600 font-bold">{t('auth.alipay').substring(0, 1)}</span>
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t('auth.dontHaveAccount')}
                  <Link to="/register" className="text-wine font-medium hover:underline ml-1">
                    {t('auth.registerNow')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
