import { AlphaCard, Box, Button, CalloutCard, Divider, HorizontalGrid, HorizontalStack, Icon, Layout, Text, VerticalStack } from "@shopify/polaris"
import { PaddedCell } from "./misc"
import { CircleTickMinor, CircleCancelMinor } from '@shopify/polaris-icons';
import { useTranslation } from "react-i18next";
import { CardTitle } from "./CardTitle";
import { mars } from "../assets";

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

export const TallBillingCard = (props) => {
    const { t } = useTranslation()
    const { src, name, msgs, negKeys, languages, personality, insights, history, current } = props.props
    const msgsName = msgs ? t("Billing.messages", { n: msgs }) : t("Billing.enterpriseMessages")

    return (
        <AlphaCard>
            <VerticalStack gap="4">
                <div className="tall-img-container">
                    <img src={src} className="plan-img tall-img" />
                </div>
                <div className="plan-name">
                    <p>
                        {name}
                    </p>
                </div>
                <Divider />
                <PlanFeature name={msgsName} include={true} />
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

export const WideBillingCard = (props) => {
    const { t } = useTranslation();
    const { src, name, msgs, negKeys, languages, personality, insights, history, current } = props.props
    const msgsName = msgs ? t("Billing.messages", { n: msgs }) : t("Billing.enterpriseMessages")

    return (
        <AlphaCard>
            <Layout>
                <Layout.Section oneThird>
                    <div className="wide-img-container">
                        <img src={src} className="plan-img wide-img" />
                    </div>
                </Layout.Section>
                <Layout.Section>
                    <CardTitle linebreak title={name} />
                    <Divider />
                    <br />
                    <VerticalStack gap="5">
                        <HorizontalGrid columns={2}>
                            <VerticalStack gap="4">
                                <PlanFeature name={msgsName} include={true} />
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
                            <Button fullWidth primary>{current ? t("Billing.currentPlan") : t("Billing.choosePlan")}</Button>
                        </div>
                    </VerticalStack>
                </Layout.Section>
            </Layout>
        </AlphaCard>
    )
}