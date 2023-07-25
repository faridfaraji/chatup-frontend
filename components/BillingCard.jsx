import { AlphaCard, Divider, HorizontalGrid, HorizontalStack, Layout, VerticalStack } from "@shopify/polaris"
import { useTranslation } from "react-i18next";
import { CardTitle } from "./CardTitle";
import { ChoosePlanButton } from "./buttons";
import { PlanFeature } from "./PlanFeature";
import { PlanName } from "./PlanName";
import { PlanImage } from "./images";

export const TallBillingCard = (props) => {
    const { t } = useTranslation()
    const { plan, name, msgs, negKeys, languages, personality, insights, history, current, price, enterprise, plan_name } = props.props

    return (
        <AlphaCard>
            <VerticalStack gap="4">
                <PlanImage plan={plan} />
                <PlanName name={name} />
                <Divider />
                <PlanFeature name={msgs ? t("Billing.messages", { n: msgs }) : t("Billing.enterpriseMessages")} include={true} />
                <PlanFeature name={t("Billing.negKeys")} include={negKeys} />
                <PlanFeature name={t("Billing.languages")} include={languages} />
                <PlanFeature name={t("Billing.personality")} include={personality} />
                <PlanFeature name={t("Billing.insights")} include={insights} />
                <PlanFeature name={t("Billing.history")} include={history} />
                <ChoosePlanButton current={current} price={price} enterprise={enterprise} plan_name={plan_name} />
            </VerticalStack>
        </AlphaCard>
    )
}

export const WideBillingCard = (props) => {
    const { t } = useTranslation();
    const { plan, name, msgs, negKeys, languages, personality, insights, history, current, price, enterprise, plan_name } = props.props

    return (
        <AlphaCard>
            <HorizontalGrid columns={{ sm: 1, md: ["oneThird", "twoThirds"] }}>
                <PlanImage plan={plan} />
                <VerticalStack>
                    <CardTitle linebreak title={name} />
                    <Divider />
                    <br />
                    <VerticalStack gap="5">
                        <HorizontalGrid columns={2}>
                            <VerticalStack gap="4">
                                <PlanFeature name={msgs ? t("Billing.messages", { n: msgs }) : t("Billing.enterpriseMessages")} include={true} />
                                <PlanFeature name={t("Billing.negKeys")} include={negKeys} />
                                <PlanFeature name={t("Billing.languages")} include={languages} />
                            </VerticalStack>
                            <VerticalStack gap="4">
                                <PlanFeature name={t("Billing.personality")} include={personality} />
                                <PlanFeature name={t("Billing.insights")} include={insights} />
                                <PlanFeature name={t("Billing.history")} include={history} />
                            </VerticalStack>
                        </HorizontalGrid>
                        <div style={{ width: "75%", alignSelf: "center" }}>
                            <ChoosePlanButton current={current} price={price} enterprise={enterprise} plan_name={plan_name} />
                        </div>
                    </VerticalStack>
                </VerticalStack>
            </HorizontalGrid>
        </AlphaCard>
    )
}
