import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Play, Search, Shield, MapPin, BookOpen, Camera, CheckCircle } from "lucide-react";
import heroTeaMountain from "@/assets/hero-tea-mountain.jpg";

const academyCourses = [
  {
    id: 1,
    title: "普洱茶冲泡指南",
    duration: "12分钟",
    level: "入门",
    thumbnail: heroTeaMountain,
  },
  {
    id: 2,
    title: "酱香酒品鉴方法",
    duration: "15分钟",
    level: "进阶",
    thumbnail: heroTeaMountain,
  },
  {
    id: 3,
    title: "茶具养护技巧",
    duration: "8分钟",
    level: "入门",
    thumbnail: heroTeaMountain,
  },
  {
    id: 4,
    title: "名酒收藏与储存",
    duration: "20分钟",
    level: "高级",
    thumbnail: heroTeaMountain,
  },
];

const origins = [
  {
    id: 1,
    name: "云南·勐海",
    type: "普洱茶基地",
    description: "千年古茶树群落，班章老寨核心产区",
    image: heroTeaMountain,
    live: true,
  },
  {
    id: 2,
    name: "贵州·茅台镇",
    type: "酱香酒窖",
    description: "赤水河畔，国酒之乡的千年窖藏",
    image: heroTeaMountain,
    live: false,
  },
  {
    id: 3,
    name: "福建·武夷山",
    type: "岩茶产区",
    description: "世界自然与文化双遗产，大红袍原产地",
    image: heroTeaMountain,
    live: true,
  },
];

const verifySteps = [
  { step: 1, title: "扫描二维码", description: "使用手机扫描产品包装上的专属二维码" },
  { step: 2, title: "输入防伪码", description: "输入产品标签上的16位防伪码" },
  { step: 3, title: "查看结果", description: "获取产品完整信息及溯源数据" },
];

const CultureTraceability = () => {
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
              <span className="text-gold">雅集溯源</span>
            </nav>
            <h1 className="font-display text-5xl md:text-6xl mb-4">雅集溯源</h1>
            <p className="text-xl text-primary-foreground/70 max-w-xl">
              探索茶酒文化，追溯每一件产品的源头，了解匠心传承的故事
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#academy" className="px-6 py-3 bg-card rounded-full text-sm hover:bg-wine hover:text-primary-foreground transition-colors">
                <BookOpen className="w-4 h-4 inline mr-2" />
                品鉴学院
              </a>
              <a href="#verify" className="px-6 py-3 bg-card rounded-full text-sm hover:bg-wine hover:text-primary-foreground transition-colors">
                <Shield className="w-4 h-4 inline mr-2" />
                防伪溯源
              </a>
              <a href="#origins" className="px-6 py-3 bg-card rounded-full text-sm hover:bg-wine hover:text-primary-foreground transition-colors">
                <MapPin className="w-4 h-4 inline mr-2" />
                产地探访
              </a>
              <a href="#live" className="px-6 py-3 bg-card rounded-full text-sm hover:bg-wine hover:text-primary-foreground transition-colors">
                <Camera className="w-4 h-4 inline mr-2" />
                基地直播
              </a>
            </div>
          </div>
        </section>

        {/* Academy Section */}
        <section id="academy" className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold font-medium tracking-[0.2em] mb-3">ACADEMY</p>
              <h2 className="font-display text-4xl text-foreground mb-4">品鉴学院</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                专业视频教学，从入门到精通，带您领略茶酒文化的深厚底蕴
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {academyCourses.map((course, index) => (
                <div
                  key={course.id}
                  className={`group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-up opacity-0 cursor-pointer`}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center">
                        <Play className="w-6 h-6 text-accent-foreground ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-foreground/80 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded">
                      {course.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-gold">{course.level}</span>
                    <h3 className="font-medium text-foreground group-hover:text-wine transition-colors">
                      {course.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verify Section */}
        <section id="verify" className="py-20 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold font-medium tracking-[0.2em] mb-4">VERIFY</p>
                <h2 className="font-display text-4xl mb-6 text-foreground">
                  防伪溯源
                  <br />
                  <span className="text-wine">一瓶一码</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  每一件产品都拥有专属的防伪码和二维码，您可以随时查验产品真伪，
                  了解产品的完整生产链路，从原料到成品的每一个环节都有据可查。
                </p>

                {/* Steps */}
                <div className="space-y-6">
                  {verifySteps.map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-wine text-primary-foreground flex items-center justify-center shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verify Form */}
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <div className="text-center mb-8">
                  <Shield className="w-16 h-16 text-wine mx-auto mb-4" />
                  <h3 className="font-display text-2xl text-foreground mb-2">产品验真</h3>
                  <p className="text-sm text-muted-foreground">输入16位防伪码查询产品信息</p>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="请输入16位防伪码"
                    className="h-14 text-center text-lg tracking-widest"
                    maxLength={16}
                  />
                  <Button variant="wine" size="lg" className="w-full">
                    <Search className="w-5 h-5 mr-2" />
                    立即查询
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    防伪码位于产品包装内侧或瓶身标签上
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Origins Section */}
        <section id="origins" className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold font-medium tracking-[0.2em] mb-3">ORIGINS</p>
              <h2 className="font-display text-4xl text-foreground mb-4">产地探访</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                深入原产地，探访每一片茶山、每一座酒窖背后的故事
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {origins.map((origin, index) => (
                <div
                  key={origin.id}
                  className={`group relative aspect-[4/5] rounded-2xl overflow-hidden animate-fade-up opacity-0`}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <img
                    src={origin.image}
                    alt={origin.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />
                  
                  {origin.live && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs">
                      <span className="w-2 h-2 rounded-full bg-destructive-foreground animate-pulse" />
                      直播中
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <p className="text-gold text-sm mb-1">{origin.type}</p>
                    <h3 className="font-display text-2xl mb-2">{origin.name}</h3>
                    <p className="text-primary-foreground/70 text-sm mb-4">{origin.description}</p>
                    <Button variant="hero" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      {origin.live ? "观看直播" : "查看详情"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CultureTraceability;
