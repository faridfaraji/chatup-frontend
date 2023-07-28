import { Spinner, Page, Layout, Button, AlphaCard, HorizontalGrid, Box, HorizontalStack, VerticalStack, Text, List, Divider, useBreakpoints } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { WelcomeCard } from "./WelcomeCard";
import { useActivePlan, useLatestScan, useMessageCounts, useScanner } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import { dateFromUTC, getTimeSince, localizeDatestamp, localizeTimestamp } from "../utils";
import { PaddedCell } from "./misc";
import { EmbedButton, SettingsButton, BillingButton } from "./buttons";
import { Robot } from "./images";
import { CardTitle } from "./CardTitle";
import { RecentSearchesMajor, CircleTickMinor, DiamondAlertMinor } from '@shopify/polaris-icons';
import { MessageDonut } from "./charts";
import constants from "../constants";

export function LoadedHomePage() {
    const { t } = useTranslation();
    const bp = useBreakpoints();
    const getActivePlan = useActivePlan();
    const [activePlan, setActivePlan] = useState(false);
    const getMessages = useMessageCounts();
    const [messages, setMessages] = useState([]);
    const scanShop = useScanner();
    const getScan = useLatestScan();
    const [lastScanInfo, setLastScanInfo] = useState("")
    const [scanButton, setScanButton] = useState(<Button disabled={true} />)


    // Scan State logic
    // TODO: This was moved here because 2 components required scan info. Can it be containerized?
    const load = () => {
        getActivePlan().then((data) => setActivePlan(data))
        getMessages().then((data) => setMessages(data))
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
        refreshScan({ status: "PENDING", timestamp: ts })
        scanShop()
            .then((new_scan_id) => getScan(new_scan_id))
            .then((new_scan) => refreshScan(new_scan))
    })

    // Generate upgrade copy
    const generateUpgradeCopy = (price, trial_end) => {
        const date = new Date(trial_end ?? null)
        const formatted_date = localizeDatestamp(date)
        const key = `HomePage.upgrade${price}`
        if (price) return t(key)
        else return t(key, { date: formatted_date })
    }



    const test = () => {
        // refreshScan({status: "ERROR", timestamp: "2023-07-07T23:19:12"})
        // refreshScan({status: "PENDING", timestamp: "2023-07-07T23:19:12"})
        // refreshScan({ status: "IN_PROGRESS", timestamp: "2023-07-07T23:19:12" })
        // refreshScan({status: "SUCCESS", timestamp: "2023-07-07T23:19:12"})
        // refreshScan({})
        // validateShop().then((data) => console.log(data))
        console.log(activePlan)
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
                {bp.xsOnly ? null :
                    <Layout.Section oneThird>
                        <WelcomeCard
                            padding={["0", xsPadding, "0", xsPadding]}
                            minHeight={commonMinHeight}
                            title={t("HomePage.embedTitle")}
                            content={t("HomePage.embedCopy")}
                            button={embed}
                        />
                    </Layout.Section>
                }
                <Layout.Section fullWidth>
                    <PaddedCell padding={["0", xsPadding, "5", xsPadding]}>

                        <AlphaCard>
                            <CardTitle linebreak title={t("Insights.donutChartTitle")} />
                            <Divider />
                            <br />
                            <HorizontalGrid columns={xsColumns}>
                                <MessageDonut current_usage={messages.length} message_limit={activePlan ? constants.price_to_messages[activePlan?.price] : false} />
                                <VerticalStack align="end">
                                    <Box paddingBlockEnd={"20"}>
                                        <List type="bullet">
                                            <List.Item>{lastScanInfo}</List.Item>
                                            {activePlan ? <List.Item>{`${t("HomePage.currentPlan")}: ${activePlan.name}`}</List.Item> : null}
                                            <List.Item>{t("HomePage.xMessagesRemaining", { x: activePlan ? constants.price_to_messages[activePlan?.price] - messages.length : "-" })}</List.Item>
                                            {activePlan ? <List.Item>{generateUpgradeCopy(activePlan.price, activePlan.trial_ends_on)}</List.Item> : null}
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
