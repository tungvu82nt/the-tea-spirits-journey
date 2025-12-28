import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  const { t } = useTranslation();

  const milestones = [
    { year: "1998", event: t("home.brandStory.milestones.1998") },
    { year: "2008", event: t("home.brandStory.milestones.2008") },
    { year: "2015", event: t("home.brandStory.milestones.2015") },
    { year: "2024", event: t("home.brandStory.milestones.2024") },
  ];

  return (
    <section className="py-24 bg-foreground text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-gold font-medium tracking-[0.2em] mb-4">
              {t("home.brandStory.subtitle")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              {t("home.brandStory.title")}
              <br />
              <span className="text-gold">{t("home.brandStory.titleHighlight")}</span>
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed mb-8 text-lg">
              {t("home.brandStory.description")}
            </p>

            {/* Milestones */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="border-l-2 border-gold/30 pl-4">
                  <p className="text-2xl font-display text-gold">{milestone.year}</p>
                  <p className="text-sm text-primary-foreground/60">{milestone.event}</p>
                </div>
              ))}
            </div>

            <Link to="/culture">
              <Button variant="gold" size="lg">
                {t("home.brandStory.learnMore")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Decorative Element */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Background circles */}
              <div className="absolute inset-0 border border-gold/20 rounded-full animate-pulse" />
              <div className="absolute inset-8 border border-gold/30 rounded-full" />
              <div className="absolute inset-16 border border-gold/40 rounded-full" />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gold/10 flex items-center justify-center mb-4 mx-auto">
                    <span className="font-display text-6xl text-gold">雅</span>
                  </div>
                  <p className="text-gold text-sm tracking-[0.4em]">
                    {t("home.brandStory.since")}
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-wine/20 animate-float" />
              <div className="absolute bottom-8 left-4 w-12 h-12 rounded-full bg-gold/20 animate-float animation-delay-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
