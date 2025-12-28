import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import heroTeaMountain from "@/assets/hero-tea-mountain.jpg";
import heroLiquorCellar from "@/assets/hero-liquor-cellar.jpg";

export function CategoryShowcase() {
  const { t } = useTranslation();

  const categories = [
    {
      id: "tea",
      title: t("home.categoryShowcase.tea.title"),
      subtitle: "TEA SELECTION",
      description: t("home.categoryShowcase.tea.description"),
      image: heroTeaMountain,
      link: "/tea",
      stats: [
        { label: t("home.categoryShowcase.tea.stats.0.label"), value: "8+" },
        { label: t("home.categoryShowcase.tea.stats.1.label"), value: "50+" },
        { label: t("home.categoryShowcase.tea.stats.2.label"), value: "20+" },
      ],
    },
    {
      id: "liquor",
      title: t("home.categoryShowcase.liquor.title"),
      subtitle: "LIQUOR COLLECTION",
      description: t("home.categoryShowcase.liquor.description"),
      image: heroLiquorCellar,
      link: "/liquor",
      stats: [
        { label: t("home.categoryShowcase.liquor.stats.0.label"), value: "5+" },
        { label: t("home.categoryShowcase.liquor.stats.1.label"), value: "30+" },
        { label: t("home.categoryShowcase.liquor.stats.2.label"), value: t("home.categoryShowcase.liquor.stats.2.value") },
      ],
    },
  ];
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] mb-3">COLLECTIONS</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            经典系列
          </h2>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.link}
              className={`group relative overflow-hidden rounded-2xl aspect-[4/3] animate-fade-up opacity-0`}
              style={{ animationDelay: `${index * 150 + 100}ms`, animationFillMode: "forwards" }}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Subtitle */}
                <p className="text-gold/80 text-sm tracking-[0.3em] mb-2">
                  {category.subtitle}
                </p>

                {/* Title */}
                <h3 className="font-display text-3xl md:text-4xl text-primary-foreground mb-3 group-hover:text-gold transition-colors">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-primary-foreground/70 mb-6 max-w-md">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex gap-8 mb-6">
                  {category.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-display text-gold">{stat.value}</p>
                      <p className="text-xs text-primary-foreground/60 tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-primary-foreground group-hover:text-gold transition-colors">
                  <span className="text-sm font-medium tracking-wide">立即探索</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
