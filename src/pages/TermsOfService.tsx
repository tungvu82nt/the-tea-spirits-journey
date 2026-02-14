import { useTranslation } from "react-i18next";
import { FileText, Shield, AlertCircle, CheckCircle, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";

const TermsOfService = () => {
  const { t } = useTranslation();
  const lastUpdated = "2024年1月1日";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-wine/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-wine" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            {t("termsOfService.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("termsOfService.lastUpdated")}: {lastUpdated}
          </p>
        </div>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            {t("termsOfService.acceptance.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            {(t("termsOfService.acceptance.description", { returnObjects: true }) as string[]).map((desc: string, index: number) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("termsOfService.serviceDescription.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.serviceDescription.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.serviceDescription.features", { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p>
              {t("termsOfService.serviceDescription.note")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("termsOfService.userAccount.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.userAccount.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.userAccount.agreements", { returnObjects: true }) as string[]).map((agreement: string, index: number) => (
                <li key={index}>{agreement}</li>
              ))}
            </ul>
            {(t("termsOfService.userAccount.restrictions", { returnObjects: true }) as string[]).map((restriction: string, index: number) => (
              <p key={index}>{restriction}</p>
            ))}
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.productInformation.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.productInformation.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.productInformation.disclaimers", { returnObjects: true }) as string[]).map((disclaimer: string, index: number) => (
                <li key={index}>{disclaimer}</li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.ordersAndPayment.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.ordersAndPayment.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.ordersAndPayment.terms", { returnObjects: true }) as string[]).map((term: string, index: number) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
            <p>
              {t("termsOfService.ordersAndPayment.note")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.shippingAndDelivery.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.shippingAndDelivery.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.shippingAndDelivery.terms", { returnObjects: true }) as string[]).map((term: string, index: number) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
            <p>
              {t("termsOfService.shippingAndDelivery.note")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.returnPolicy.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.returnPolicy.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.returnPolicy.terms", { returnObjects: true }) as string[]).map((term: string, index: number) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
            <p>
              {t("termsOfService.returnPolicy.note")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("termsOfService.userConduct.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.userConduct.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.userConduct.prohibitions", { returnObjects: true }) as string[]).map((prohibition: string, index: number) => (
                <li key={index}>{prohibition}</li>
              ))}
            </ul>
            <p>
              {t("termsOfService.userConduct.consequence")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.intellectualProperty.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.intellectualProperty.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.intellectualProperty.rights", { returnObjects: true }) as string[]).map((right: string, index: number) => (
                <li key={index}>{right}</li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.disclaimer.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.disclaimer.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.disclaimer.disclaimers", { returnObjects: true }) as string[]).map((disclaimer: string, index: number) => (
                <li key={index}>{disclaimer}</li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.limitationOfLiability.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.limitationOfLiability.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.limitationOfLiability.exclusions", { returnObjects: true }) as string[]).map((exclusion: string, index: number) => (
                <li key={index}>{exclusion}</li>
              ))}
            </ul>
            <p>
              {t("termsOfService.limitationOfLiability.cap")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("termsOfService.disputeResolution.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.disputeResolution.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.disputeResolution.terms", { returnObjects: true }) as string[]).map((term: string, index: number) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.termsChanges.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.termsChanges.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.termsChanges.terms", { returnObjects: true }) as string[]).map((term: string, index: number) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
            <p>
              {t("termsOfService.termsChanges.note")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.severability.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            {(t("termsOfService.severability.description", { returnObjects: true }) as string[]).map((desc: string, index: number) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.entireAgreement.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.entireAgreement.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("termsOfService.entireAgreement.terms", { returnObjects: true }) as string[]).map((term: string, index: number) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
            <p>
              {t("termsOfService.entireAgreement.note")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("termsOfService.contact.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("termsOfService.contact.description")}
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p><strong>Email:</strong> {t("termsOfService.contact.email")}</p>
              <p><strong>Phone:</strong> {t("termsOfService.contact.phone")}</p>
              <p><strong>Address:</strong> {t("termsOfService.contact.address")}</p>
            </div>
            <p>
              {t("termsOfService.contact.note")}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
