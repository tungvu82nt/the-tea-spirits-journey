import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const milestones = [
  { year: "1998", event: "品牌创立于北京" },
  { year: "2008", event: "建立云南古树茶基地" },
  { year: "2015", event: "获得国家级酱香酒合作授权" },
  { year: "2024", event: "服务超过10万尊贵会员" },
];

export function BrandStory() {
  return (
    <section className="py-24 bg-foreground text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-gold font-medium tracking-[0.2em] mb-4">OUR STORY</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              传承千年
              <br />
              <span className="text-gold">茶酒文化</span>
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed mb-8 text-lg">
              雅韵茶酒创立于1998年，源自对中华传统茶酒文化的深厚热爱。
              二十余年来，我们深入云南茶山、贵州酒窖，只为寻觅最纯正的味道，
              将千年积淀的匠心工艺与现代品质标准相融合，为每一位尊贵的品鉴者
              呈现无与伦比的感官体验。
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
                了解更多
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
                  <p className="text-gold text-sm tracking-[0.4em]">SINCE 1998</p>
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
