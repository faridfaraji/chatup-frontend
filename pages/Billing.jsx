import { HorizontalStack, Page } from "@shopify/polaris";
import { BillingCard } from "../components/BillingCard";
import { useTranslation } from "react-i18next";
import { canvas, mars, paper, steel } from "../assets";

export default function Billing() {
    const { t } = useTranslation();
    return (
        <Page
            title={t("NavigationMenu.billing")}
            divider
        >
            <HorizontalStack align="space-evenly">
                <BillingCard src={paper} name={t("Billing.emerging")} msgs={50} negKeys={true} languages={true} personality={false} insights={false} history={false} />
                <BillingCard src={canvas} name={t("Billing.established")} msgs={200} negKeys={true} languages={true} personality={true} insights={false} history={false} />
                <BillingCard src={steel} name={t("Billing.expanding")} msgs={500} negKeys={true} languages={true} personality={true} insights={true} history={true} />
                <BillingCard src={mars} name={t("Billing.enterprise")} msgs={2000} negKeys={true} languages={true} personality={true} insights={true} history={true} />
            </HorizontalStack>
        </Page>
    )

}