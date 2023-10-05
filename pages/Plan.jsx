import { AlphaCard, Box, Divider, HorizontalGrid, Link, Page, Tabs, Text, VerticalStack } from "@shopify/polaris";
import { Trans, useTranslation } from "react-i18next";
import { PaddedCell, CardTitle, PlanFeature, PlanImage, ChoosePlanButton } from "../components";
import { useActivePlan, usePlanCanceller } from "../hooks";
import { useEffect, useState } from "react";
import constants from "../constants";
import { useNavigate } from "@shopify/app-bridge-react";

const planIds = {
    'emerging': '[2',
    'expanding': '[4',
    'established': '[6',
    'enterprise': '[8',
}

export default function Plan() {
    const { t } = useTranslation();
    const cancelPlan = usePlanCanceller();
    const navigate = useNavigate();

    // Returning to Free Plan:
    const handleFreeWill = () => {
        cancelPlan().then(() => navigate("/Dashboard"))
        // setPlan("[00]", t("Plan.[0")).then((data) => {
        //     const url = data?.confirmation_page_url
        //     console.log(data)
        //     if (url) {
        //         navigate(url)
        //     }
        // })
    }

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
        <HorizontalGrid columns={{ sm: 1, md: "2fr 1fr" }} gap="4">
            <AlphaCard>
                <Tabs fitted tabs={planTabs} selected={planTab} onSelect={index => setPlanTab(index)}>
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
                            !enterpriseTab &&
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
                    {
                        enterpriseTab &&
                        <>
                            <br />
                            <Text as="p" color="subdued">
                                <Trans
                                    i18nKey={"Plan.enterpriseContact"}
                                    components={[<Link url={"mailto:care@awesoon.tech"} />]}
                                />
                            </Text>
                        </>
                    }
                </Tabs>
            </AlphaCard>
            <AlphaCard>
                <div>
                    {
                        onFree ?
                            <>
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
                                    <PlanFeature name={t("Plan.free6")} />
                                </VerticalStack>
                            </> :
                            <>
                                <>
                                    <PaddedCell padding={["0", "5", "0", "5"]}>
                                        <CardTitle title={t("Plan.free")} linebreak />
                                    </PaddedCell>
                                    <VerticalStack gap="4">
                                        <PlanFeature name={t("Plan.free1")} />
                                        <PlanFeature name={t("Plan.free2")} />
                                        <PlanFeature name={t("Plan.free3")} />
                                        <PlanFeature name={t("Plan.free4")} />
                                        <PlanFeature name={t("Plan.free5")} />
                                        <PlanFeature name={t("Plan.free6")} />
                                    </VerticalStack>
                                </>
                                <div />
                                    <Link onClick={() => handleFreeWill()}>Regain Free Will</Link>
                            </>
                    }
                </div>
            </AlphaCard>
        </HorizontalGrid>
    </Page>

    return page
}
