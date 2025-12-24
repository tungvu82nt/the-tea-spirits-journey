import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "首页", href: "/" },
  { name: "茗茶萃取", href: "/tea" },
  { name: "佳酿陈列", href: "/liquor" },
  { name: "礼赠中心", href: "/gifts" },
  { name: "雅集溯源", href: "/culture" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center">
            <span className="text-primary-foreground font-display text-lg">雅</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl tracking-wider text-foreground group-hover:text-wine transition-colors">
              雅韵茶酒
            </h1>
            <p className="text-xs text-muted-foreground tracking-widest">YA YUN COLLECTION</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm tracking-wide transition-colors hover:text-wine relative py-2",
                location.pathname === item.href
                  ? "text-wine font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold"
                  : "text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="w-5 h-5" />
          </Button>
          <Link to="/account">
            <Button variant="wine" size="sm">
              <User className="w-4 h-4" />
              <span>我的账户</span>
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto py-4 px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block py-3 px-4 rounded-lg text-base transition-colors",
                  location.pathname === item.href
                    ? "bg-secondary text-wine font-medium"
                    : "text-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex gap-4">
              <Button variant="outline" size="sm" className="flex-1">
                <ShoppingBag className="w-4 h-4 mr-2" />
                购物车
              </Button>
              <Link to="/account" className="flex-1">
                <Button variant="wine" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  账户
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
