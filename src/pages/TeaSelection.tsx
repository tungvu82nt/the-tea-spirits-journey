import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Grid3X3, LayoutList, MapPin } from "lucide-react";
import productPuerh from "@/assets/product-puerh-tea.jpg";

const categories = [
  { id: "all", name: "全部茗茶" },
  { id: "puerh", name: "普洱/黑茶" },
  { id: "oolong", name: "乌龙/岩茶" },
  { id: "green", name: "绿茶" },
  { id: "red", name: "红茶" },
  { id: "white", name: "白茶" },
];

const origins = [
  { id: "all", name: "全部产区" },
  { id: "yunnan", name: "云南" },
  { id: "fujian", name: "福建" },
  { id: "anhui", name: "安徽" },
  { id: "zhejiang", name: "浙江" },
  { id: "sichuan", name: "四川" },
];

const products = [
  {
    id: 1,
    name: "班章古树普洱",
    subtitle: "2018年春茶 · 357g茶饼",
    price: "¥2,680",
    origin: "云南 · 勐海",
    category: "普洱茶",
    image: productPuerh,
    tag: "镇店之宝",
  },
  {
    id: 2,
    name: "大红袍母树",
    subtitle: "武夷岩茶 · 250g",
    price: "¥1,880",
    origin: "福建 · 武夷山",
    category: "岩茶",
    image: productPuerh,
    tag: "限量发售",
  },
  {
    id: 3,
    name: "明前龙井",
    subtitle: "2024年头采 · 100g",
    price: "¥980",
    origin: "浙江 · 西湖",
    category: "绿茶",
    image: productPuerh,
    tag: "新品",
  },
  {
    id: 4,
    name: "老白茶饼",
    subtitle: "2015年陈化 · 350g",
    price: "¥1,580",
    origin: "福建 · 福鼎",
    category: "白茶",
    image: productPuerh,
    tag: null,
  },
  {
    id: 5,
    name: "金骏眉",
    subtitle: "桐木关正山 · 150g",
    price: "¥1,280",
    origin: "福建 · 武夷山",
    category: "红茶",
    image: productPuerh,
    tag: "热销",
  },
  {
    id: 6,
    name: "冰岛古树",
    subtitle: "2019年春茶 · 200g",
    price: "¥3,580",
    origin: "云南 · 临沧",
    category: "普洱茶",
    image: productPuerh,
    tag: "收藏级",
  },
];

const TeaSelection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeOrigin, setActiveOrigin] = useState("all");
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
              <span className="text-gold">茗茶萃取</span>
            </nav>
            <h1 className="font-display text-5xl md:text-6xl mb-4">茗茶萃取</h1>
            <p className="text-xl text-primary-foreground/70 max-w-xl">
              从云南古树到武夷岩韵，精选中华名茶，品味千年茶道
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

export default TeaSelection;
