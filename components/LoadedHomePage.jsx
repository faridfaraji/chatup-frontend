import { Spinner, Page, Layout, Button, AlphaCard, HorizontalGrid, Box, HorizontalStack, VerticalStack, Text, List, Divider } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { WelcomeCard } from "./WelcomeCard";
import { useActivePlan, useLatestScan, useMessageCounts, useScanner, useShopValidator } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import { DonutChart, PolarisVizLightTheme } from "@shopify/polaris-viz";
import { dateFromUTC, formatChatDataForDonut, formatValidationForDonut, getRaw, getTimeSince, localizeTimestamp } from "../utils";
import { CenteredSpinner, PaddedCell } from "./misc";
import { EmbedButton, InsightsButton, SettingsButton, BillingButton } from "./buttons";
import { Robot } from "./images";
import { CardTitle } from "./CardTitle";
import { RecentSearchesMajor, RefreshMinor, CircleTickMinor, DiamondAlertMinor } from '@shopify/polaris-icons';

export function LoadedHomePage() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const getPlan = useActivePlan();
    const validateShop = useShopValidator();
    const getMessages = useMessageCounts();
    const [donut, setDonut] = useState(<CenteredSpinner />);
    const scanShop = useScanner();
    const getScan = useLatestScan();
    const [lastScanInfo, setLastScanInfo] = useState("")
    const [scanButton, setScanButton] = useState(<Button disabled={true} />)
    const [messagesRemaining, setMessagesRemaining] = useState(0);

    // Scan State logic
    // TODO: This was moved here because 2 components required scan info. Can it be containerized?
    const load = () => {
        getScan().then((scan) => refreshScan(scan))
    }

    useEffect(() => load(), [])

    const primaryScan = <Button fullwidth primary icon={RecentSearchesMajor} onClick={() => scanCallback()}>{t("Button.scan")}</Button>
    const errorScan = <Button fullwidth primary icon={DiamondAlertMinor} onClick={() => scanCallback()}>{t("Button.scanError")}</Button>
    const pendingScan = <Button fullwidth disabled><HorizontalStack gap="1" blockAlign="center"><Spinner size="small" />{t("Button.scanPending")}</HorizontalStack></Button>
    const doneScanned = (copy) => { return <Button fullwidth disabled icon={CircleTickMinor}>{copy}</Button> }

    const refreshScan = (scan) => {
        if (!scan?.status) {
            setLastScanInfo(t("HomePage.scannedNever"))
            setScanButton(primaryScan)
        } else {
            const timestampUTC = dateFromUTC(scan.timestamp)
            const timeSince = getTimeSince(timestampUTC)
            const lastScanTimestamp = localizeTimestamp(timestampUTC)
            const nextScanTimestamp = localizeTimestamp(timestampUTC.setHours(timestampUTC.getHours() + 12))
            setLastScanInfo(t("HomePage.scanned", { localizedTimestamp: lastScanTimestamp }))

            if (["PENDING", "IN_PROGRESS"].includes(scan.status)) {
                setScanButton(pendingScan)
                setTimeout(load, 2000)
            } else if (["ERROR"].includes(scan.status)) {
                setScanButton(errorScan)
            } else if (timeSince < 12) {
                setScanButton(doneScanned(t("HomePage.scanAvailableIn", { localizedTimestamp: nextScanTimestamp })))
            } else {
                setScanButton(primaryScan)
            }
        }
    }

    const scanCallback = useCallback(() => {
        const now = new Date()
        const ts = now.toISOString().slice(0, 19)
        refreshScan({status: "PENDING", timestamp: ts})
        scanShop()
            .then((new_scan_id) => getScan(new_scan_id))
            .then((new_scan) => refreshScan(new_scan))
    })


    // Donut chart might be containerizable. Strong chance. We'll see.
    useEffect(() => refreshDonut(), [])
    const refreshDonut = () => {
        setDonut(<CenteredSpinner />)
        const used = t("Insights.used")
        const remaining = t("Insights.remaining")
        const key = t("Dates.today")
        const names = { used: used, remaining: remaining, key: key }
        validateShop()
            .then((data) => (formatValidationForDonut(data, names)))
            .then((data) => {
                console.log(data)
                setMessagesRemaining(data.validation.message_limit - data.validation.current_usage)
                setDonut(
                    <DonutChart
                        data={data.donut}
                        legendPosition="right"
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
                    />)
            })
    }

    const test = () => {
        // refreshScan({status: "ERROR", timestamp: "2023-07-07T23:19:12"})
        // refreshScan({status: "PENDING", timestamp: "2023-07-07T23:19:12"})
        // refreshScan({ status: "IN_PROGRESS", timestamp: "2023-07-07T23:19:12" })
        // refreshScan({status: "SUCCESS", timestamp: "2023-07-07T23:19:12"})
        // refreshScan({})
        validateShop().then((data) => console.log(data))
        // console.log(nextScanInfo)
    }
    const testButton = <Button onClick={() => test()}>TEST</Button>

    // const scan = <ScanButton />
    const settings = <SettingsButton />
    const embed = <EmbedButton />

    const commonMinHeight = "250px"
    const paddingBlockStart = "25"
    const xsPadding = { xs: "5", sm: "0", }
    const xsColumns = { xs: "1", sm: "2", }

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
                        button={scanButton}
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
                        padding={["0", xsPadding, "0", xsPadding]}
                        minHeight={commonMinHeight}
                        title={t("HomePage.embedTitle")}
                        content={t("HomePage.embedCopy")}
                        button={embed}
                    />
                </Layout.Section>
                <Layout.Section fullWidth>
                    <PaddedCell padding={["0", xsPadding, "5", xsPadding]}>

                        <AlphaCard>
                            <CardTitle linebreak title={t("Insights.donutChartTitle")} />
                            <Divider />
                            <br />
                            <HorizontalGrid columns={xsColumns}>

                                {donut}
                                <VerticalStack align="end">
                                    <Box paddingBlockEnd={"20"}>
                                        <List type="bullet">
                                            <List.Item>{lastScanInfo}</List.Item>
                                            <List.Item>{t("HomePage.xMessagesRemaining", {x: messagesRemaining})}</List.Item>
                                            <List.Item>(X dollars for Y more messages)</List.Item>
                                            <List.Item>(Summary Statistic 2)</List.Item>
                                        </List>
                                    </Box>
                                    <BillingButton />
                                </VerticalStack>
                            </HorizontalGrid>
                        </AlphaCard>
                    </PaddedCell>
                </Layout.Section>
            </Layout>
        </Page >
    )
}
