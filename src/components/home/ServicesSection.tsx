import { Shield, Truck, Headphones, Gift, Award, RefreshCw } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "正品保障",
    description: "一瓶一码防伪溯源",
  },
  {
    icon: Truck,
    title: "顺丰直达",
    description: "全国包邮 · 急速送达",
  },
  {
    icon: Headphones,
    title: "专属管家",
    description: "1对1 VIP专线服务",
  },
  {
    icon: Gift,
    title: "精美包装",
    description: "礼盒定制 · 尊享体验",
  },
  {
    icon: Award,
    title: "品质承诺",
    description: "百年老字号合作授权",
  },
  {
    icon: RefreshCw,
    title: "无忧退换",
    description: "7天无理由退换货",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`text-center p-6 rounded-xl hover:bg-card hover:shadow-soft transition-all duration-300 animate-fade-up opacity-0`}
              style={{ animationDelay: `${index * 50 + 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-14 h-14 rounded-full bg-wine/10 flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-6 h-6 text-wine" />
              </div>
              <h3 className="font-medium text-foreground mb-1">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
