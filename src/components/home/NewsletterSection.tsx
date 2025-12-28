import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("home.newsletter.success"),
      description: t("home.newsletter.successDesc"),
    });
    setEmail("");
    setPhone("");
  };

  return (
    <section className="py-24 bg-gradient-cream relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-ink-wash opacity-30" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gold font-medium tracking-[0.2em] mb-4">
            {t("home.newsletter.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {t("home.newsletter.title")}
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            {t("home.newsletter.description")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="tel"
              placeholder={t("home.newsletter.phonePlaceholder")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 h-14 px-6 text-base bg-card border-border focus:border-wine"
              required
            />
            <Button type="submit" variant="wine" size="xl" className="shrink-0">
              {t("home.newsletter.subscribe")}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6">
            {t("home.newsletter.agreement")}
            <a href="/privacy" className="text-wine hover:underline">{t("home.newsletter.privacyPolicy")}</a>
            {t("home.newsletter.and")}
            <a href="/terms" className="text-wine hover:underline">{t("home.newsletter.termsOfService")}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
