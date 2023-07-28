import { AlphaCard, Page, Layout, Text, HorizontalStack, Box, Checkbox, Tooltip, Icon, Divider } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart, DonutChart, LineChart } from "@shopify/polaris-viz";
import { CardTitle, DateRangePicker, CenteredSpinner } from "../components";
import { useCallback, useEffect, useState } from "react";
import { getRaw, formatChatDataForTS, formatChatDataForBar, getTopics, makeTopicDonutData } from "../utils/dataUtils";
import { zeroRange, compRange, formatRange } from "../utils/dateUtils"
import { QuestionMarkInverseMinor } from '@shopify/polaris-icons';
import { useChatHistory, useMessageCounts } from "../hooks";


export default function Insights() {
  // en: today
  const kyou = new Date();
  kyou.setHours(0, 0, 0, 0);

  // en: yesterday
  const kinou = new Date(kyou)
  kinou.setDate(kyou.getDate() - 1)

  // en: the day before yesterday
  const ototoi = new Date(kyou)
  ototoi.setDate(kyou.getDate() - 2)

  // en: tomorrow
  const ashita = new Date(kyou);
  ashita.setDate(kyou.getDate() + 1);

  const { t, i18n } = useTranslation();

  const translateTopics = (topics) => {
    const fullTopicList = [
      t("Insights.Product Information"),
      t("Insights.Order Status and Tracking"),
      t("Insights.Technical Support"),
      t("Insights.Returns and Refunds"),
      t("Insights.Account Management"),
      t("Insights.Promotions and Discounts"),
      t("Insights.General Inquiries and Complaints"),
    ]

    const topicList = topics.map((topic) => i18n.exists(`Insights.${topic}`) ? t(`Insights.${topic}`) : t("Insights.General Inquiries and Complaints"))
    const topicData = {}

    for (const topic of fullTopicList) {
      console.log(topic)
      topicData[topic] = 0
    }

    for (const topic of topicList) {
      topicData[topic]++;
    }

    return topicData
  }

  // fetch data from dbs
  const getMessages = useMessageCounts();
  const getChats = useChatHistory();
  const [dates, setDates] = useState({});
  const [compDates, setCompDates] = useState({});

  // auto refresh
  const fresh = () => {
    resetCharts()
    refreshCharts()
  }

  const refreshable = !(dates?.since < kyou)
  const [checked, setChecked] = useState(false);
  const handleCheck = useCallback((newChecked) => setChecked(newChecked), [])

  const [refreshFlag, setRefreshFlag] = useState(false);
  useEffect(() => {
    setRefreshFlag(checked && refreshable)
  }, [checked, refreshable])

  const autoRefreshFun = () => {
    if (refreshFlag) { fresh() }
  };
  useEffect(() => {
    let refreshInterval;
    if (refreshFlag) {
      refreshInterval = setInterval(autoRefreshFun, 60000); // 60 seconds
    }

    return () => {
      clearInterval(refreshInterval);
    };
  }, [refreshFlag]);

  // the charts themselves
  const [ts, setTS] = useState(<CenteredSpinner />);
  const [donut, setDonut] = useState(<CenteredSpinner />);
  const [bar, setBar] = useState(<CenteredSpinner />);

  // Update ts and bar when dates change
  const handleDateChange = (range) => {
    const formattedDates = zeroRange(range)
    setDates(formattedDates)
    setCompDates(compRange(formattedDates))
  }

  // reset all charts to spinnnnnnn
  const resetCharts = () => {
    setTS(<CenteredSpinner />)
    setBar(<CenteredSpinner />)
    setDonut(<CenteredSpinner />)
  }
  // Refresh the chart whenever the data changes
  const refreshCharts = () => {
    const primeSince = dates.since ?? kyou
    const primeUntil = dates.until ?? ashita
    const compSince = compDates.since ?? kinou
    const compUntil = compDates.until ?? kyou
    const primeRange = { since: primeSince, until: primeUntil }
    const compRange = { since: compSince, until: compUntil }
    const barRange = { since: kyou, until: ashita }
    const primeRangeName = formatRange(primeRange)
    const compRangeName = formatRange(compRange)
    const names = { prime: primeRangeName, comp: compRangeName }
    // right now only supporting a single prime/comp range where prime.since = comp.until
    getMessages(compSince, primeUntil)
      .then((data) => getRaw(data))
      .then((data) => {
        return {
          ts: formatChatDataForTS(data, primeRange, compRange, names),
          bar: formatChatDataForBar(data, barRange, primeRange.since, names)
        }
      })
      .then((data) => {
        setTS(<LineChart data={data.ts} />)
        setBar(<BarChart data={data.bar} xAxisOptions={{ "hide": true }} />)
      })

    getChats(primeSince, primeUntil)
      .then((data) => getTopics(data))
      .then((data) => translateTopics(data))
      .then((data) => makeTopicDonutData(data))
      .then((data) => {
        setDonut(<DonutChart data={data} legendPosition="right" legendFullWidth={true} />)
      })
  }

  useEffect(() => fresh(), [dates])

  // Common chart box height
  const CommonMinHeight = "250px"

  return (
    <Page
      title={t("NavigationMenu.insights")}
      primaryAction={
        <DateRangePicker activatorSize="slim" onDateRangeChange={handleDateChange} />
      }
      // secondaryActions={[
      //   {

      //   }
      // ]}
      divider
    >
      <Layout>
        <Layout.Section fullWidth>

        </Layout.Section>
        <Layout.Section fullWidth>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
          >
            <AlphaCard>
              <HorizontalStack align="space-between" blockAlign="center">
                <CardTitle title={t("Insights.timeSeriesChartTitle")} />
                <HorizontalStack gap="1">
                  <Checkbox disabled={!refreshable} label={t("Button.autoRefresh")} checked={checked} onChange={handleCheck} />
                  <Tooltip content={refreshable ? t("Button.validRefresh") : t("Insights.invalidRefresh")}>
                    <Icon source={QuestionMarkInverseMinor} />
                  </Tooltip>
                </HorizontalStack>
              </HorizontalStack>
              <br />
              <Divider />
              <br />
              <Box minHeight={CommonMinHeight}>
                {ts}
              </Box>
            </AlphaCard>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
            paddingBlockEnd={{ sm: 0, md: 4 }}
          >
            <AlphaCard>
              <CardTitle title={t("Insights.donutTopicChartTitle")}></CardTitle>
              <br />
              <Divider />
              <br />
              <Box minHeight={CommonMinHeight}>
                {donut}
              </Box>
            </AlphaCard>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
            paddingBlockEnd="4"
          >
            <AlphaCard>
              <CardTitle title={t("Insights.distributionChartTitle")} />
              <br />
              <Divider />
              <br />
              <Box minHeight={CommonMinHeight}>
                {bar}
              </Box>
            </AlphaCard>
          </Box>
        </Layout.Section>
      </Layout>
    </Page>
  );
}



