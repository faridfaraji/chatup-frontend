import { Page, Layout, Button, CalloutCard, AlphaCard, EmptyState, HorizontalGrid, Box, HorizontalStack } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { WelcomeCard } from "./WelcomeCard";
import { EmbedButton, ScanButton, SettingsButton } from "./buttons";
import { useActivePlan, useShopValidator } from "../hooks";
import { useEffect, useState } from "react";
import { Robot } from "./images";
import { DonutChart } from "@shopify/polaris-viz";
import { CenteredSpinner } from "./misc";
import { formatValidationForDonut } from "../utils/dataUtils";

export function LoadedHomePage() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const getPlan = useActivePlan();
    const validateShop = useShopValidator();
    const [donut, setDonut] = useState(<CenteredSpinner />);


    useEffect(() => refreshDonut(), [])
    const refreshDonut = () => {
        setDonut(<CenteredSpinner />)
        validateShop()
            .then((data) => (formatValidationForDonut(data)))
            .then((data) =>
                setDonut(
                    <DonutChart
                        data={data.data}
                        showLegend={false}
                        legendPosition="top"
                        renderInnerValueContent={() => {
                            return <div>
                                <Text variant="bodyLg" fontWeight="bold">
                                    {`${data.validation.current_usage}`}
                                </Text>
                                <Text variant="bodySm">
                                    {`/ ${data.validation.message_limit}`}
                                </Text>
                            </div>
                        }}
                    />))
    }

    const test = () => {
        // validateShop().then((data) => console.log(data))
    }
    const testButton = <Button onClick={() => test()}>TEST</Button>

    const scan = <ScanButton />
    const settings = <SettingsButton />
    const embed = <EmbedButton />

    const commonMinHeight = "200px"
    const xsPadding = { xs: "5", sm: "0", }

    return (
        <Page
            title="Welcome to ChatUp"
            primaryAction={testButton}>
            <Layout>
                <Layout.Section fullWidth>
                    <Robot />
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
                    <AlphaCard.Section>
                        <HorizontalStack>
                            {donut}
                            <VerticalStack>
                                <Text>Last scanned</Text>
                                <Text>Scan available X hours</Text>
                                <Text>Messages Recieved Today</Text>
                                <Text>Summary Statistic</Text>
                                <InsightsButton />
                            </VerticalStack>
                        </HorizontalStack>
                    </AlphaCard.Section>
                </Layout.Section>
            </Layout>
        </Page >
    )
}
