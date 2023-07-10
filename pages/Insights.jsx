import { AlphaCard, Page, Layout, Text, HorizontalStack, Box, Button, Spinner, VerticalStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart, DonutChart, FunnelChart, LineChart } from "@shopify/polaris-viz";
import { CardTitle } from "../components";
import { useChatHistory, useTimezone } from "../hooks";
import { useEffect, useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import { getRaw, formatChatDataForTS, formatChatDataForDonut, formatChatDataForBar } from "../utils/dataUtils";
import { zeroRange } from "../utils/dateUtils"
import { AutoRefresh, CenteredSpinner } from "../components/misc";
import { RefreshMinor } from '@shopify/polaris-icons';


export default function Insights() {
  const now = new Date()
  const twoFourAgo = new Date(now)
  twoFourAgo.setDate(now.getDate() - 1)

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const { t } = useTranslation();

  // fetch data from dbs
  const getChatHistory = useChatHistory();
  const [dates, setDates] = useState({});
  const getIana = useTimezone();
  const [iana, setIana] = useState("")

  useEffect(() => { getIana().then((response) => setIana(response)) }, [])

  // auto refresh
  const [checked, setChecked] = useState(false);
  const valid = dates?.since >= yesterday

  const autoRefreshFun = () => {
    if (checked && valid) {
      // refreshAllCharts()
      console.log("refreshing")
    }
    setTimeout(autoRefreshFun, 5 * 1000)
  }

  useEffect(() => setTimeout(() => autoRefreshFun(), 5 * 1000), [])


  // TODO get and set max daily messages for shop's subscription tier
  const maxDailyMessages = 200

  // the charts themselves
  const [ts, setTS] = useState(<CenteredSpinner />);
  const [donut, setDonut] = useState(<CenteredSpinner />);
  const [bar, setBar] = useState(<CenteredSpinner />);

  // Update ts and bar when dates change
  const handleDateChange = (range) => {
    const formattedDates = zeroRange(range, iana)
    setDates(formattedDates)
  }

  // Refresh the chart whenever the data changes
  const vizTheme = "Light"

  const refreshCharts = () => {
    setTS(<CenteredSpinner />)
    setBar(<CenteredSpinner />)
    const since = dates.since ?? yesterday
    const until = dates.until ?? tomorrow
    const tsRange = { since: since, until: until }
    const barRange = { since: today, until: tomorrow }
    const conversations = t("Insights.conversation") ?? "Conversations"
    const messages = t("Insights.messages") ?? "Messages"
    const names = { conversations: conversations, messages: messages }
    getChatHistory(since, until)
      .then((data) => getRaw(data))
      .then((data) => {
        return {
          ts: formatChatDataForTS(data, tsRange, names),
          bar: formatChatDataForBar(data, barRange, names)
        }
      })
      .then((data) => {
        setTS(<LineChart data={data.ts} theme={vizTheme} />)
        setBar(<BarChart data={data.bar} theme={vizTheme} />)
      })
  }

  const refreshDonut = () => {
    setDonut(<CenteredSpinner />)
    const drange = { since: twoFourAgo, until: now }
    const sent = t("Insights.messagesSent") ?? "Messages sent"
    const remaining = t("Insights.messagesRemaining") ?? "Daily messages remaining"
    const names = { sent: sent, remaining: remaining }
    getChatHistory(today, tomorrow)
      .then((data) => getRaw(data))
      .then((data) => formatChatDataForDonut(data, maxDailyMessages))
      .then((data) => setDonut(
        <DonutChart
          data={data}
          theme={vizTheme}
          showLegend={false}
          legendPosition="top"
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

  const refreshAllCharts = () => {
    refreshCharts()
    refreshDonut()
  }

  useEffect(() => refreshCharts(), [dates])
  useEffect(() => refreshDonut(), [])


  return (
    <Page>
      <TitleBar />
      <CardTitle title={t("NavigationMenu.insights")} linebreak />
      <Layout>
        <Layout.Section fullWidth>
          <HorizontalStack align="space-between" blockAlign="center">
            <DateRangePicker activatorSize="slim" onDateRangeChange={handleDateChange} />
            <AutoRefresh checked={checked} setChecked={setChecked} invalidText={t("Insights.invalidRefresh")} valid={valid} />
            {/* <Button primary size="slim" icon={RefreshMinor} onClick={() => refreshAllCharts()}></Button> */}
          </HorizontalStack>
        </Layout.Section>
        <Layout.Section fullWidth>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
          >
            <AlphaCard>
              <CardTitle title={t("Insights.timeSeriesChartTitle")} linebreak />
              {ts}
            </AlphaCard>
          </Box>
        </Layout.Section>
        <Layout.Section oneThird>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
          >
            <AlphaCard>
              <CardTitle linebreak title={t("Insights.donutChartTitle")}></CardTitle>
              {donut}
            </AlphaCard>
          </Box>
        </Layout.Section>
        <Layout.Section>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
          >
            <AlphaCard>
              <CardTitle linebreak title={t("Insights.distributionChartTitle")} />
              {bar}
            </AlphaCard>
          </Box>
        </Layout.Section>
      </Layout>
    </Page>
  );
}



