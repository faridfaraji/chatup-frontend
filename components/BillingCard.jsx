import { AlphaCard, Divider, HorizontalGrid, VerticalStack } from "@shopify/polaris"
import { useTranslation } from "react-i18next";
import { CardTitle } from "./CardTitle";
import { ChoosePlanButton } from "./buttons";
import { PlanFeature } from "./PlanFeature";
import { PlanName } from "./PlanName";
import { PlanImage } from "./images";
import constants from "../constants";

export const BillingCard = ({ plan, activePlan, wide }) => {
    const { t } = useTranslation()
    const planCopyId = plan.slice(0, 2)
    const name = t(`Billing.${planCopyId}`)
    const msgs = constants.messages[planCopyId]
    const accessLevel = parseInt(plan.slice(1, 3))

    // card components
    const cardImage = <PlanImage plan={constants.plan_images[planCopyId]} />
    const messagesFeature = <PlanFeature name={msgs ? t("Billing.messages", { n: msgs }) : t("Billing.enterpriseMessages")} include={true} />
    const negKeysFeature = <PlanFeature name={t("Billing.negKeys")} include={true} />
    const languagesFeature = <PlanFeature name={t("Billing.languages")} include={true} />
    const personalityFeature = <PlanFeature name={t("Billing.personality")} include={accessLevel >= 40} />
    const insightsFeature = <PlanFeature name={t("Billing.insights")} include={accessLevel >= 60} />
    const historyFeature = <PlanFeature name={t("Billing.history")} include={accessLevel >= 80} />
    const chooseButton = <ChoosePlanButton
        current={plan === activePlan.name.slice(0, 4)}
        priceInfo={constants.prices[plan]}
        plan={plan}
        name={name}
    />

    // cards
    const wideCard =
        <AlphaCard>
            <HorizontalGrid columns={{ sm: 1, md: ["oneThird", "twoThirds"] }}>
                {cardImage}
                <VerticalStack>
                    <CardTitle linebreak title={name} />
                    <Divider />
                    <br />
                    <VerticalStack gap="5">
                        <HorizontalGrid columns={2}>
                            <VerticalStack gap="4">
                                {messagesFeature}
                                {negKeysFeature}
                                {languagesFeature}
                            </VerticalStack>
                            <VerticalStack gap="4">
                                {personalityFeature}
                                {insightsFeature}
                                {historyFeature}
                            </VerticalStack>
                        </HorizontalGrid>
                        <div style={{ width: "75%", alignSelf: "center" }}>
                            {chooseButton}
                        </div>
                    </VerticalStack>
                </VerticalStack>
            </HorizontalGrid>
        </AlphaCard>

    const tallCard =
        <AlphaCard>
            <VerticalStack gap="4">
                {cardImage}
                <PlanName name={name} />
                <Divider />
                {messagesFeature}
                {negKeysFeature}
                {languagesFeature}
                {personalityFeature}
                {insightsFeature}
                {historyFeature}
                {chooseButton}
            </VerticalStack>
        </AlphaCard>

    return (wide ? wideCard : tallCard)
}
