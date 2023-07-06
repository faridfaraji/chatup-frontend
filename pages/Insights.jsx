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

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const { t } = useTranslation();
  const getChatHistory = useChatHistory();
  const [dates, setDates] = useState({ since: oneWeekAgo, until: today });
  const [chats, setChats] = useState([]);
  const [tsData, setTSData] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateChats = (dates) => {
    getChatHistory(dates.since, dates.until)
      .then((response) => setChats(response))
  }

  useEffect(() => {
    updateChats(dates)
  }, [dates])

  useEffect(() => {
    setTSData(formatChatData(chats, dates))
    setLoading(false)
  }, [chats]);

  const handleDateChange = (pickerRange) => {
    setLoading(true)
    const date = new Date();
    const timezoneOffsetMinutes = date.getTimezoneOffset();

    // Convert the offset to a string representation
    const offsetString = formatOffset(timezoneOffsetMinutes);
    const startDateTime = new Date(`${pickerRange.since} 00:00:00${offsetString}`)
    // startDateTime.setHours(0, 0, 0, 0)
    const endDateTime = new Date(`${pickerRange.until} 00:00:00${offsetString}`)
    // endDateTime.setHours(0, 0, 0, 0)
    endDateTime.setDate(endDateTime.getDate() + 1)

    const newRange = { since: startDateTime, until: endDateTime }
    setDates(newRange)
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
