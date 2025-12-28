import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import productPuerh from "@/assets/product-puerh-tea.jpg";
import productBaijiu from "@/assets/product-baijiu.jpg";
import giftSet from "@/assets/gift-set.jpg";

export function FeaturedProducts() {
  const { t } = useTranslation();

  const featuredProducts = [
    {
      id: 1,
      name: t('home.products.puerh.name'),
      subtitle: t('home.products.puerh.subtitle'),
      price: "¥1,280",
      originalPrice: "¥1,580",
      image: productPuerh,
      category: t('home.products.puerh.category'),
      link: "/tea/puerh-ancient",
    },
    {
      id: 2,
      name: t('home.products.baijiu.name'),
      subtitle: t('home.products.baijiu.subtitle'),
      price: "¥2,980",
      originalPrice: null,
      image: productBaijiu,
      category: t('home.products.baijiu.category'),
      link: "/liquor/maotai-15",
    },
    {
      id: 3,
      name: t('home.products.giftSet.name'),
      subtitle: t('home.products.giftSet.subtitle'),
      price: "¥3,880",
      originalPrice: "¥4,580",
      image: giftSet,
      category: t('home.products.giftSet.category'),
      link: "/gifts/premium-set",
    },
  ];
  return (
    <section className="py-24 bg-gradient-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] mb-3">FEATURED</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {t('home.featured.title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('home.featured.subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={product.link}
              className={`group animate-fade-up opacity-0`}
              style={{ animationDelay: `${index * 100 + 200}ms`, animationFillMode: "forwards" }}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 group-hover:-translate-y-2">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-wine text-primary-foreground text-xs px-3 py-1.5 rounded-full font-medium">
                      {product.category}
                    </span>
                  </div>
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background text-foreground px-6 py-2 rounded-full text-sm font-medium">
                      {t('home.featured.viewDetails')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-foreground mb-1 group-hover:text-wine transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.subtitle}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-display text-wine">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/tea">
            <Button variant="elegant" size="lg">
              {t('home.featured.exploreMore')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
