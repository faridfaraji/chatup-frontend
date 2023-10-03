import { Box, HorizontalStack, Layout, Page, Tabs, VerticalStack, useBreakpoints } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { PaddedCell, BillingCard } from "../components";
import { useActivePlan } from "../hooks";
import { useEffect, useState } from "react";

export default function Plan() {
    const { t } = useTranslation();
    const bp = useBreakpoints();

    // Active plan data
    const getActivePlan = useActivePlan();
    const [activePlan, setActivePlan] = useState({ name: "Free" });
    const load = () => getActivePlan().then((data) => setActivePlan(data))
    useEffect(() => load(), [])

    // Monthly/Yearly tabbing navigation
    const [selected, setSelected] = useState(0);
    const tabs = [
        {
            id: 'monthly-plans',
            content: t("Billing.monthly"),
        },
        {
            id: 'yearly-plans',
            content: t("Billing.yearly"),
        },
    ];

    const emergingPlan = selected === 0 ? "[20]" : "[25]"
    const establishedPlan = selected === 0 ? "[40]" : "[45]"
    const expandingPlan = selected === 0 ? "[60]" : "[65]"
    const enterprisePlan = selected === 0 ? "[80]" : "[85]"

    // row of 3 tall with wide enterprise underneath
    const lgPage =
        <Page>
            <Tabs tabs={tabs} selected={selected} onSelect={(index) => setSelected(index)} >
                <br />
                <Layout>
                    <Layout.Section fullWidth>
                        <HorizontalStack align="space-between">
                            <Box width="32%">
                                <BillingCard plan={emergingPlan} activePlan={activePlan} wide={false} />
                            </Box>
                            <Box width="32%">
                                <BillingCard plan={establishedPlan} activePlan={activePlan} wide={false} />
                            </Box>
                            <Box width="32%">
                                <BillingCard plan={expandingPlan} activePlan={activePlan} wide={false} />
                            </Box>
                        </HorizontalStack>
                    </Layout.Section>
                    <Layout.Section fullWidth>
                        <BillingCard plan={enterprisePlan} activePlan={activePlan} wide={true} />
                    </Layout.Section>
                </Layout>
            </ Tabs>
        </Page>


    // column of 4 wide cards 
    const smPage =
        <Tabs tabs={tabs} selected={selected} onSelect={(index) => setSelected(index)} >
            <PaddedCell padding={["5", "5", "0", "5",]}>
                <VerticalStack>
                    <BillingCard plan={emergingPlan} activePlan={activePlan} wide={true} /> <br />
                    <BillingCard plan={establishedPlan} activePlan={activePlan} wide={true} /> <br />
                    <BillingCard plan={expandingPlan} activePlan={activePlan} wide={true} /> <br />
                    <BillingCard plan={enterprisePlan} activePlan={activePlan} wide={true} /> <br />
                </VerticalStack>
            </PaddedCell>
        </ Tabs>

    // column of 4 tall cards
    const xsPage =
        <Tabs tabs={tabs} selected={selected} onSelect={(index) => setSelected(index)} >
            <PaddedCell padding={["5", "5", "0", "5",]}>
                <VerticalStack>
                    <BillingCard plan={emergingPlan} activePlan={activePlan} wide={false} /> <br />
                    <BillingCard plan={establishedPlan} activePlan={activePlan} wide={false} /> <br />
                    <BillingCard plan={expandingPlan} activePlan={activePlan} wide={false} /> <br />
                    <BillingCard plan={enterprisePlan} activePlan={activePlan} wide={false} /> <br />
                </VerticalStack>
            </PaddedCell>
        </ Tabs>

    return (bp.xsOnly ? xsPage : bp.smOnly ? smPage : lgPage)
}