import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const footerLinks = {
  products: [
    { name: "普洱/黑茶", href: "/tea?category=puerh" },
    { name: "乌龙/岩茶", href: "/tea?category=oolong" },
    { name: "酱香型白酒", href: "/liquor?aroma=maotai" },
    { name: "浓香型白酒", href: "/liquor?aroma=luzhou" },
    { name: "礼盒套装", href: "/gifts" },
  ],
  services: [
    { name: "企业定制", href: "/gifts#custom" },
    { name: "防伪溯源", href: "/culture#verify" },
    { name: "品鉴学院", href: "/culture#academy" },
    { name: "专属管家", href: "/account#concierge" },
  ],
  about: [
    { name: "品牌故事", href: "/culture#story" },
    { name: "产地探访", href: "/culture#origins" },
    { name: "合作伙伴", href: "/culture#partners" },
    { name: "联系我们", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto py-16 px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="text-accent-foreground font-display text-xl">雅</span>
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-wider">雅韵茶酒</h3>
                <p className="text-sm text-primary-foreground/60 tracking-widest">YA YUN COLLECTION</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-sm">
              承袭千年茶酒文化，甄选中华名茶佳酿。以匠心品质，致敬每一位尊贵的品鉴者。
            </p>
            <div className="space-y-3 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>400-888-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>service@yayun.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold" />
                <span>周一至周日 9:00 - 21:00</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>北京市朝阳区建国路88号</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold">产品系列</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold">尊享服务</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gold">了解我们</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto py-6 px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© 2024 雅韵茶酒 YA YUN COLLECTION. 保留所有权利。</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gold transition-colors">隐私政策</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">服务条款</Link>
            <Link to="/icp" className="hover:text-gold transition-colors">ICP备案</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
