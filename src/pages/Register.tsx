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
import { Eye, EyeOff, ArrowRight, Phone, Lock, Shield } from "lucide-react";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [formData, setFormData] = useState({
    phone: "",
    verifyCode: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    if (!formData.phone || formData.phone.length !== 11) {
      toast({
        title: t("register.phoneFormatError"),
        description: t("register.phoneFormatErrorDesc"),
        variant: "destructive",
      });
      return;
    }

    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: t("register.codeSent"),
      description: t("register.codeSentDesc"),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t("register.passwordMismatch"),
        description: t("register.passwordMismatchDesc"),
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeTerms || !formData.agreePrivacy) {
      toast({
        title: t("register.agreeRequired"),
        description: t("register.agreeRequiredDesc"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: t("register.registerSuccess"),
        description: t("register.registerSuccessDesc"),
      });
      
      navigate("/account");
    } catch (error) {
      toast({
        title: t("register.registerFailed"),
        description: t("register.registerFailedDesc"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl text-foreground mb-3">{t("register.title")}</h1>
              <p className="text-muted-foreground">{t("register.subtitle")}</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("register.phone")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t("register.phonePlaceholder")}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 h-12"
                      maxLength={11}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verifyCode">{t("register.verifyCode")}</Label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="verifyCode"
                        type="text"
                        placeholder={t("register.verifyCodePlaceholder")}
                        value={formData.verifyCode}
                        onChange={(e) => setFormData({ ...formData, verifyCode: e.target.value })}
                        className="pl-10 h-12"
                        maxLength={6}
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendCode}
                      disabled={countdown > 0 || !formData.phone}
                      className="whitespace-nowrap"
                    >
                      {countdown > 0 ? t("register.resendCode", { count: countdown }) : t("register.sendCode")}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t("register.password")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("register.passwordPlaceholder")}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 h-12"
                      minLength={6}
                      maxLength={20}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("register.confirmPassword")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("register.confirmPasswordPlaceholder")}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 pr-10 h-12"
                      minLength={6}
                      maxLength={20}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      {t("register.agreeTerms")}
                      <Link to="/terms" className="text-wine hover:underline mx-1">
                        {t("register.termsOfService")}
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                      required
                    />
                    <Label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      {t("register.agreeTerms")}
                      <Link to="/privacy" className="text-wine hover:underline mx-1">
                        {t("register.privacyPolicy")}
                      </Link>
                    </Label>
                  </div>
                </div>

                <Button type="submit" variant="wine" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? t("register.registering") : t("register.registerNow")}
                  {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t("register.hasAccount")}
                  <Link to="/login" className="text-wine font-medium hover:underline ml-1">
                    {t("register.loginNow")}
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

export default Register;
