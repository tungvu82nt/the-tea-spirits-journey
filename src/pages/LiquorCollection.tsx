import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Grid3X3, LayoutList, Calendar, Award } from "lucide-react";
import productBaijiu from "@/assets/product-baijiu.jpg";

const aromaTypes = [
  { id: "all", name: "全部香型" },
  { id: "maotai", name: "酱香型" },
  { id: "luzhou", name: "浓香型" },
  { id: "qingxiang", name: "清香型" },
  { id: "fenxiang", name: "凤香型" },
  { id: "other", name: "其他香型" },
];

const vintages = [
  { id: "all", name: "全部年份" },
  { id: "5", name: "5年陈" },
  { id: "10", name: "10年陈" },
  { id: "15", name: "15年陈" },
  { id: "20", name: "20年陈" },
  { id: "30", name: "30年藏" },
];

const products = [
  {
    id: 1,
    name: "国韵酱香",
    subtitle: "15年窖藏 · 500ml",
    price: "¥2,980",
    aroma: "酱香型",
    vintage: "15年",
    image: productBaijiu,
    tag: "镇店之宝",
    rating: "98分",
  },
  {
    id: 2,
    name: "五粮液经典",
    subtitle: "浓香典范 · 500ml",
    price: "¥1,680",
    aroma: "浓香型",
    vintage: "10年",
    image: productBaijiu,
    tag: null,
    rating: "96分",
  },
  {
    id: 3,
    name: "汾酒青花",
    subtitle: "清香佳酿 · 500ml",
    price: "¥880",
    aroma: "清香型",
    vintage: "10年",
    image: productBaijiu,
    tag: "热销",
    rating: "94分",
  },
  {
    id: 4,
    name: "茅台飞天",
    subtitle: "国酒典范 · 500ml",
    price: "¥3,580",
    aroma: "酱香型",
    vintage: "15年",
    image: productBaijiu,
    tag: "收藏级",
    rating: "99分",
  },
  {
    id: 5,
    name: "龙年生肖酒",
    subtitle: "2024限量版 · 1000ml",
    price: "¥5,880",
    aroma: "酱香型",
    vintage: "20年",
    image: productBaijiu,
    tag: "限量版",
    rating: "99分",
  },
  {
    id: 6,
    name: "窖藏原浆",
    subtitle: "30年老酒 · 500ml",
    price: "¥8,880",
    aroma: "酱香型",
    vintage: "30年",
    image: productBaijiu,
    tag: "珍藏",
    rating: "100分",
  },
];

const LiquorCollection = () => {
  const [activeAroma, setActiveAroma] = useState("all");
  const [activeVintage, setActiveVintage] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Banner */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link to="/" className="hover:text-gold transition-colors">首页</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gold">佳酿陈列</span>
            </nav>
            <h1 className="font-display text-5xl md:text-6xl mb-4">佳酿陈列</h1>
            <p className="text-xl text-primary-foreground/70 max-w-xl">
              窖藏陈酿，岁月醇香。甄选国酒级佳酿，献给尊贵的品鉴者
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-20 z-30 bg-background border-b border-border py-4">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Aroma Type Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                {aromaTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveAroma(type.id)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                      activeAroma === type.id
                        ? "bg-wine text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-muted"
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={activeVintage}
                    onChange={(e) => setActiveVintage(e.target.value)}
                    className="bg-transparent text-sm focus:outline-none cursor-pointer"
                  >
                    {vintages.map((v) => (
                      <option key={v.id} value={v.id}>{v.name}</option>
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
                  to={`/liquor/${product.id}`}
                  className={`group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 animate-fade-up opacity-0 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-gradient-to-b from-muted to-secondary ${viewMode === "list" ? "w-48 shrink-0" : "aspect-square"}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gold text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                          {product.tag}
                        </span>
                      </div>
                    )}
                    {/* Rating Badge */}
                    <div className="absolute bottom-3 right-3 bg-foreground/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Award className="w-3 h-3 text-gold" />
                      <span className="text-xs text-primary-foreground font-medium">{product.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-5 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gold">{product.aroma}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{product.vintage}</span>
                    </div>
                    <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-wine transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.subtitle}</p>
                    <span className="text-xl font-display text-wine">{product.price}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                加载更多
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LiquorCollection;
