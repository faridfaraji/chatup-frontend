import '@shopify/polaris-viz/build/esm/styles.css';
import { Spinner, Page, Layout, Button, AlphaCard, HorizontalGrid, Box, HorizontalStack, VerticalStack, Text, List, Divider, useBreakpoints } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { RecentSearchesMajor, CircleTickMinor, DiamondAlertMinor } from '@shopify/polaris-icons';
import { useActivePlan, useLatestScan, useScanner, useShopValidator } from "../hooks";
import { dateFromUTC, getTimeSince, localizeDatestamp, localizeTimestamp } from "../utils";
import { UpgradeButton, CardTitle, EmbedButton, MessageDonut, PaddedCell, Robot, SettingsButton, SkeletonHomePage, WelcomeCard, InsightsButton, TopicsDonut } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  const bp = useBreakpoints();
  const getActivePlan = useActivePlan();
  const [activePlan, setActivePlan] = useState(false);
  const validateShop = useShopValidator();
  const [validity, setValidity] = useState(false);
  const scanShop = useScanner();
  const getScan = useLatestScan();
  const [lastScanInfo, setLastScanInfo] = useState("")
  const [scanButton, setScanButton] = useState(<Button disabled={true} />)
  const [isMoon, setMoon] = useState(false)
  const [loading, setLoading] = useState(true)

  const load =
    () => getActivePlan().then((data) => {
      setActivePlan(data)
      setMoon(parseInt(data.name.slice(1, 3)) >= 80)
    })
      .then(() => validateShop()).then((data) => setValidity(data))
      .then(() => getScan()).then((data) => refreshScan(data))
      .then(() => setLoading(false))


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
  const generateUpgradeCopy = (plan_id, trial_end) => {
    const date = new Date(trial_end ?? null)
    const formatted_date = localizeDatestamp(date)
    const key = `HomePage.upgrade${plan_id}`
    if (plan_id) return t(key)
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
    console.log(validity)
    console.log(t("HomePage.scannedNever"))
    console.log(lastScanInfo)
    console.log(activePlan?.name.slice(1, 3))
    console.log(parseInt(activePlan?.name.slice(1, 3)))
    console.log(parseInt(activePlan?.name.slice(1, 3)) < 80)

    // console.log(nextScanInfo)
    setActivePlan({ name: "[00]" })
    setValidity({ message: "", trial_ends_at: new Date() })
  }
  const testButton = <Button onClick={() => test()}>TEST</Button>

  const settings = <SettingsButton />
  const embed = <EmbedButton />

  const commonMinHeight = "250px"
  const paddingBlockStart = "25"
  const xsPadding = { xs: "5", sm: "0", }
  const xsColumns = { xs: "1", sm: "2", }

  return (
    loading ?
      <SkeletonHomePage /> :
      <Page
        title="Welcome to ChatUp"
        // primaryAction={testButton}
      >
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
                <CardTitle linebreak title={isMoon ? t("Insights.donutTopicChartTitle") : t("Insights.donutChartTitle")} />
                <Divider />
                <br />
                <HorizontalGrid columns={xsColumns}>
                  {isMoon ?
                    <TopicsDonut /> :
                    <MessageDonut
                      current_usage={validity ? validity.current_usage : 0}
                      message_limit={validity ? validity.message_limit : false} />
                  }
                  <VerticalStack align="end">
                    <Box paddingBlockEnd={"20"}>
                      <List type="bullet">
                        <List.Item>{lastScanInfo}</List.Item>
                        {
                          activePlan ?
                            <List.Item>
                              {`${t("HomePage.currentPlan")}: ${t(`HomePage.${activePlan?.name.slice(0, 4)}`)}`}
                            </List.Item> :
                            null
                        }
                        {
                          activePlan && validity ?
                            activePlan.name.slice(0, 4) === "[00]" ?
                              <List.Item>
                                {
                                  validity.message === "Unscanned" ?
                                    `${t("HomePage.unscannedTrial")}` :
                                    `${t("HomePage.scannedTrial", { date: localizeTimestamp(new Date(validity.trial_ends_at)) })}`
                                }
                              </List.Item> : null : null
                        }
                        <List.Item>
                          {
                            isMoon ?
                              t("HomePage.xMessagesSent", { x: validity ? validity.current_usage : "0" }) :
                              t("HomePage.xMessagesRemaining", { x: validity ? validity.message_limit - validity.current_usage : "-" })
                          }
                        </List.Item>
                        {/* {activePlan & validity ? <List.Item>{generateUpgradeCopy(activePlan.name.slice(0, 4))}</List.Item> : null} */}
                      </List>
                    </Box>
                    {isMoon ? <InsightsButton /> : <UpgradeButton />}
                  </VerticalStack>
                </HorizontalGrid>
              </AlphaCard>
            </PaddedCell>
          </Layout.Section>
        </Layout>
      </Page >
  )
}
