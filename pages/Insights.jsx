import { AlphaCard, Page, Layout, Text, HorizontalStack, Box, Button, Spinner, VerticalStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart, DonutChart, FunnelChart, LineChart } from "@shopify/polaris-viz";
import { CardTitle } from "../components";
import { useChatHistory } from "../hooks";
import { useEffect, useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import { formatChatData, formatOffset } from "../utils/dataUtils";


export default function Insights() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const { t } = useTranslation();
  const getChatHistory = useChatHistory();
  const [dates, setDates] = useState({});
  const [chats, setChats] = useState([]);
  const [tsData, setTSData] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateChats = () => {
    const since = dates.since ?? today
    const until = dates.until ?? tomorrow
    getChatHistory(since, until)
      .then((response) => setChats(response))
      .then(() => formatChatData(chats, {since: since, until: until}))
      .then((formattedChats) => setTSData(formattedChats))
      .then(() => setLoading(false))
  }
  
  useEffect(() => {
    updateChats()
  }, [dates])

  const formatRange = (range) => {
    const date = new Date();
    const timezoneOffsetMinutes = date.getTimezoneOffset();

    // Convert the offset to a string representation
    const offsetString = formatOffset(timezoneOffsetMinutes);
    const sinceDateTime = new Date(`${range.since} 00:00:00${offsetString}`)
    const untilDateTime = new Date(`${range.until} 00:00:00${offsetString}`)
    untilDateTime.setDate(untilDateTime.getDate() + 1)
    return { since: sinceDateTime, until: untilDateTime }
  }

  const handleDateChange = (range) => {
    setLoading(true)
    const formattedDates = formatRange(range)
    setDates(formattedDates)
  }

  const vizTheme = "Light"

  return (
    <Page>
      <TitleBar />
      <Layout>
        <Layout.Section fullWidth>
          <AlphaCard>
            <HorizontalStack align="space-between" blockAlign="start">
              <CardTitle title={t("Insights.timeSeriesChartTitle")} linebreak />
              <DateRangePicker onDateRangeChange={handleDateChange} />
              {/* <Button size="slim" onClick={() => console.log(tsData)}> TEST </Button> */}
            </HorizontalStack>
            <VerticalStack inlineAlign="center">
              {loading ? <Spinner /> : <LineChart data={tsData} theme={vizTheme} />}
            </VerticalStack>
          </AlphaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
