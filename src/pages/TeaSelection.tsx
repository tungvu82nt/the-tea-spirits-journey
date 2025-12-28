import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Grid3X3, LayoutList, MapPin } from "lucide-react";
import productPuerh from "@/assets/product-puerh-tea.jpg";

const TeaSelection = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeOrigin, setActiveOrigin] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { id: "all", name: t("home.teaSelection.categories.all") },
    { id: "puerh", name: t("home.teaSelection.categories.puerh") },
    { id: "oolong", name: t("home.teaSelection.categories.oolong") },
    { id: "green", name: t("home.teaSelection.categories.green") },
    { id: "red", name: t("home.teaSelection.categories.red") },
    { id: "white", name: t("home.teaSelection.categories.white") },
  ];

  const origins = [
    { id: "all", name: t("home.teaSelection.origins.all") },
    { id: "yunnan", name: t("home.teaSelection.origins.yunnan") },
    { id: "fujian", name: t("home.teaSelection.origins.fujian") },
    { id: "anhui", name: t("home.teaSelection.origins.anhui") },
    { id: "zhejiang", name: t("home.teaSelection.origins.zhejiang") },
    { id: "sichuan", name: t("home.teaSelection.origins.sichuan") },
  ];

  const products = [
    {
      id: 1,
      name: t("home.teaSelection.products.1.name"),
      subtitle: t("home.teaSelection.products.1.subtitle"),
      price: t("home.teaSelection.products.1.price"),
      origin: t("home.teaSelection.products.1.origin"),
      category: t("home.teaSelection.products.1.category"),
      image: productPuerh,
      tag: t("home.teaSelection.products.1.tag"),
    },
    {
      id: 2,
      name: t("home.teaSelection.products.2.name"),
      subtitle: t("home.teaSelection.products.2.subtitle"),
      price: t("home.teaSelection.products.2.price"),
      origin: t("home.teaSelection.products.2.origin"),
      category: t("home.teaSelection.products.2.category"),
      image: productPuerh,
      tag: t("home.teaSelection.products.2.tag"),
    },
    {
      id: 3,
      name: t("home.teaSelection.products.3.name"),
      subtitle: t("home.teaSelection.products.3.subtitle"),
      price: t("home.teaSelection.products.3.price"),
      origin: t("home.teaSelection.products.3.origin"),
      category: t("home.teaSelection.products.3.category"),
      image: productPuerh,
      tag: t("home.teaSelection.products.3.tag"),
    },
    {
      id: 4,
      name: t("home.teaSelection.products.4.name"),
      subtitle: t("home.teaSelection.products.4.subtitle"),
      price: t("home.teaSelection.products.4.price"),
      origin: t("home.teaSelection.products.4.origin"),
      category: t("home.teaSelection.products.4.category"),
      image: productPuerh,
      tag: t("home.teaSelection.products.4.tag"),
    },
    {
      id: 5,
      name: t("home.teaSelection.products.5.name"),
      subtitle: t("home.teaSelection.products.5.subtitle"),
      price: t("home.teaSelection.products.5.price"),
      origin: t("home.teaSelection.products.5.origin"),
      category: t("home.teaSelection.products.5.category"),
      image: productPuerh,
      tag: t("home.teaSelection.products.5.tag"),
    },
    {
      id: 6,
      name: t("home.teaSelection.products.6.name"),
      subtitle: t("home.teaSelection.products.6.subtitle"),
      price: t("home.teaSelection.products.6.price"),
      origin: t("home.teaSelection.products.6.origin"),
      category: t("home.teaSelection.products.6.category"),
      image: productPuerh,
      tag: t("home.teaSelection.products.6.tag"),
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
              <Link to="/" className="hover:text-gold transition-colors">{t("home.teaSelection.breadcrumbHome")}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gold">{t("home.teaSelection.breadcrumbCurrent")}</span>
            </nav>
            <h1 className="font-display text-5xl md:text-6xl mb-4">{t("home.teaSelection.title")}</h1>
            <p className="text-xl text-primary-foreground/70 max-w-xl">
              {t("home.teaSelection.description")}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-20 z-30 bg-background border-b border-border py-4">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? "bg-wine text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={activeOrigin}
                    onChange={(e) => setActiveOrigin(e.target.value)}
                    className="bg-transparent text-sm focus:outline-none cursor-pointer"
                  >
                    {origins.map((o) => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-1 border-l border-border pl-4">
                  <Button
                    variant={viewMode === "grid" ? "wine" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "wine" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className={`grid gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {products.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/tea/${product.id}`}
                  className={`group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 animate-fade-up opacity-0 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 shrink-0" : "aspect-square"}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-wine text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {product.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-5 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
                    <p className="text-xs text-gold mb-1">{product.category}</p>
                    <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-wine transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-display text-wine">{product.price}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {product.origin}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                {t("home.teaSelection.loadMore")}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TeaSelection;
