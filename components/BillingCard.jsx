import { AlphaCard, Box, Button, Divider, HorizontalGrid, HorizontalStack, Icon, Text, VerticalStack } from "@shopify/polaris"
import { PaddedCell } from "./misc"
import { CircleTickMinor, CircleCancelMinor } from '@shopify/polaris-icons';
import { useTranslation } from "react-i18next";

const PlanFeature = (props) => {
    const { name, include } = props
    return <PaddedCell padding={["0", "5", "0", "5"]}>
        <HorizontalStack align="space-between">
            <HorizontalStack gap="1">
                <div width="25%">
                    {include ? <Icon source={CircleTickMinor} /> : null}
                </div>
                <div width="75%" className={include ? "" : "not-included"}>
                    {name}
                </div>
            </HorizontalStack>
            <div />
        </HorizontalStack>
    </PaddedCell>
}

export const BillingCard = (props) => {
    const { t } = useTranslation()
    const { src, name, msgs, negKeys, languages, personality, insights, history, current } = props

    return (
        <AlphaCard>
            <VerticalStack gap="4">
                <div className="plan-container">
                    <img src={src} className="plan-img" />
                </div>
                <div className="plan-name">
                    <p>
                        {name}
                    </p>
                </div>
                <Divider />
                <PlanFeature name={t("Billing.messages", { n: msgs })} include={true} />
                <PlanFeature name={t("Billing.negKeys")} include={negKeys} />
                <PlanFeature name={t("Billing.languages")} include={languages} />
                <PlanFeature name={t("Billing.personality")} include={personality} />
                <PlanFeature name={t("Billing.insights")} include={insights} />
                <PlanFeature name={t("Billing.history")} include={history} />
                <Button primary>{current ? t("Billing.currentPlan") : t("Billing.choosePlan")}</Button>
            </VerticalStack>
        </AlphaCard>
    )
}