import { AlphaCard, Page, Layout, Text, HorizontalStack, Box, Checkbox, Tooltip, Icon } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart, DonutChart, LineChart } from "@shopify/polaris-viz";
import { CardTitle } from "../components";
import { useCallback, useEffect, useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import { getRaw, formatChatDataForTS, formatChatDataForDonut, formatChatDataForBar } from "../utils/dataUtils";
import { zeroRange, compRange, formatRange } from "../utils/dateUtils"
import { CenteredSpinner } from "../components/misc";
import { QuestionMarkInverseMinor } from '@shopify/polaris-icons';
import { useMessageCounts } from "../hooks";


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

  const { t } = useTranslation();

  // fetch data from dbs
  const getMessages = useMessageCounts();
  const [dates, setDates] = useState({});
  const [compDates, setCompDates] = useState({});

  // auto refresh
  const refreshAllCharts = () => {
    refreshCharts()
    refreshDonut()
  }

  const refreshable = !(dates?.since < kyou)
  const [checked, setChecked] = useState(false);
  const handleCheck = useCallback((newChecked) => setChecked(newChecked), [])

  const [refreshFlag, setRefreshFlag] = useState(false);
  useEffect(() => {
    setRefreshFlag(checked && refreshable)
  }, [checked, refreshable])

  const autoRefreshFun = () => {
    if (refreshFlag) { refreshAllCharts() }
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

  // TODO get and set max daily messages for shop's subscription tier
  const maxDailyMessages = 200

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

  // Refresh the chart whenever the data changes
  const vizTheme = "Light"

  const refreshCharts = () => {
    setTS(<CenteredSpinner />)
    setBar(<CenteredSpinner />)
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
      .then((data) => (getRaw(data)))
      .then((data) => {
        return {
          ts: formatChatDataForTS(data, primeRange, compRange, names),
          bar: formatChatDataForBar(data, barRange, primeRange.since, names)
        }
      })
      .then((data) => {
        setTS(<LineChart data={data.ts} theme={vizTheme} />)
        setBar(<BarChart data={data.bar} theme={vizTheme} xAxisOptions={{ "hide": true }} />)
      })
  }

  const refreshDonut = () => {
    setDonut(<CenteredSpinner />)
    const until = new Date()
    const since = new Date(until)
    since.setDate(until.getDate() - 1)
    const used = t("Insights.used") ?? "Used"
    const remaining = t("Insights.remaining") ?? "Remaining"
    const key = t("Dates.today") ?? "Today"
    const names = { sent: used, remaining: remaining, key: key }
    getMessages(since, until)
      .then((data) => getRaw(data))
      .then((data) => formatChatDataForDonut(data, names, maxDailyMessages))
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

  useEffect(() => refreshCharts(), [dates])
  useEffect(() => refreshDonut(), [])


  return (
    <Page
      title={t("NavigationMenu.insights")}
      divider
    >
      <Layout>
        <Layout.Section fullWidth>
          <HorizontalStack align="space-between" blockAlign="center">
            <DateRangePicker activatorSize="slim" onDateRangeChange={handleDateChange} />
            <HorizontalStack gap="1">
              <Checkbox disabled={!refreshable} label={t("Button.autoRefresh")} checked={checked} onChange={handleCheck} />
              <Tooltip content={refreshable ? t("Button.validRefresh") : t("Insights.invalidRefresh")}>
                <Icon source={QuestionMarkInverseMinor} />
              </Tooltip>
            </HorizontalStack>
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



