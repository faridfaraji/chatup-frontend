import { Box, Grid, HorizontalStack, Layout, Page, VerticalStack, useBreakpoints } from "@shopify/polaris";
import { TallBillingCard, WideBillingCard } from "../components/BillingCard";
import { useTranslation } from "react-i18next";
import { canvas, mars, paper, steel } from "../assets";
import { PaddedCell } from "../components";

export default function Billing() {
    const { t } = useTranslation();
    const bp = useBreakpoints();

    const emrProps = { src: paper, name: t("Billing.emerging"), msgs: 50, negKeys: true, languages: true, personality: false, insights: false, history: false, }
    const estProps = { src: canvas, name: t("Billing.established"), msgs: 200, negKeys: true, languages: true, personality: true, insights: false, history: false, }
    const expProps = { src: steel, name: t("Billing.expanding"), msgs: 500, negKeys: true, languages: true, personality: true, insights: true, history: true, }
    const entProps = { src: mars, name: t("Billing.enterprise"), msgs: 0, negKeys: true, languages: true, personality: true, insights: true, history: true, }

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