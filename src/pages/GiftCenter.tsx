import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Gift, Briefcase, Heart, Sparkles, ArrowRight } from "lucide-react";
import giftSet from "@/assets/gift-set.jpg";

const giftCategories = [
  {
    id: "business",
    icon: Briefcase,
    title: "商务礼赠",
    description: "稳重大气，彰显尊贵品味",
    color: "bg-wine",
  },
  {
    id: "elder",
    icon: Heart,
    title: "长辈束脩",
    description: "寓意健康长寿，表达孝心",
    color: "bg-tea-brown",
  },
  {
    id: "festival",
    icon: Gift,
    title: "节日礼赠",
    description: "佳节送礼，传递美好祝福",
    color: "bg-gold",
  },
  {
    id: "custom",
    icon: Sparkles,
    title: "私人定制",
    description: "专属刻字，独一无二的心意",
    color: "bg-ink",
  },
];

const featuredGifts = [
  {
    id: 1,
    name: "茶酒双臻礼盒",
    subtitle: "普洱+酱香酒 · 商务臻选",
    price: "¥3,880",
    originalPrice: "¥4,580",
    image: giftSet,
    tag: "热销TOP1",
  },
  {
    id: 2,
    name: "百年好合礼盒",
    subtitle: "双瓶装 · 婚庆专享",
    price: "¥2,680",
    originalPrice: null,
    image: giftSet,
    tag: "新品",
  },
  {
    id: 3,
    name: "福寿安康礼盒",
    subtitle: "老白茶+黄酒 · 长辈专属",
    price: "¥1,880",
    originalPrice: "¥2,280",
    image: giftSet,
    tag: null,
  },
  {
    id: 4,
    name: "龙年限定礼盒",
    subtitle: "生肖酒+龙井茶 · 限量版",
    price: "¥6,880",
    originalPrice: null,
    image: giftSet,
    tag: "限量",
  },
];

const customServices = [
  { title: "瓶身刻字", description: "激光雕刻祝福语" },
  { title: "礼盒烫金", description: "金色印制企业Logo" },
  { title: "专属卡片", description: "手写祝福卡片" },
  { title: "上门服务", description: "大客户专人送达" },
];

const GiftCenter = () => {
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
              <span className="text-gold">礼赠中心</span>
            </nav>
            <h1 className="font-display text-5xl md:text-6xl mb-4">礼赠中心</h1>
            <p className="text-xl text-primary-foreground/70 max-w-xl">
              精选礼盒套装，传递尊贵心意。商务馈赠、长辈孝敬、节日祝福，一站式满足
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
              <p className="text-gold font-medium tracking-[0.2em] mb-3">POPULAR</p>
              <h2 className="font-display text-4xl text-foreground">精选礼盒</h2>
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
                <p className="text-gold font-medium tracking-[0.2em] mb-4">CUSTOMIZATION</p>
                <h2 className="font-display text-4xl md:text-5xl mb-6">
                  私人定制
                  <br />
                  <span className="text-gold">专属礼赠</span>
                </h2>
                <p className="text-primary-foreground/70 leading-relaxed mb-8 text-lg">
                  为您提供全方位的礼品定制服务，从瓶身刻字到礼盒设计，
                  打造独一无二的尊贵体验。企业订制起订量低，专属客服全程跟进。
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
                  立即咨询定制
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={giftSet}
                    alt="私人定制"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gold text-accent-foreground p-6 rounded-xl shadow-gold">
                  <p className="text-3xl font-display mb-1">50+</p>
                  <p className="text-sm">企业合作伙伴</p>
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
