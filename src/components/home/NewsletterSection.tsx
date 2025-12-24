import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "订阅成功",
      description: "感谢您的关注，我们将为您发送最新优惠信息。",
    });
    setEmail("");
    setPhone("");
  };

  return (
    <section className="py-24 bg-gradient-cream relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-ink-wash opacity-30" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gold font-medium tracking-[0.2em] mb-4">NEWSLETTER</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            尊享会员特权
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            订阅我们的会员通讯，抢先获取新品资讯、专属折扣与限量版发售通知
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="tel"
              placeholder="您的手机号码"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 h-14 px-6 text-base bg-card border-border focus:border-wine"
              required
            />
            <Button type="submit" variant="wine" size="xl" className="shrink-0">
              立即订阅
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6">
            订阅即表示您同意我们的
            <a href="/privacy" className="text-wine hover:underline">隐私政策</a>
            和
            <a href="/terms" className="text-wine hover:underline">服务条款</a>
          </p>
        </div>
      </div>
    </section>
  );
}
