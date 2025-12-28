import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Gift, Briefcase, Heart, Sparkles, ArrowRight } from "lucide-react";
import giftSet from "@/assets/gift-set.jpg";

const GiftCenter = () => {
  const { t } = useTranslation();

  const giftCategories = [
    {
      id: "business",
      icon: Briefcase,
      title: t("home.giftCenter.categories.business.title"),
      description: t("home.giftCenter.categories.business.description"),
      color: "bg-wine",
    },
    {
      id: "elder",
      icon: Heart,
      title: t("home.giftCenter.categories.elder.title"),
      description: t("home.giftCenter.categories.elder.description"),
      color: "bg-tea-brown",
    },
    {
      id: "festival",
      icon: Gift,
      title: t("home.giftCenter.categories.festival.title"),
      description: t("home.giftCenter.categories.festival.description"),
      color: "bg-gold",
    },
    {
      id: "custom",
      icon: Sparkles,
      title: t("home.giftCenter.categories.custom.title"),
      description: t("home.giftCenter.categories.custom.description"),
      color: "bg-ink",
    },
  ];

  const featuredGifts = [
    {
      id: 1,
      name: t("home.giftCenter.products.1.name"),
      subtitle: t("home.giftCenter.products.1.subtitle"),
      price: t("home.giftCenter.products.1.price"),
      originalPrice: t("home.giftCenter.products.1.originalPrice"),
      image: giftSet,
      tag: t("home.giftCenter.products.1.tag"),
    },
    {
      id: 2,
      name: t("home.giftCenter.products.2.name"),
      subtitle: t("home.giftCenter.products.2.subtitle"),
      price: t("home.giftCenter.products.2.price"),
      originalPrice: t("home.giftCenter.products.2.originalPrice"),
      image: giftSet,
      tag: t("home.giftCenter.products.2.tag"),
    },
    {
      id: 3,
      name: t("home.giftCenter.products.3.name"),
      subtitle: t("home.giftCenter.products.3.subtitle"),
      price: t("home.giftCenter.products.3.price"),
      originalPrice: t("home.giftCenter.products.3.originalPrice"),
      image: giftSet,
      tag: t("home.giftCenter.products.3.tag"),
    },
    {
      id: 4,
      name: t("home.giftCenter.products.4.name"),
      subtitle: t("home.giftCenter.products.4.subtitle"),
      price: t("home.giftCenter.products.4.price"),
      originalPrice: t("home.giftCenter.products.4.originalPrice"),
      image: giftSet,
      tag: t("home.giftCenter.products.4.tag"),
    },
  ];

  const customServices = [
    { 
      title: t("home.giftCenter.services.0.title"), 
      description: t("home.giftCenter.services.0.description") 
    },
    { 
      title: t("home.giftCenter.services.1.title"), 
      description: t("home.giftCenter.services.1.description") 
    },
    { 
      title: t("home.giftCenter.services.2.title"), 
      description: t("home.giftCenter.services.2.description") 
    },
    { 
      title: t("home.giftCenter.services.3.title"), 
      description: t("home.giftCenter.services.3.description") 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Banner */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link to="/" className="hover:text-gold transition-colors">{t("home.giftCenter.breadcrumbHome")}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gold">{t("home.giftCenter.breadcrumbCurrent")}</span>
            </nav>
            <h1 className="font-display text-5xl md:text-6xl mb-4">{t("home.giftCenter.title")}</h1>
            <p className="text-xl text-primary-foreground/70 max-w-xl">
              {t("home.giftCenter.description")}
            </p>
          </div>
        </section>

        {/* Gift Categories */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {giftCategories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/gifts?category=${category.id}`}
                  className={`group bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-up opacity-0`}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-wine transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Gifts */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold font-medium tracking-[0.2em] mb-3">{t("home.giftCenter.popular")}</p>
              <h2 className="font-display text-4xl text-foreground">{t("home.giftCenter.featuredGifts")}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredGifts.map((gift, index) => (
                <Link
                  key={gift.id}
                  to={`/gifts/${gift.id}`}
                  className={`group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 animate-fade-up opacity-0`}
                  style={{ animationDelay: `${index * 100 + 200}ms`, animationFillMode: "forwards" }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {gift.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-wine text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {gift.tag}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-wine transition-colors">
                      {gift.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{gift.subtitle}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-display text-wine">{gift.price}</span>
                      {gift.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{gift.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Service */}
        <section id="custom" className="py-20 bg-foreground text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold font-medium tracking-[0.2em] mb-4">{t("home.giftCenter.customization")}</p>
                <h2 className="font-display text-4xl md:text-5xl mb-6">
                  {t("home.giftCenter.customTitle")}
                  <br />
                  <span className="text-gold">{t("home.giftCenter.customTitleHighlight")}</span>
                </h2>
                <p className="text-primary-foreground/70 leading-relaxed mb-8 text-lg">
                  {t("home.giftCenter.customDescription")}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  {customServices.map((service) => (
                    <div key={service.title} className="border-l-2 border-gold/30 pl-4">
                      <p className="font-medium text-gold">{service.title}</p>
                      <p className="text-sm text-primary-foreground/60">{service.description}</p>
                    </div>
                  ))}
                </div>

                <Button variant="gold" size="lg">
                  {t("home.giftCenter.consultNow")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={giftSet}
                    alt={t("home.giftCenter.customTitle")}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gold text-accent-foreground p-6 rounded-xl shadow-gold">
                  <p className="text-3xl font-display mb-1">50+</p>
                  <p className="text-sm">{t("home.giftCenter.partners")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GiftCenter;
