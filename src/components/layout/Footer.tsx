import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    products: [
      { name: t("footer.puerhBlackTea"), href: "/tea?category=puerh" },
      { name: t("footer.oolongRockTea"), href: "/tea?category=oolong" },
      { name: t("footer.maotaiLiquor"), href: "/liquor?aroma=maotai" },
      { name: t("footer.luzhouLiquor"), href: "/liquor?aroma=luzhou" },
      { name: t("footer.giftSets"), href: "/gifts" },
    ],
    services: [
      { name: t("footer.services.customization"), href: "/gifts#custom" },
      { name: t("footer.services.antiCounterfeit"), href: "/culture#verify" },
      { name: t("footer.services.tastingAcademy"), href: "/culture#academy" },
      { name: t("footer.services.exclusiveConcierge"), href: "/account#concierge" },
    ],
    about: [
      { name: t("footer.about.brandStory"), href: "/culture#story" },
      { name: t("footer.about.originVisits"), href: "/culture#origins" },
      { name: t("footer.about.partners"), href: "/culture#partners" },
      { name: t("footer.about.contactUs"), href: "/contact" },
    ],
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto py-16 px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="text-accent-foreground font-display text-xl">雅</span>
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-wider">雅韵茶酒</h3>
                <p className="text-sm text-primary-foreground/60 tracking-widest">YA YUN COLLECTION</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-sm">
              {t("footer.brand.description")}
            </p>
            <div className="space-y-3 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>{t("footer.brand.phone")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>{t("footer.brand.email")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold" />
                <span>{t("footer.brand.hours")}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{t("footer.brand.address")}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold">{t("footer.products")}</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold">{t("footer.services.title")}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold">{t("footer.about.title")}</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto py-6 px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gold transition-colors">{t("footer.privacyPolicy")}</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">{t("footer.termsOfService")}</Link>
            <Link to="/icp" className="hover:text-gold transition-colors">{t("footer.icpFiling")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
