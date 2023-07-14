import { Spinner, Page, Layout, Button, AlphaCard, HorizontalGrid, Box, HorizontalStack, VerticalStack, Text, List, Divider } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { WelcomeCard } from "./WelcomeCard";
import { useActivePlan, useLatestScan, useMessageCounts, useScanner, useShopValidator } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import { DonutChart, PolarisVizLightTheme } from "@shopify/polaris-viz";
import { dateFromUTC, formatChatDataForDonut, formatValidationForDonut, getRaw, getTimeSince, localizeTimestamp } from "../utils";
import { CenteredSpinner, PaddedCell } from "./misc";
import { EmbedButton, InsightsButton, SettingsButton } from "./buttons";
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
    const [nextScanInfo, setNextScanInfo] = useState("")
    const [scanButton, setScanButton] = useState(<Button disabled={true} />)

    // Scan State logic
    // TODO: This was moved here because 2 components required scan info. Can it be containerized?
    const load = () => {
        getScan().then((scan) => refreshScan(scan))
    }

    useEffect(() => load(), [])

    const refreshScan = (scan) => {
        let tempButton = scanButton
        const primaryScan = <Button fullwidth primary icon={RecentSearchesMajor} onClick={() => scanCallback()}>{t("Button.scan")}</Button>
        const errorScan = <Button fullwidth primary icon={DiamondAlertMinor} onClick={() => scanCallback()}>{t("Button.scanError")}</Button>
        const pendingScan = <Button fullwidth disabled><HorizontalStack gap="1" blockAlign="center"><Spinner size="small" />{t("Button.scanPending")}</HorizontalStack></Button>
        const doneScanned = <Button fullwidth disabled icon={CircleTickMinor}>{t("Button.scanned")}</Button>
        if (!scan?.status) {
            setLastScanInfo(t("HomePage.scannedNever"))
            setNextScanInfo(t("HomePage.scanAvailable"))
            tempButton = primaryScan
        } else {
            const timestampUTC = dateFromUTC(scan.timestamp)
            const timeSince = getTimeSince(timestampUTC)
            const lastScanTimestamp = localizeTimestamp(timestampUTC)
            const nextScanTimestamp = localizeTimestamp(timestampUTC.setHours(timestampUTC.getHours() + 12))
            setLastScanInfo(t("HomePage.scanned", { localizedTimestamp: lastScanTimestamp }))

            if (["PENDING", "IN_PROGRESS"].includes(scan.status)) {
                tempButton = pendingScan
                setNextScanInfo(t("HomePage.scanAvailableIn", { localizedTimestamp: nextScanTimestamp }))
                setTimeout(load, 2000)
            } else if (["ERROR"].includes(scan.status)) {
                tempButton = errorScan
                setNextScanInfo(t("HomePage.scanAvailable"))
            } else if (timeSince < 12) {
                tempButton = doneScanned
                setNextScanInfo(t("HomePage.scanAvailableIn", { localizedTimestamp: nextScanTimestamp }))
            } else {
                tempButton = primaryScan
                setNextScanInfo(t("HomePage.scanAvailable"))
            }
        }

        setScanButton(tempButton)
    }

    const scanCallback = useCallback(() => {
        scanShop()
            .then((new_scan_id) => getScan(new_scan_id))
            .then((new_scan) => refreshScan(new_scan))
    })


    // Donut chart might be containerizable. Strong chance. We'll see.
    useEffect(() => refreshDonutLite(), [])
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

    const refreshDonutLite = () => {
        setDonut(<CenteredSpinner />)
        const maxDailyMessages = 200
        const until = new Date()
        const since = new Date(until)
        since.setDate(until.getDate() - 1)
        const used = t("Insights.used")
        const remaining = t("Insights.remaining")
        const key = t("Dates.today")
        const names = { used: used, remaining: remaining, key: key }
        getMessages(since, until)
            .then((data) => getRaw(data))
            .then((data) => formatChatDataForDonut(data, names, maxDailyMessages))
            .then((data) => setDonut(
                <DonutChart
                    data={data}
                    // showLegend={false}
                    legendPosition="right"
                    renderInnerValueContent={() => {
                        return <div>
                            <Text variant="bodyLg" fontWeight="bold">
                                {`${data[0].data[0].value}`}
                            </Text>
                            <Text variant="bodySm">
                                {`/ ${maxDailyMessages}`}
                            </Text>
                        </div>
                    }}
                />
            ))
    }

    const test = () => {
        // refreshScan({status: "ERROR", timestamp: "2023-07-07T23:19:12"})
        // refreshScan({status: "PENDING", timestamp: "2023-07-07T23:19:12"})
        // refreshScan({ status: "IN_PROGRESS", timestamp: "2023-07-07T23:19:12" })
        // refreshScan({status: "SUCCESS", timestamp: "2023-07-07T23:19:12"})
        // refreshScan({})
        // validateShop().then((data) => console.log(data))
        
    }
    const testButton = <Button onClick={() => test()}>TEST</Button>

    // const scan = <ScanButton />
    const settings = <SettingsButton />
    const embed = <EmbedButton />

    const commonMinHeight = "200px"
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
                                            <List.Item>{nextScanInfo}</List.Item>
                                            <List.Item>(Summary Statistic 1)</List.Item>
                                            <List.Item>(Summary Statistic 2)</List.Item>
                                        </List>
                                    </Box>
                                    <InsightsButton />
                                </VerticalStack>
                            </HorizontalGrid>
                        </AlphaCard>
                    </PaddedCell>
                </Layout.Section>
            </Layout>
        </Page >
    )
}
