import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t("contact.fillRequired"));
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success(t("contact.messageSent"));
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const faqItems = [
    {
      question: t("contact.faq1.question"),
      answer: t("contact.faq1.answer"),
    },
    {
      question: t("contact.faq2.question"),
      answer: t("contact.faq2.answer"),
    },
    {
      question: t("contact.faq3.question"),
      answer: t("contact.faq3.answer"),
    },
    {
      question: t("contact.faq4.question"),
      answer: t("contact.faq4.answer"),
    },
    {
      question: t("contact.faq5.question"),
      answer: t("contact.faq5.answer"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-wine/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-wine" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{t("contact.hotline")}</h3>
                <p className="text-sm text-muted-foreground">{t("contact.hotlineNumber")}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("contact.workingHours")}
            </p>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-wine/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-wine" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{t("contact.email")}</h3>
                <p className="text-sm text-muted-foreground">{t("contact.emailAddress")}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("contact.emailResponse")}
            </p>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-wine/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-wine" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{t("contact.address")}</h3>
                <p className="text-sm text-muted-foreground">{t("contact.addressValue")}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("contact.visitUs")}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 shadow-soft">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              {t("contact.sendMessage")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t("contact.name")}</Label>
                <Input
                  id="name"
                  placeholder={t("contact.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">{t("contact.emailLabel")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t("contact.phoneLabel")}</Label>
                  <Input
                    id="phone"
                    placeholder={t("contact.phonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>{t("contact.inquiryType")}</Label>
                <RadioGroup
                  value={formData.inquiryType}
                  onValueChange={(value) => handleInputChange("inquiryType", value)}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general" className="cursor-pointer">{t("contact.general")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="order" id="order" />
                    <Label htmlFor="order" className="cursor-pointer">{t("contact.order")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="product" id="product" />
                    <Label htmlFor="product" className="cursor-pointer">{t("contact.product")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="return" id="return" />
                    <Label htmlFor="return" className="cursor-pointer">{t("contact.return")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">{t("contact.other")}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="subject">{t("contact.subject")}</Label>
                <Input
                  id="subject"
                  placeholder={t("contact.subjectPlaceholder")}
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="message">{t("contact.message")}</Label>
                <Textarea
                  id="message"
                  placeholder={t("contact.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                <Send className="w-4 h-4" />
                {isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
            </form>
          </Card>

          <div>
            <Card className="p-6 shadow-soft mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {t("contact.onlineSupport")}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <MessageSquare className="w-8 h-8 text-wine" />
                  <div>
                    <p className="font-medium text-foreground">{t("contact.liveChat")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("contact.liveChatDesc")}
                    </p>
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {t("contact.startChat")}
                </Button>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {t("contact.serviceHours")}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">{t("contact.weekdays")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("contact.weekdaysTime")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">{t("contact.weekends")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("contact.weekendsTime")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">{t("contact.onlineService")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("contact.onlineServiceDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("contact.faq")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium text-foreground mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
