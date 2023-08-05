import { Box, Grid, HorizontalStack, Layout, Page, VerticalStack, useBreakpoints } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { PaddedCell, TallBillingCard, WideBillingCard } from "../components";
import constants from "../constants";
import { useActivePlan } from "../hooks";
import { useEffect, useState } from "react";

export default function Billing() {
    const { t } = useTranslation();
    const bp = useBreakpoints();
    const getActivePlan = useActivePlan();
    const [activePlan, setActivePlan] = useState({ name: "Free" });

    const load = () => getActivePlan().then((data) => setActivePlan(data))
    useEffect(() => load(), [])

    const emrProps = {
        plan: "[20]",
        name: t("Billing.[20]"),
        msgs: constants.messages["[20]"],
        price: constants.prices["[20]"],
        current: "[20]" == activePlan.name.slice(0, 4),
        negKeys: true,
        languages: true,
        personality: false,
        insights: false,
        history: false,
    }
    const estProps = {
        plan: "[40]",
        name: t("Billing.[40]"),
        msgs: constants.messages["[40]"],
        price: constants.prices["[40]"],
        current: "[40]" == activePlan.name.slice(0, 4),
        negKeys: true,
        languages: true,
        personality: true,
        insights: false,
        history: false,
    }
    const expProps = {
        plan: "[60]",
        name: t("Billing.[60]"),
        msgs: constants.messages["[60]"],
        price: constants.prices["[60]"],
        current: "[60]" == activePlan.name.slice(0, 4),
        negKeys: true,
        languages: true,
        personality: true,
        insights: true,
        history: false,
    }
    const entProps = {
        plan: "[80]",
        name: t("Billing.[80]"),
        msgs: constants.messages["[80]"],
        price: constants.prices["[80]"],
        current: "[80]" == activePlan.name.slice(0, 4),
        negKeys: true,
        languages: true,
        personality: true,
        insights: true,
        history: true,
    }

    // row of 3 tall with wide enterprise underneath
    const lgPage = <Layout>
        <Layout.Section fullWidth>
            <HorizontalStack align="space-between">
                <Box minWidth="30%" maxWidth="32%">
                    <TallBillingCard props={emrProps} />
                </Box>
                <Box minWidth="30%" maxWidth="32%">
                    <TallBillingCard props={estProps} />
                </Box>
                <Box minWidth="30%" maxWidth="32%">
                    <TallBillingCard props={expProps} />
                </Box>
            </HorizontalStack>
        </Layout.Section>
        <Layout.Section fullWidth>
            <WideBillingCard props={entProps} />
        </Layout.Section>
    </Layout>

    // column of 4 wide cards 
    const smPage =
        <PaddedCell padding={["0", "0", "0", "5",]}>
            <VerticalStack>
                <WideBillingCard props={emrProps} /> <br />
                <WideBillingCard props={estProps} /> <br />
                <WideBillingCard props={expProps} /> <br />
                <WideBillingCard props={entProps} /> <br />
            </VerticalStack>
        </PaddedCell>

    // column of 4 tall cards
    const xsPage =
        <PaddedCell padding={["0", "0", "0", "5",]}>
            <VerticalStack>
                <TallBillingCard props={emrProps} /> <br />
                <TallBillingCard props={estProps} /> <br />
                <TallBillingCard props={expProps} /> <br />
                <TallBillingCard props={entProps} /> <br />
            </VerticalStack>
        </PaddedCell>

    return (
        <Page
            title={t("NavigationMenu.billing")}
            divider
        >
            <Layout>
                <PaddedCell padding={["0", "0", "5", "0",]}>
                    {bp.xsOnly ? xsPage : bp.smOnly ? smPage : lgPage}
                </PaddedCell>
            </Layout>
        </Page>
    )

}