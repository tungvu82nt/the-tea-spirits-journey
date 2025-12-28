import { useTranslation } from "react-i18next";
import { Shield, Truck, Headphones, Gift, Award, RefreshCw } from "lucide-react";

export function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Shield,
      title: t('home.services.authentic'),
      description: t('home.services.authenticDesc'),
    },
    {
      icon: Truck,
      title: t('home.services.delivery'),
      description: t('home.services.deliveryDesc'),
    },
    {
      icon: Headphones,
      title: t('home.services.support'),
      description: t('home.services.supportDesc'),
    },
    {
      icon: Gift,
      title: t('home.services.packaging'),
      description: t('home.services.packagingDesc'),
    },
    {
      icon: Award,
      title: t('home.services.quality'),
      description: t('home.services.qualityDesc'),
    },
    {
      icon: RefreshCw,
      title: t('home.services.returns'),
      description: t('home.services.returnsDesc'),
    },
  ];
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
