import { useTranslation } from "react-i18next";
import { RotateCcw, Package, Clock, CheckCircle, AlertCircle, XCircle, FileText, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReturnPolicy = () => {
  const { t } = useTranslation();
  const lastUpdated = "2024年1月1日";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-cream to-cream-dark">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-wine/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <RotateCcw className="w-10 h-10 text-wine" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            {t("returnPolicy.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("returnPolicy.lastUpdated")}: {lastUpdated}
          </p>
        </div>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("returnPolicy.principles.title")}
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {t("returnPolicy.principles.description")}
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>{t("returnPolicy.principles.rules.0")}</li>
              <li>{t("returnPolicy.principles.rules.1")}</li>
              <li>{t("returnPolicy.principles.rules.2")}</li>
              <li>{t("returnPolicy.principles.rules.3")}</li>
              <li>{t("returnPolicy.principles.rules.4")}</li>
            </ul>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("returnPolicy.conditions.title")}
            </h2>
          </div>
          <div className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground mb-3">{t("returnPolicy.conditions.supported.title")}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>{t("returnPolicy.conditions.supported.items.0")}</li>
                <li>{t("returnPolicy.conditions.supported.items.1")}</li>
                <li>{t("returnPolicy.conditions.supported.items.2")}</li>
                <li>{t("returnPolicy.conditions.supported.items.3")}</li>
                <li>{t("returnPolicy.conditions.supported.items.4")}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">{t("returnPolicy.conditions.notSupported.title")}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>{t("returnPolicy.conditions.notSupported.items.0")}</li>
                <li>{t("returnPolicy.conditions.notSupported.items.1")}</li>
                <li>{t("returnPolicy.conditions.notSupported.items.2")}</li>
                <li>{t("returnPolicy.conditions.notSupported.items.3")}</li>
                <li>{t("returnPolicy.conditions.notSupported.items.4")}</li>
                <li>{t("returnPolicy.conditions.notSupported.items.5")}</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              退换货流程
            </h2>
          </div>
          <div className="space-y-6 text-muted-foreground">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-wine text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">申请退换货</h3>
                <p>
                  登录您的账户，进入订单详情页面，点击"申请退换货"按钮。
                  填写退换货原因和相关信息，提交申请。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-wine text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">等待审核</h3>
                <p>
                  我们的客服团队将在1-2个工作日内审核您的申请。
                  审核通过后，您将收到退换货确认邮件。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-wine text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">寄回商品</h3>
                <p>
                  按照确认邮件中的地址寄回商品。
                  请使用可靠的快递服务，并保留运单号以便跟踪。
                  商品必须包装完好，避免运输途中损坏。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-wine text-white flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">商品验收</h3>
                <p>
                  我们收到退回商品后，将在1-3个工作日内进行验收检查。
                  如符合退换货条件，将立即处理退款或换货。
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-wine text-white flex items-center justify-center flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">退款或换货</h3>
                <p>
                  退款将在7个工作日内原路返回到您的支付账户。
                  换货商品将在确认后1-3个工作日内重新发货。
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            退款政策
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <ul className="list-disc list-inside space-y-2">
              <li>退款将原路返回到您的支付账户</li>
              <li>退款处理时间通常为7个工作日</li>
              <li>退款金额不包括原订单的运费（除非是质量问题）</li>
              <li>退货运费由买家承担（除非是质量问题）</li>
              <li>如使用优惠券，退款金额将扣除优惠券价值</li>
              <li>银行处理时间可能额外需要3-5个工作日</li>
              <li>退款完成后，您将收到确认邮件</li>
            </ul>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="font-medium text-foreground mb-2">
                <AlertCircle className="w-5 h-5 inline mr-2" />
                注意事项
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>质量问题导致的退货，退货运费由我们承担</li>
                <li>无理由退货，退货运费由买家承担</li>
                <li>部分商品可能适用特殊退款政策</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            换货政策
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <ul className="list-disc list-inside space-y-2">
              <li>支持同款商品不同规格的换货</li>
              <li>支持换货为其他同等价值商品</li>
              <li>换货商品必须在7天内申请</li>
              <li>换货商品必须保持原包装和未使用状态</li>
              <li>换货产生的差价多退少补</li>
              <li>换货运费由买家承担（除非是质量问题）</li>
              <li>如换货商品缺货，将协助办理退款</li>
            </ul>
            <p className="mt-4">
              换货流程与退货流程相同，请在申请时选择"换货"选项。
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            质量问题处理
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              如果您收到的商品存在质量问题，我们将为您提供更优的退换货服务。
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>质量问题退货，退货运费由我们承担</li>
              <li>质量问题换货，免收换货运费</li>
              <li>可申请全额退款（包括原订单运费）</li>
              <li>提供商品照片或视频作为质量证明</li>
              <li>客服将在24小时内响应质量问题投诉</li>
              <li>优先处理质量问题退换货申请</li>
            </ul>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4">
              <p className="font-medium text-foreground mb-2">
                <XCircle className="w-5 h-5 inline mr-2 text-red-600" />
                质量问题定义
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>商品破损、变形或存在明显缺陷</li>
                <li>商品与描述严重不符</li>
                <li>商品过期或变质（针对食品类）</li>
                <li>包装破损导致商品受损</li>
                <li>商品配件缺失或错误</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            特殊商品政策
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              部分商品可能有特殊的退换货政策，请在购买前仔细阅读。
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>定制商品：</strong>不支持退换货，除非存在质量问题</li>
              <li><strong>食品类商品：</strong>开封后不支持退换货</li>
              <li><strong>贴身衣物：</strong>出于卫生考虑，不支持退换货</li>
              <li><strong>促销商品：</strong>可能适用特殊退换货政策</li>
              <li><strong>限量商品：</strong>售出后不支持退换货</li>
              <li><strong>虚拟商品：</strong>一经购买，不支持退换货</li>
            </ul>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            退换货地址
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium text-foreground mb-2">退货地址</p>
              <p>北京市朝阳区建国路88号</p>
              <p>茶灵之旅 退货部</p>
              <p>邮编：100025</p>
              <p className="mt-2">收件人：退货处理中心</p>
            </div>
            <ul className="list-disc list-inside space-y-2">
              <li>请在包裹上注明"退货"字样和订单号</li>
              <li>建议使用可追踪的快递服务</li>
              <li>保留运单号以便跟踪退货进度</li>
              <li>商品到达后，我们将通过邮件通知您</li>
            </ul>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-wine" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              所需文件
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              申请退换货时，请准备好以下文件：
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>订单号或购买凭证</li>
              <li>退换货申请表（可在订单页面下载）</li>
              <li>商品照片（如存在质量问题）</li>
              <li>快递运单号（寄回商品后提供）</li>
              <li>身份证复印件（如需要）</li>
            </ul>
            <p className="mt-4">
              缺少必要文件可能会影响退换货处理时间。
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-soft mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            常见问题
          </h2>
          <div className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: 退换货需要多长时间？</h3>
              <p>
                A: 从收到退回商品到完成退款或换货，通常需要7-10个工作日。
                质量问题申请将优先处理。
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: 退货运费谁承担？</h3>
              <p>
                A: 无理由退货的退货运费由买家承担。质量问题退货的退货运费由我们承担。
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: 可以在实体店退换货吗？</h3>
              <p>
                A: 目前仅支持线上退换货。如需在实体店退换货，请提前联系客服咨询。
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: 退款会退到哪里？</h3>
              <p>
                A: 退款将原路返回到您的支付账户。如使用多种支付方式，将按比例退款。
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Q: 可以部分退货吗？</h3>
              <p>
                A: 可以。如订单包含多个商品，可以仅退换部分商品。
                退款金额将按比例计算。
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            联系我们
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              如果您对退换货政策有任何疑问，或需要帮助处理退换货，
              请通过以下方式联系我们：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-wine" />
                  <p className="font-medium text-foreground">客服热线</p>
                </div>
                <p>400-888-8888</p>
                <p className="text-sm mt-1">工作日 9:00 - 18:00</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-wine" />
                  <p className="font-medium text-foreground">电子邮箱</p>
                </div>
                <p>returns@teaspirits.com</p>
                <p className="text-sm mt-1">24小时内回复</p>
              </div>
            </div>
            <div className="bg-wine/10 p-4 rounded-lg mt-4">
              <p className="font-medium text-foreground mb-2">
                温馨提示
              </p>
              <p className="text-sm">
                为加快处理速度，请在联系我们时提供订单号、商品信息和退换货原因。
                我们的客服团队将竭诚为您服务。
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReturnPolicy;
