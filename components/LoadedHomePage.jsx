import { Page, Layout, Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { WelcomeCard } from "./WelcomeCard";
import { EmbedButton, ScanButton, SettingsButton } from "./buttons";
import { useBilling, useShop } from "../hooks";

export function LoadedHomePage() {
    const { t } = useTranslation();

    const scan = <ScanButton />
    const settings = <SettingsButton />
    const embed = <EmbedButton />

    const commonMinHeight = "200px"

    return (
        <Page>
            <Layout>
                <Layout.Section oneThird>
                    <WelcomeCard
                        minHeight={commonMinHeight}
                        title={t("HomePage.scanTitle")}
                        content={t("HomePage.scanCopy")}
                        button={scan}
                    />
                </Layout.Section>
                <Layout.Section oneThird>
                    <WelcomeCard
                        minHeight={commonMinHeight}
                        title={t("HomePage.settingsTitle")}
                        content={t("HomePage.settingsCopy")}
                        button={settings}
                    />
                </Layout.Section>
                <Layout.Section oneThird>
                    <WelcomeCard
                        minHeight={commonMinHeight}
                        title={t("HomePage.embedTitle")}
                        content={t("HomePage.embedCopy")}
                        button={embed}
                    />
                </Layout.Section>
            </Layout>
        </Page >
    )
}
