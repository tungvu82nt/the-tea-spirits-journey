import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { BrandStory } from "@/components/home/BrandStory";
import { ServicesSection } from "@/components/home/ServicesSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedProducts />
        <CategoryShowcase />
        <BrandStory />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
