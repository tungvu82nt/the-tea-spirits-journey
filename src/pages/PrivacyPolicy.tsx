import { useTranslation } from "react-i18next";
import { Shield, Eye, Lock, Database, UserCheck, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const lastUpdated = "2024年1月1日";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-wine/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-wine" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            {t("privacyPolicy.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("privacyPolicy.lastUpdated")}: {lastUpdated}
          </p>
        </div>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            {t("privacyPolicy.introduction.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("privacyPolicy.introduction.description")}
          </p>
          <p className="text-muted-foreground">
            {t("privacyPolicy.introduction.commitment")}
          </p>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("privacyPolicy.informationWeCollect.title")}
            </h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-foreground mb-3">{t("privacyPolicy.informationWeCollect.personalInfo.title")}</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t("privacyPolicy.informationWeCollect.personalInfo.items", { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">{t("privacyPolicy.informationWeCollect.usageInfo.title")}</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t("privacyPolicy.informationWeCollect.usageInfo.items", { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">{t("privacyPolicy.informationWeCollect.deviceInfo.title")}</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t("privacyPolicy.informationWeCollect.deviceInfo.items", { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("privacyPolicy.informationUsage.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>{t("privacyPolicy.informationUsage.description")}</p>
            <ul className="list-disc list-inside space-y-2">
              {(t("privacyPolicy.informationUsage.purposes", { returnObjects: true }) as string[]).map((purpose: string, index: number) => (
                <li key={index}><strong>{purpose.split(":")[0]}:</strong>{purpose.split(":")[1]}</li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("privacyPolicy.informationSharing.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>{t("privacyPolicy.informationSharing.description")}</p>
            <ul className="list-disc list-inside space-y-2">
              {(t("privacyPolicy.informationSharing.cases", { returnObjects: true }) as string[]).map((caseItem: string, index: number) => (
                <li key={index}><strong>{caseItem.split(":")[0]}:</strong>{caseItem.split(":")[1]}</li>
              ))}
            </ul>
            <p className="mt-4">
              {t("privacyPolicy.informationSharing.note")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("privacyPolicy.yourRights.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>{t("privacyPolicy.yourRights.description")}</p>
            <ul className="list-disc list-inside space-y-2">
              {(t("privacyPolicy.yourRights.rights", { returnObjects: true }) as string[]).map((right: string, index: number) => (
                <li key={index}><strong>{right.split(":")[0]}:</strong>{right.split(":")[1]}</li>
              ))}
            </ul>
            <p className="mt-4">
              {t("privacyPolicy.yourRights.contact")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("privacyPolicy.dataSecurity.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>{t("privacyPolicy.dataSecurity.description")}</p>
            <ul className="list-disc list-inside space-y-2">
              {(t("privacyPolicy.dataSecurity.measures", { returnObjects: true }) as string[]).map((measure: string, index: number) => (
                <li key={index}>{measure}</li>
              ))}
            </ul>
            <p className="mt-4">
              {t("privacyPolicy.dataSecurity.disclaimer")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("privacyPolicy.cookiePolicy.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("privacyPolicy.cookiePolicy.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {(t("privacyPolicy.cookiePolicy.types", { returnObjects: true }) as string[]).map((type: string, index: number) => (
                <li key={index}><strong>{type.split(":")[0]}:</strong>{type.split(":")[1]}</li>
              ))}
            </ul>
            <p className="mt-4">
              {t("privacyPolicy.cookiePolicy.note")}
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("privacyPolicy.childrenPrivacy.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            {(t("privacyPolicy.childrenPrivacy.description", { returnObjects: true }) as string[]).map((desc: string, index: number) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {t("privacyPolicy.policyChanges.title")}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            {(t("privacyPolicy.policyChanges.description", { returnObjects: true }) as string[]).map((desc: string, index: number) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </Card>

        <Card className="p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("privacyPolicy.contact.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("privacyPolicy.contact.description")}
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p><strong>Email:</strong> {t("privacyPolicy.contact.email")}</p>
              <p><strong>Phone:</strong> {t("privacyPolicy.contact.phone")}</p>
              <p><strong>Address:</strong> {t("privacyPolicy.contact.address")}</p>
            </div>
            <p>
              {t("privacyPolicy.contact.note")}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
