import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroTeaMountain from "@/assets/hero-tea-mountain.jpg";
import heroLiquorCellar from "@/assets/hero-liquor-cellar.jpg";

const slides = [
  {
    id: 1,
    image: heroTeaMountain,
    title: "云雾茶山",
    subtitle: "千年古树 · 匠心传承",
    description: "源自云南高山的古树普洱，每一片茶叶都蕴含着岁月的韵味",
    link: "/tea",
    linkText: "探索茗茶",
  },
  {
    id: 2,
    image: heroLiquorCellar,
    title: "窖藏佳酿",
    subtitle: "岁月陈香 · 尊贵典藏",
    description: "精选国酒级酱香白酒，时光沉淀的醇厚回味",
    link: "/liquor",
    linkText: "品鉴名酒",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Images */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex items-center px-4 lg:px-8">
        <div className="max-w-2xl">
          {/* Subtitle */}
          <p className="text-gold font-medium tracking-[0.3em] mb-4 animate-fade-up opacity-0 animation-delay-100">
            {slide.subtitle}
          </p>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 animate-fade-up opacity-0 animation-delay-200">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg leading-relaxed animate-fade-up opacity-0 animation-delay-300">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-up opacity-0 animation-delay-400">
            <Link to={slide.link}>
              <Button variant="gold" size="xl">
                {slide.linkText}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="hero" size="xl">
              <Play className="w-5 h-5" />
              观看品牌大片
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-12 bg-gold"
                : "w-6 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-8 z-10 hidden lg:flex flex-col items-center gap-2 text-primary-foreground/60">
        <span className="text-xs tracking-widest rotate-90 origin-center translate-y-6">SCROLL</span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary-foreground/40 to-primary-foreground/40 animate-pulse" />
      </div>
    </section>
  );
}
