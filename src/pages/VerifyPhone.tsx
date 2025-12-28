import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Shield, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";

const VerifyPhone = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    phone: searchParams.get("phone") || "",
    verifyCode: "",
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
      
      setIsVerified(true);
      toast({
        title: t("verifyPhone.verifySuccess"),
        description: t("verifyPhone.verifySuccessDesc"),
      });
    } catch (error) {
      toast({
        title: t("verifyPhone.verifyFailed"),
        description: t("verifyPhone.verifyFailedDesc"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    const redirect = searchParams.get("redirect") || "/account";
    navigate(redirect);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <Link to="/account" className="inline-flex items-center text-sm text-muted-foreground hover:text-wine transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t("verifyPhone.backToAccount")}
              </Link>
            </div>

            <div className="text-center mb-8">
              <h1 className="font-display text-4xl text-foreground mb-3">{t("verifyPhone.title")}</h1>
              <p className="text-muted-foreground">
                {isVerified ? t("verifyPhone.verifiedSubtitle") : t("verifyPhone.unverifiedSubtitle")}
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft">
              {!isVerified ? (
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("verifyPhone.phone")}</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t("verifyPhone.phonePlaceholder")}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 h-12"
                        maxLength={11}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verifyCode">{t("verifyPhone.verifyCode")}</Label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="verifyCode"
                          type="text"
                          placeholder={t("verifyPhone.verifyCodePlaceholder")}
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
                        {countdown > 0 ? t("verifyPhone.resendCode", { count: countdown }) : t("verifyPhone.sendCode")}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" variant="wine" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? t("verifyPhone.verifying") : t("verifyPhone.verifyPhone")}
                    {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="font-display text-2xl text-green-900 mb-2">{t("verifyPhone.verificationSuccess")}</h3>
                    <p className="text-green-700">{t("verifyPhone.phoneVerifiedDesc", { phone: formData.phone })}</p>
                  </div>

                  <Button variant="wine" size="lg" className="w-full" onClick={handleContinue}>
                    {t("verifyPhone.continueAction")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t("verifyPhone.hasProblem")}
                  <Link to="/contact" className="text-wine font-medium hover:underline ml-1">
                    {t("verifyPhone.contactSupport")}
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

export default VerifyPhone;
