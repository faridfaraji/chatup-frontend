import { AlphaCard, Page, Layout, Text, HorizontalStack, Box, Button, Spinner, VerticalStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart, DonutChart, FunnelChart, LineChart } from "@shopify/polaris-viz";
import { CardTitle } from "../components";
import { useChatHistory } from "../hooks";
import { useEffect, useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import { formatChatDataForTS, formatChatDataForDonut } from "../utils/dataUtils";
import { zeroRange } from "../utils/dateUtils"


export default function Insights() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const { t } = useTranslation();
  const getChatHistory = useChatHistory();
  const [dates, setDates] = useState({});
  const [chats, setChats] = useState([]);
  const [chatsToday, setChatsToday] = useState([])
  const [tsData, setTSData] = useState([]);
  const [donutData, setDonutData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToday = () => {
    const sent = t("Insights.messagesSent") ?? "Messages sent"
    const remaining = t("Insights.messagesRemaining") ?? "Daily messages remaining"
    getChatHistory(today, tomorrow)
      .then((data) => setChatsToday(data))
      .then(() => formatChatDataForDonut(
        chatsToday,
        { since: today, until: tomorrow },
        { sent: sent, remaining: remaining },
        50
      ))
      .then((data) => setDonutData(data))
  }

  useEffect(() => getToday(), [])

  const updateChats = () => {
    const since = dates.since ?? today
    const until = dates.until ?? tomorrow
    const conversations = t("Insights.conversation") ?? "Conversations"
    const messages = t("Insights.messages") ?? "Messages"
    getChatHistory(since, until)
      .then((data) => setChats(data))
      .then(() => formatChatDataForTS(
        chats,
        { since: since, until: until },
        { conversations: conversations, messages: messages }))
      .then((data) => setTSData(data))
      .then(() => setLoading(false))
  }

  useEffect(() => {
    updateChats()
  }, [dates])

  const handleDateChange = (range) => {
    setLoading(true)
    const formattedDates = zeroRange(range)
    setDates(formattedDates)
  }

  const vizTheme = "Light"

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
              <VerticalStack inlineAlign="center">
                {loading ? <Spinner /> : <LineChart data={tsData} theme={vizTheme} />}
              </VerticalStack>
            </AlphaCard>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
          >
            <AlphaCard>
              <CardTitle title={t("Insights.donutChartTitle")}></CardTitle>
              <DonutChart data={donutData} theme={vizTheme} legendFullWidth legendPosition="right" />
            </AlphaCard>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
          >
            <AlphaCard>
              <CardTitle title={t("Insights.distributionChartTitle")} />
              <BarChart data={[]} theme={vizTheme} />
            </AlphaCard>
          </Box>
        </Layout.Section>
      </Layout>
    </Page>
  );
}



