import { AlphaCard, Divider, HorizontalGrid, Link, Page, Tabs, Text, VerticalStack } from "@shopify/polaris";
import { Trans, useTranslation } from "react-i18next";
import { PaddedCell, CardTitle, PlanFeature, PlanImage, ChoosePlanButton } from "../components";
import { useActivePlan } from "../hooks";
import { useEffect, useState } from "react";
import constants from "../constants";

const planIds = {
    'emerging': '[2',
    'expanding': '[4',
    'established': '[6',
    'enterprise': '[8',
}

export default function Plan() {
    const { t } = useTranslation();

    // Active plan data
    const getActivePlan = useActivePlan();
    const [activePlan, setActivePlan] = useState({ name: "...." });
    const activeId = activePlan?.name?.slice(0, 4)
    const onFree = activeId === "[00]"
    const load = () => getActivePlan().then((data) => setActivePlan(data))
    useEffect(() => load(), [])

    const [planTab, setPlanTab] = useState(1)
    const planTabs = [
        {
            id: 'emerging',
            content: t("Plan.[2")
        },
        {
            id: 'expanding',
            content: t("Plan.[4")
        },
        {
            id: 'established',
            content: t("Plan.[6")
        },
        {
            id: 'enterprise',
            content: t("Plan.[8")
        },
    ]

    const planName = planTabs[planTab].id
    const planId = planIds[planName]
    const enterpriseTab = planId === "[8"
    const planIdMonthly = `${planId}0]`
    const planIdYearly = `${planId}5]`

    const page = <Page>
        <HorizontalGrid columns={onFree ? { sm: 1, md: "2fr 1fr" } : 1} gap="4">
            <AlphaCard>
                <Tabs tabs={planTabs} selected={planTab} onSelect={index => setPlanTab(index)}>
                    <br />
                    <PlanImage plan={planName} />
                    <br />
                    <Divider />
                    <br />
                    <HorizontalGrid columns="2" gap="4">
                        <PlanFeature name={t(`Plan.${planId}Messages`)} />
                        <PlanFeature name={t(`Plan.${planId}Customers`)} />
                        <PlanFeature name={t("Plan.paid1")} />
                        <PlanFeature name={t("Plan.paid2")} />
                        <PlanFeature name={t("Plan.paid3")} />
                        <PlanFeature name={t("Plan.paid4")} />
                        <PlanFeature name={t("Plan.paid5")} />
                        <PlanFeature name={t("Plan.paid6")} />
                        {
                            enterpriseTab ?
                                <Text as="p" color="subdued">
                                    <Trans
                                        i18nKey={"Plan.enterpriseContact"}
                                        components={[<Link url={"mailto:care@awesoon.tech"} />]}
                                    />
                                </Text> :
                                <>
                                    <ChoosePlanButton
                                        current={planIdMonthly === activePlan.name.slice(0, 4)}
                                        priceInfo={constants.prices[planIdMonthly]}
                                        plan={planIdMonthly}
                                        name={t(`Plan.${planId}`)}
                                    />
                                    <ChoosePlanButton
                                        current={planIdYearly === activePlan.name.slice(0, 4)}
                                        priceInfo={constants.prices[planIdYearly]}
                                        plan={planIdYearly}
                                        name={t(`Plan.${planId}`)}
                                    />
                                </>
                        }
                    </HorizontalGrid>
                </Tabs>
            </AlphaCard>
            {
                onFree &&
                <AlphaCard>
                    <PaddedCell padding={["0", "5", "0", "5"]}>
                        <Text as="p" color="subdued">
                            {t("Plan.currentPlan")}
                        </Text>
                        <CardTitle title={t("Plan.free")} linebreak />
                    </PaddedCell>
                    <VerticalStack gap="4">
                        <PlanFeature name={t("Plan.free1")} />
                        <PlanFeature name={t("Plan.free2")} />
                        <PlanFeature name={t("Plan.free3")} />
                        <PlanFeature name={t("Plan.free4")} />
                        <PlanFeature name={t("Plan.free5")} />
                    </VerticalStack>
                </AlphaCard>
            }
        </HorizontalGrid>
    </Page>

    return page
}
