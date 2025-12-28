import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, ArrowRight, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState<"verify" | "reset">("verify");
  const [countdown, setCountdown] = useState(0);
  const [formData, setFormData] = useState({
    phone: "",
    verifyCode: "",
    newPassword: "",
    confirmPassword: "",
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

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep("reset");
      toast({
        title: t("forgotPassword.verifySuccess"),
        description: t("forgotPassword.verifySuccessDesc"),
      });
    } catch (error) {
      toast({
        title: t("forgotPassword.verifyFailed"),
        description: t("forgotPassword.verifyFailedDesc"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: t("register.passwordMismatch"),
        description: t("register.passwordMismatchDesc"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: t("forgotPassword.resetSuccess"),
        description: t("forgotPassword.resetSuccessDesc"),
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        title: t("forgotPassword.resetFailed"),
        description: t("forgotPassword.resetFailedDesc"),
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
            <div className="mb-6">
              <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-wine transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t("forgotPassword.backToLogin")}
              </Link>
            </div>

            <div className="text-center mb-8">
              <h1 className="font-display text-4xl text-foreground mb-3">{t("forgotPassword.title")}</h1>
              <p className="text-muted-foreground">
                {step === "verify" ? t("forgotPassword.verifyStepSubtitle") : t("forgotPassword.resetStepSubtitle")}
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              {step === "verify" ? (
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("forgotPassword.phone")}</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t("forgotPassword.phonePlaceholder")}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 h-12"
                        maxLength={11}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verifyCode">{t("forgotPassword.verifyCode")}</Label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="verifyCode"
                          type="text"
                          placeholder={t("forgotPassword.verifyCodePlaceholder")}
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
                        {countdown > 0 ? t("forgotPassword.resendCode", { count: countdown }) : t("forgotPassword.sendCode")}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" variant="wine" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? t("forgotPassword.verifying") : t("forgotPassword.nextStep")}
                    {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleReset} className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">{t("forgotPassword.phoneVerified")}</p>
                        <p className="text-sm text-green-700">{formData.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t("forgotPassword.newPassword")}</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder={t("forgotPassword.newPasswordPlaceholder")}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="h-12"
                      minLength={6}
                      maxLength={20}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t("forgotPassword.confirmNewPassword")}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={t("forgotPassword.confirmNewPasswordPlaceholder")}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="h-12"
                      minLength={6}
                      maxLength={20}
                      required
                    />
                  </div>

                  <Button type="submit" variant="wine" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? t("forgotPassword.resetting") : t("forgotPassword.confirmReset")}
                    {!isLoading && <CheckCircle className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              )}

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t("forgotPassword.rememberPassword")}
                  <Link to="/login" className="text-wine font-medium hover:underline ml-1">
                    {t("forgotPassword.loginNow")}
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

export default ForgotPassword;
