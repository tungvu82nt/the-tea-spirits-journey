import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart, Heart, Share2, Star, MapPin, Award, Truck, Shield, ChevronRight, ZoomIn, Flame } from "lucide-react";
import productBaijiu from "@/assets/product-baijiu.jpg";

const LiquorProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("500ml");
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    id: 1,
    name: "国韵酱香",
    subtitle: "15年窖藏 · 500ml",
    description: "精选国酒级酱香白酒，历经15年窖藏陈酿。酒体醇厚丰满，酱香突出优雅，回味悠长。采用传统坤沙工艺，纯粮固态发酵，是商务宴请、收藏品鉴的上乘之选。",
    price: 2980,
    originalPrice: 3280,
    category: "酱香型白酒",
    origin: "贵州 · 茅台镇",
    year: "15年窖藏",
    grade: "收藏级",
    aroma: "酱香型",
    alcohol: "53%vol",
    rating: 4.9,
    reviews: 256,
    stock: 8,
    images: [productBaijiu, productBaijiu, productBaijiu],
    variants: [
      { id: "500ml", name: "500ml", price: 2980, stock: 8 },
      { id: "1000ml", name: "1000ml", price: 5680, stock: 5 },
      { id: "2500ml", name: "2500ml", price: 13800, stock: 3 },
    ],
    specifications: [
      { label: "香型", value: "酱香型" },
      { label: "酒精度", value: "53%vol" },
      { label: "产地", value: "贵州茅台镇" },
      { label: "窖藏", value: "15年" },
      { label: "原料", value: "纯粮固态发酵" },
      { label: "工艺", value: "传统坤沙工艺" },
      { label: "规格", value: "500ml/瓶" },
    ],
    features: [
      "15年窖藏陈酿",
      "传统坤沙工艺",
      "纯粮固态发酵",
      "酱香突出优雅",
      "回味悠长",
    ],
    tastingNotes: [
      { phase: "闻香", description: "酱香突出，优雅细腻" },
      { phase: "入口", description: "醇厚丰满，绵柔顺滑" },
      { phase: "回味", description: "悠长持久，空杯留香" },
    ],
  };

  const relatedProducts = [
    {
      id: 2,
      name: "茅台飞天",
      price: 3580,
      image: productBaijiu,
      category: "酱香型白酒",
    },
    {
      id: 3,
      name: "五粮液经典",
      price: 1680,
      image: productBaijiu,
      category: "浓香型白酒",
    },
    {
      id: 4,
      name: "汾酒青花",
      price: 880,
      image: productBaijiu,
      category: "清香型白酒",
    },
  ];

  const reviews = [
    {
      id: 1,
      user: "赵先生",
      rating: 5,
      date: "2024-12-18",
      content: "酱香突出，入口绵柔，回味悠长。15年的窖藏果然名不虚传，商务宴请很有面子。",
      helpful: 18,
    },
    {
      id: 2,
      user: "孙女士",
      rating: 5,
      date: "2024-12-12",
      content: "包装精美，酒质上乘。送给了父亲，他非常喜欢。已经推荐给朋友了。",
      helpful: 12,
    },
    {
      id: 3,
      user: "周先生",
      rating: 4,
      date: "2024-12-08",
      content: "整体不错，就是价格有点贵。不过酱香确实好，值这个价。",
      helpful: 8,
    },
  ];

  const handleAddToCart = () => {
    toast({
      title: t("productDetail.addedToCart"),
      description: `${product.name} x${quantity} ${t("productDetail.addedToCartDesc")}`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? t("productDetail.removedFromWishlist") : t("productDetail.addedToWishlist"),
      description: isWishlisted ? t("productDetail.removedFromWishlistDesc") : t("productDetail.addedToWishlistDesc"),
    });
  };

  const handleShare = () => {
    toast({
      title: t("productDetail.shareSuccess"),
      description: t("productDetail.shareSuccessDesc"),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-wine transition-colors">{t("productDetail.home")}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/liquor" className="hover:text-wine transition-colors">{t("productDetail.liquor")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden mb-4 cursor-zoom-in" onClick={() => setSelectedImage(0)}>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gold text-accent-foreground">{product.grade}</Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-3 hover:bg-background transition-colors">
                  <ZoomIn className="w-6 h-6 text-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-wine" : "border-border hover:border-wine/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gold text-sm tracking-widest mb-2">{product.category}</p>
                <h1 className="font-display text-4xl text-foreground mb-3">{product.name}</h1>
                <p className="text-muted-foreground text-lg">{product.subtitle}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} {t("productDetail.reviews")})</span>
              </div>

              <div className="flex items-baseline gap-3">
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ¥{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-4xl font-display text-wine">
                  ¥{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    {t("productDetail.save")} ¥{(product.originalPrice - product.price).toLocaleString()}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{product.origin}</span>
                <Separator orientation="vertical" className="h-4" />
                <Award className="w-4 h-4" />
                <span>{product.year}</span>
                <Separator orientation="vertical" className="h-4" />
                <Flame className="w-4 h-4" />
                <span>{product.alcohol}</span>
                <Separator orientation="vertical" className="h-4" />
                <span>{t("productDetail.stock")}: {product.stock} {t("productDetail.pieces")}</span>
              </div>

              <div>
                <Label className="mb-3">{t("productDetail.specificationSelection")}</Label>
                <div className="grid grid-cols-3 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedVariant === variant.id
                          ? "border-wine bg-wine/5"
                          : "border-border hover:border-wine/50"
                      }`}
                    >
                      <p className="font-medium text-foreground mb-1">{variant.name}</p>
                      <p className="text-wine">¥{variant.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{t("productDetail.stock")}: {variant.stock}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3">{t("productDetail.quantity")}</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-none"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 h-10 text-center border-0 rounded-none"
                      min={1}
                      max={product.stock}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 rounded-none"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">{t("productDetail.maxPurchase")} {product.stock} {t("productDetail.pieces")}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="giftWrap"
                    checked={giftWrap}
                    onCheckedChange={(checked) => setGiftWrap(checked as boolean)}
                  />
                  <Label htmlFor="giftWrap" className="cursor-pointer">
                    {t("productDetail.giftWrap")} (+¥20)
                  </Label>
                </div>

                {giftWrap && (
                  <div className="space-y-2">
                    <Label htmlFor="giftMessage">{t("productDetail.giftMessage")}</Label>
                    <Input
                      id="giftMessage"
                      placeholder={t("productDetail.giftMessagePlaceholder")}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      maxLength={100}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {giftMessage.length}/100
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button variant="wine" size="xl" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t("productDetail.addToCart")}
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={handleWishlist}
                  className={isWishlisted ? "text-wine border-wine" : ""}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? t("productDetail.wishlisted") : t("productDetail.wishlist")}
                </Button>
                <Button variant="outline" size="xl" onClick={handleShare}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-wine mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{t("productDetail.authenticityGuarantee")}</p>
                </div>
                <div className="text-center">
                  <Truck className="w-8 h-8 text-wine mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{t("productDetail.freeShipping")}</p>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 text-wine mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{t("productDetail.7DayReturn")}</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="description">{t("productDetail.productDetails")}</TabsTrigger>
              <TabsTrigger value="specs">{t("productDetail.specifications")}</TabsTrigger>
              <TabsTrigger value="tasting">{t("productDetail.tastingNotes")}</TabsTrigger>
              <TabsTrigger value="reviews">{t("productDetail.reviews")}</TabsTrigger>
              <TabsTrigger value="shipping">{t("productDetail.shippingInfo")}</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="bg-card rounded-xl p-8 shadow-soft">
                <h2 className="font-display text-2xl text-foreground mb-6">{t("productDetail.productDescription")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

                <h3 className="font-display text-xl text-foreground mb-4">{t("productDetail.features")}</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <div className="bg-card rounded-xl p-8 shadow-soft">
                <h2 className="font-display text-2xl text-foreground mb-6">{t("productDetail.specifications")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasting" className="mt-6">
              <div className="bg-card rounded-xl p-8 shadow-soft">
                <h2 className="font-display text-2xl text-foreground mb-6">{t("productDetail.tastingNotes")}</h2>
                <div className="space-y-6">
                  {product.tastingNotes.map((note, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-wine/10 flex items-center justify-center shrink-0">
                        <span className="text-wine font-display text-xl">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-2">{note.phase}</h3>
                        <p className="text-muted-foreground">{note.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card rounded-xl p-8 shadow-soft">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-2xl text-foreground">{t("productDetail.userReviews")}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-display text-wine">{product.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-border last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <span className="font-medium text-foreground">{review.user[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{review.user}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "fill-gold text-gold" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-3">{review.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="hover:text-wine transition-colors">
                          {t("productDetail.helpful")} ({review.helpful})
                        </button>
                        <button className="hover:text-wine transition-colors">
                          {t("productDetail.reply")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    {t("productDetail.viewAllReviews")}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="bg-card rounded-xl p-8 shadow-soft">
                <h2 className="font-display text-2xl text-foreground mb-6">{t("productDetail.shippingInfo")}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Truck className="w-8 h-8 text-wine shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground mb-2">{t("productDetail.shippingMethod")}</h3>
                      <p className="text-muted-foreground">{t("productDetail.shippingMethodDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-wine shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground mb-2">{t("productDetail.packagingGuarantee")}</h3>
                      <p className="text-muted-foreground">{t("productDetail.packagingGuaranteeDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Award className="w-8 h-8 text-wine shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground mb-2">{t("productDetail.returnPolicy")}</h3>
                      <p className="text-muted-foreground">{t("productDetail.returnPolicyDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <section className="mb-16">
            <h2 className="font-display text-3xl text-foreground mb-8">{t("productDetail.relatedProducts")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/liquor/${product.id}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gold mb-1">{product.category}</p>
                    <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-wine transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xl font-display text-wine">
                      ¥{product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LiquorProductDetail;
