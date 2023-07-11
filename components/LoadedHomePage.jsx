import { Page, Layout, Button, CalloutCard, AlphaCard, EmptyState, HorizontalGrid, Box, HorizontalStack } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { WelcomeCard } from "./WelcomeCard";
import { EmbedButton, ScanButton, SettingsButton } from "./buttons";
import { robot } from "../assets";

export function LoadedHomePage() {
    const { t } = useTranslation();

    const scan = <ScanButton />
    const settings = <SettingsButton />
    const embed = <EmbedButton />

    const commonMinHeight = "200px"
    const xsPadding = { xs: "5", sm: "0", }

    return (
        <Page>
            <Layout>

                <Layout.Section fullWidth>
                    <div style={{
                        "display": "block",
                        "margin-left": "auto",
                        "margin-right": "auto",
                        "width": "50%"}}
                    >
                            <EmptyState fullWidth image={robot}></EmptyState>
                    </div>
                </Layout.Section>
                <Layout.Section oneThird>
                    <WelcomeCard
                        padding={[xsPadding, xsPadding, "0", xsPadding]}
                        minHeight={commonMinHeight}
                        title={t("HomePage.scanTitle")}
                        content={t("HomePage.scanCopy")}
                        button={scan}
                    />
                </Layout.Section>
                <Layout.Section oneThird>
                    <WelcomeCard
                        padding={["0", xsPadding, "0", xsPadding]}
                        minHeight={commonMinHeight}
                        title={t("HomePage.settingsTitle")}
                        content={t("HomePage.settingsCopy")}
                        button={settings}
                    />
                </Layout.Section>
                <Layout.Section oneThird>
                    <WelcomeCard
                        padding={["0", xsPadding, xsPadding, xsPadding]}
                        minHeight={commonMinHeight}
                        title={t("HomePage.embedTitle")}
                        content={t("HomePage.embedCopy")}
                        button={embed}
                    />
                </Layout.Section>
                <Layout.Section fullWidth>
                    <AlphaCard>
                        
                    </AlphaCard>
                </Layout.Section>
            </Layout>
        </Page >
    )
}
