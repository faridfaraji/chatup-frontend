import { AlphaCard, Page, Layout, HorizontalStack, Box, Checkbox, Tooltip, Icon, Divider } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { CardTitle, DateRangePicker, AccessWrapper, MessageTimeSeries, MessageDensity, CenteredSpinner } from "../components";
import { useCallback, useEffect, useState } from "react";
import { getRaw } from "../utils/dataUtils";
import { zeroRange, getCompDates, formatRange } from "../utils/dateUtils"
import { QuestionMarkInverseMinor } from '@shopify/polaris-icons';
import { useMessageCounts } from "../hooks";
import { TopicsDonut } from "../components/charts/TopicsDonut";


export default function Analytics() {
  const { t } = useTranslation();

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

  // init
  const initData = {
    messages: [],
    primeRange: formatRange({ since: kyou, until: ashita }),
    primeSince: kyou,
    primeUntil: ashita,
    compRange: formatRange({ since: kinou, until: kyou }),
    compSince: kinou,
    compUntil: kyou,
    barSince: kyou,
    barUntil: ashita
  }

  // fetch data from dbs
  const getMessages = useMessageCounts();
  const [dates, setDates] = useState({ since: kyou, until: ashita });

  // the charts themselves
  const [messageTimeSeries, setMessageTimeSeries] = useState(<CenteredSpinner />);
  const [messageDensity, setMessageDensity] = useState(<CenteredSpinner />);
  const [topicsDonut, setTopicsDonut] = useState(<CenteredSpinner />);

  // auto refresh
  const refreshable = !(dates?.since < kyou)
  const [checked, setChecked] = useState(false);
  const handleCheck = useCallback((newChecked) => setChecked(newChecked), [])

  const [refreshFlag, setRefreshFlag] = useState(false);
  useEffect(() => {
    setRefreshFlag(checked && refreshable)
  }, [checked, refreshable])

  const autoRefreshFun = () => {
    if (refreshFlag) { freshen() }
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

  const resetCharts = () => {
    setMessageTimeSeries(<CenteredSpinner />);
    setMessageDensity(<CenteredSpinner />);
    setTopicsDonut(<CenteredSpinner />);
  }

  const refreshCharts = () => {
    const newPrimeDates = { since: dates.since ?? kyou, until: dates.until ?? ashita }
    const newPrimeRange = formatRange(newPrimeDates)
    const newCompDates = getCompDates(newPrimeDates)
    const newCompRange = formatRange(newCompDates)
    const newData = {
      primeRange: newPrimeRange,
      compRange: newCompRange,
      primeSince: newPrimeDates.since,
      primeUntil: newPrimeDates.until,
      compSince: newCompDates.since,
      compUntil: newCompDates.until,
      barSince: kyou,
      barUntil: ashita
    }

    // right now only supporting a single prime/comp range where prime.since = comp.until
    getMessages(newData.compSince, newData.primeUntil).then((data) => getRaw(data)).then((data) => {
      newData["messages"] = data
      setMessageTimeSeries(<MessageTimeSeries data={newData} />)
      setMessageDensity(<MessageDensity data={newData} />)
      setTopicsDonut(<TopicsDonut since={dates.since ?? kyou} until={dates.until ?? ashita} />)
    })
  }

  const freshen = () => {
    resetCharts()
    refreshCharts()
  }

  useEffect(() => freshen(), [dates])
  const handleDateChange = (range) => setDates(zeroRange(range))

  // Common chart box height
  const CommonMinHeight = "250px"

  return (
    <Page
      title={t("NavigationMenu.insights")}
      primaryAction={
        <DateRangePicker activatorSize="slim" onDateRangeChange={handleDateChange} />
      }
      divider
    >
      <Layout>
        <Layout.Section fullWidth>
          <Box
            paddingInlineStart={{ xs: 4, sm: 0 }}
            paddingInlineEnd={{ xs: 4, sm: 0 }}
          >
            <AlphaCard>
              <HorizontalStack align="space-between" blockAlign="center">
                <CardTitle title={t("Insights.timeSeriesChartTitle")} />
                <HorizontalStack gap="1">
                  <Checkbox
                    disabled={!refreshable}
                    label={t("Button.autoRefresh")}
                    checked={checked}
                    onChange={handleCheck} />
                  <Tooltip content={
                    refreshable ?
                      t("Button.validRefresh") :
                      t("Insights.invalidRefresh")}>
                    <Icon source={QuestionMarkInverseMinor} />
                  </Tooltip>
                </HorizontalStack>
              </HorizontalStack>
              <br />
              <Divider />
              <br />
              <Box minHeight={CommonMinHeight}>
                {messageTimeSeries}
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
                {topicsDonut}
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
                {messageDensity}
              </Box>
            </AlphaCard>
          </Box>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
