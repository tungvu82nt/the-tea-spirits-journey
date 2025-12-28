import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Play, Search, Shield, MapPin, BookOpen, Camera, CheckCircle } from "lucide-react";
import heroTeaMountain from "@/assets/hero-tea-mountain.jpg";

const CultureTraceability = () => {
  const { t } = useTranslation();

  const academyCourses = [
    {
      id: 1,
      title: t("home.cultureTraceability.courses.1.title"),
      duration: t("home.cultureTraceability.courses.1.duration"),
      level: t("home.cultureTraceability.courses.1.level"),
      thumbnail: heroTeaMountain,
    },
    {
      id: 2,
      title: t("home.cultureTraceability.courses.2.title"),
      duration: t("home.cultureTraceability.courses.2.duration"),
      level: t("home.cultureTraceability.courses.2.level"),
      thumbnail: heroTeaMountain,
    },
    {
      id: 3,
      title: t("home.cultureTraceability.courses.3.title"),
      duration: t("home.cultureTraceability.courses.3.duration"),
      level: t("home.cultureTraceability.courses.3.level"),
      thumbnail: heroTeaMountain,
    },
    {
      id: 4,
      title: t("home.cultureTraceability.courses.4.title"),
      duration: t("home.cultureTraceability.courses.4.duration"),
      level: t("home.cultureTraceability.courses.4.level"),
      thumbnail: heroTeaMountain,
    },
  ];

  const origins = [
    {
      id: 1,
      name: t("home.cultureTraceability.origins.1.name"),
      type: t("home.cultureTraceability.origins.1.type"),
      description: t("home.cultureTraceability.origins.1.description"),
      image: heroTeaMountain,
      live: t("home.cultureTraceability.origins.1.live"),
    },
    {
      id: 2,
      name: t("home.cultureTraceability.origins.2.name"),
      type: t("home.cultureTraceability.origins.2.type"),
      description: t("home.cultureTraceability.origins.2.description"),
      image: heroTeaMountain,
      live: t("home.cultureTraceability.origins.2.live"),
    },
    {
      id: 3,
      name: t("home.cultureTraceability.origins.3.name"),
      type: t("home.cultureTraceability.origins.3.type"),
      description: t("home.cultureTraceability.origins.3.description"),
      image: heroTeaMountain,
      live: t("home.cultureTraceability.origins.3.live"),
    },
  ];

  const verifySteps = [
    { 
      step: 1, 
      title: t("home.cultureTraceability.verifySteps.1.title"), 
      description: t("home.cultureTraceability.verifySteps.1.description") 
    },
    { 
      step: 2, 
      title: t("home.cultureTraceability.verifySteps.2.title"), 
      description: t("home.cultureTraceability.verifySteps.2.description") 
    },
    { 
      step: 3, 
      title: t("home.cultureTraceability.verifySteps.3.title"), 
      description: t("home.cultureTraceability.verifySteps.3.description") 
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
              <Link to="/" className="hover:text-gold transition-colors">{t("home.cultureTraceability.breadcrumbHome")}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gold">{t("home.cultureTraceability.breadcrumbCurrent")}</span>
            </nav>
            <h1 className="font-display text-5xl md:text-6xl mb-4">{t("home.cultureTraceability.title")}</h1>
            <p className="text-xl text-primary-foreground/70 max-w-xl">
              {t("home.cultureTraceability.description")}
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#academy" className="px-6 py-3 bg-card rounded-full text-sm hover:bg-wine hover:text-primary-foreground transition-colors">
                <BookOpen className="w-4 h-4 inline mr-2" />
                {t("home.cultureTraceability.academy")}
              </a>
              <a href="#verify" className="px-6 py-3 bg-card rounded-full text-sm hover:bg-wine hover:text-primary-foreground transition-colors">
                <Shield className="w-4 h-4 inline mr-2" />
                {t("home.cultureTraceability.verify")}
              </a>
              <a href="#origins" className="px-6 py-3 bg-card rounded-full text-sm hover:bg-wine hover:text-primary-foreground transition-colors">
                <MapPin className="w-4 h-4 inline mr-2" />
                {t("home.cultureTraceability.origins")}
              </a>
              <a href="#live" className="px-6 py-3 bg-card rounded-full text-sm hover:bg-wine hover:text-primary-foreground transition-colors">
                <Camera className="w-4 h-4 inline mr-2" />
                {t("home.cultureTraceability.live")}
              </a>
            </div>
          </div>
        </section>

        {/* Academy Section */}
        <section id="academy" className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold font-medium tracking-[0.2em] mb-3">ACADEMY</p>
              <h2 className="font-display text-4xl text-foreground mb-4">{t("home.cultureTraceability.academyTitle")}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t("home.cultureTraceability.academyDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {academyCourses.map((course, index) => (
                <div
                  key={course.id}
                  className={`group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-up opacity-0 cursor-pointer`}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center">
                        <Play className="w-6 h-6 text-accent-foreground ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-foreground/80 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded">
                      {course.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-gold">{course.level}</span>
                    <h3 className="font-medium text-foreground group-hover:text-wine transition-colors">
                      {course.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verify Section */}
        <section id="verify" className="py-20 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold font-medium tracking-[0.2em] mb-4">VERIFY</p>
                <h2 className="font-display text-4xl mb-6 text-foreground">
                  {t("home.cultureTraceability.verifyTitle")}
                  <br />
                  <span className="text-wine">{t("home.cultureTraceability.verifyTitleHighlight")}</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t("home.cultureTraceability.verifyDescription")}
                </p>

                {/* Steps */}
                <div className="space-y-6">
                  {verifySteps.map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-wine text-primary-foreground flex items-center justify-center shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verify Form */}
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <div className="text-center mb-8">
                  <Shield className="w-16 h-16 text-wine mx-auto mb-4" />
                  <h3 className="font-display text-2xl text-foreground mb-2">{t("home.cultureTraceability.productVerify")}</h3>
                  <p className="text-sm text-muted-foreground">{t("home.cultureTraceability.verifyPlaceholder")}</p>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder={t("home.cultureTraceability.verifyPlaceholder")}
                    className="h-14 text-center text-lg tracking-widest"
                    maxLength={16}
                  />
                  <Button variant="wine" size="lg" className="w-full">
                    <Search className="w-5 h-5 mr-2" />
                    {t("home.cultureTraceability.queryNow")}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    {t("home.cultureTraceability.verifyLocation")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Origins Section */}
        <section id="origins" className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold font-medium tracking-[0.2em] mb-3">ORIGINS</p>
              <h2 className="font-display text-4xl text-foreground mb-4">{t("home.cultureTraceability.originsTitle")}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t("home.cultureTraceability.originsDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {origins.map((origin, index) => (
                <div
                  key={origin.id}
                  className={`group relative aspect-[4/5] rounded-2xl overflow-hidden animate-fade-up opacity-0`}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <img
                    src={origin.image}
                    alt={origin.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />
                  
                  {origin.live && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs">
                      <span className="w-2 h-2 rounded-full bg-destructive-foreground animate-pulse" />
                      {t("home.cultureTraceability.live")}
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <p className="text-gold text-sm mb-1">{origin.type}</p>
                    <h3 className="font-display text-2xl mb-2">{origin.name}</h3>
                    <p className="text-primary-foreground/70 text-sm mb-4">{origin.description}</p>
                    <Button variant="hero" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      {origin.live ? t("home.cultureTraceability.watchLive") : t("home.cultureTraceability.viewDetails")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CultureTraceability;
