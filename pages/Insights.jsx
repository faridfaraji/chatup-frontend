import { AlphaCard, Page, Layout, Text, HorizontalStack, Box, Button, Spinner, VerticalStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart, DonutChart, FunnelChart, LineChart } from "@shopify/polaris-viz";
import { CardTitle } from "../components";
import { useChatHistory } from "../hooks";
import { useEffect, useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import { getRaw, formatChatDataForTS, formatChatDataForDonut, formatChatDataForBar } from "../utils/dataUtils";
import { zeroRange } from "../utils/dateUtils"
import { CenteredSpinner } from "../components/misc";


export default function Insights() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const { t } = useTranslation();

  // Get and set raw dates and data
  const getChatHistory = useChatHistory();
  const [dates, setDates] = useState({});

  // the charts themselves
  const [ts, setTS] = useState(<CenteredSpinner />);
  const [donut, setDonut] = useState(<CenteredSpinner />);
  const [bar, setBar] = useState(<CenteredSpinner />);

  // Update ts and bar when dates change
  const handleDateChange = (range) => {
    const formattedDates = zeroRange(range)
    setDates(formattedDates)
  }

  // Refresh the chart whenever the data changes
  const vizTheme = "Light"

  const refreshCharts = () => {
    setTS(<CenteredSpinner />)
    setBar(<CenteredSpinner />)
    const since = dates.since ?? today
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
    const drange = { since: today, until: tomorrow }
    const sent = t("Insights.messagesSent") ?? "Messages sent"
    const remaining = t("Insights.messagesRemaining") ?? "Daily messages remaining"
    const names = { sent: sent, remaining: remaining }
    getChatHistory(today, tomorrow)
      .then((data) => getRaw(data))
      .then((data) => formatChatDataForDonut(data, drange, names, 50))
      .then((data) => setDonut(<DonutChart data={data} theme={vizTheme} legendFullWidth legendPosition="right" />))
  }

  useEffect(() => refreshCharts(), [dates])
  useEffect(() => refreshDonut(), [])

  return (
    <Page>
      <TitleBar />
      <Layout>
        <Layout.Section>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
          >
            <AlphaCard>
              <HorizontalStack align="space-between" blockAlign="start">
                <CardTitle title={t("Insights.timeSeriesChartTitle")} linebreak />
                <DateRangePicker onDateRangeChange={handleDateChange} />
              </HorizontalStack>
              {ts}
            </AlphaCard>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
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
        <Layout.Section oneHalf>
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



