import { AlphaCard, Page, Layout, Text, HorizontalStack, Box, Button } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart, DonutChart, FunnelChart, LineChart } from "@shopify/polaris-viz";
import { CardTitle } from "../components";
import { useChatHistory } from "../hooks";
import { useEffect, useState } from "react";

export default function Analytics() {
  const { t } = useTranslation();
  const getConvs = useChatHistory();
  const [convs, setConvs] = useState({})
  const [raw, setRaw] = useState([])
  const [tsData, setTSData] = useState([])

  useEffect(() => {
    getConvs()
      .then((resp) => setConvs(resp))
      .then(() => setRaw(convs.map((conv) => {
        return {
          timestamp: new Date(conv.timestamp),
          message_count: conv.messages.length
        }
      })))
      .then(() => {
        const d1 = new Date('July 1 2023')
        const d2 = new Date('July 7 2023')
        const timeStep = getTimeStep(d1, d2)
        const timeArray = getTimeArray(d1, d2, timeStep)
        const timeSeries = getTimeSeries(timeArray, raw)
        setTSData(timeSeries)
      })
  }, [])

  const getTimeStep = (start, end) => {
    const diffMillis = end - start
    const diffDays = Math.floor(diffMillis / (1000 * 60 * 60 * 24))
    const breaks = [
      { dur: 1, step: 3, },
      { dur: 3, step: 6, },
      { dur: 5, step: 12, },
    ]
    const step = breaks.find((bp) => diffDays <= bp.dur)
    return (step ? step.step : 24) * 60 * 60 * 1000
  }

  const getTimeArray = (start, end, step) => {
    const timeArray = []
    let currentTime = start

    while (currentTime <= end) {
      timeArray.push(currentTime)
      currentTime = new Date(currentTime.getTime() + step)
    }

    return timeArray
  }

  const getTimeSeries = (timeArray, raw) => {
    const timeSeries = [
      { name: "Conversations", data: timeArray.map((bucket) => {return {key: bucket, value: 0}}) },
      { name: "Messages", data: timeArray.map((bucket) => {return {key: bucket, value: 0}}) }
    ]
    raw.forEach((conv) => {
      const index = timeArray.findIndex((bucket) => conv.timestamp <= bucket)
      timeSeries[0].data[index].value++,
      timeSeries[1].data[index].value+=conv.message_count
    })
    return timeSeries
  }

  const data_timeSeries = [
    {
      "name": "Apr 1 – Apr 14, 2020",
      "data": [
        {
          "value": 333,
          "key": "2020-04-01T12:00:00"
        },
        {
          "value": 797,
          "key": "2020-04-02T12:00:00"
        },
        {
          "value": 234,
          "key": "2020-04-03T12:00:00"
        },
        {
          "value": 534,
          "key": "2020-04-04T12:00:00"
        },
        {
          "value": 132,
          "key": "2020-04-05T12:00:00"
        },
        {
          "value": 159,
          "key": "2020-04-06T12:00:00"
        },
        {
          "value": 239,
          "key": "2020-04-07T12:00:00"
        },
        {
          "value": 708,
          "key": "2020-04-08T12:00:00"
        },
        {
          "value": 234,
          "key": "2020-04-09T12:00:00"
        },
        {
          "value": 645,
          "key": "2020-04-10T12:00:00"
        },
        {
          "value": 543,
          "key": "2020-04-11T12:00:00"
        },
        {
          "value": 89,
          "key": "2020-04-12T12:00:00"
        },
        {
          "value": 849,
          "key": "2020-04-13T12:00:00"
        },
        {
          "value": 129,
          "key": "2020-04-14T12:00:00"
        }
      ]
    },
    {
      "name": "Previous month",
      "data": [
        {
          "value": 709,
          "key": "2020-03-02T12:00:00"
        },
        {
          "value": 238,
          "key": "2020-03-01T12:00:00"
        },
        {
          "value": 190,
          "key": "2020-03-03T12:00:00"
        },
        {
          "value": 90,
          "key": "2020-03-04T12:00:00"
        },
        {
          "value": 237,
          "key": "2020-03-05T12:00:00"
        },
        {
          "value": 580,
          "key": "2020-03-07T12:00:00"
        },
        {
          "value": 172,
          "key": "2020-03-06T12:00:00"
        },
        {
          "value": 12,
          "key": "2020-03-08T12:00:00"
        },
        {
          "value": 390,
          "key": "2020-03-09T12:00:00"
        },
        {
          "value": 43,
          "key": "2020-03-10T12:00:00"
        },
        {
          "value": 710,
          "key": "2020-03-11T12:00:00"
        },
        {
          "value": 791,
          "key": "2020-03-12T12:00:00"
        },
        {
          "value": 623,
          "key": "2020-03-13T12:00:00"
        },
        {
          "value": 21,
          "key": "2020-03-14T12:00:00"
        }
      ],
      "color": "red",
      "isComparison": true
    }
  ]

  const data_funnel = [
    {
      "data": [
        {
          "value": 126,
          "key": "Opens"
        },
        {
          "value": 48,
          "key": "Visitors"
        },
        {
          "value": 12,
          "key": "Added to carts"
        },
        {
          "value": 0,
          "key": "Orders"
        }
      ],
      "name": "Conversion"
    }
  ]

  const data_donut = [
    {
      "name": "Shopify Payments",
      "data": [
        {
          "key": "april - march",
          "value": 50000
        }
      ]
    },
    {
      "name": "Paypal",
      "data": [
        {
          "key": "april - march",
          "value": 25000
        }
      ]
    },
    {
      "name": "Other",
      "data": [
        {
          "key": "april - march",
          "value": 10000
        }
      ]
    },
    {
      "name": "Amazon Pay",
      "data": [
        {
          "key": "april - march",
          "value": 4000
        }
      ]
    }
  ]

  const data_sparkBar = [
    {
      "data": [
        {
          "key": 0,
          "value": 100
        },
        {
          "key": 1,
          "value": 200
        },
        {
          "key": 2,
          "value": 300
        },
        {
          "key": 3,
          "value": 400
        },
        {
          "key": 4,
          "value": 400
        },
        {
          "key": 5,
          "value": 100
        },
        {
          "key": 6,
          "value": 2000
        },
        {
          "key": 7,
          "value": 800
        },
        {
          "key": 8,
          "value": 900
        },
        {
          "key": 9,
          "value": 200
        },
        {
          "key": 10,
          "value": 400
        }
      ]
    }
  ]

  const data_bar = [
    {
      "name": "Breakfast",
      "data": [
        {
          "key": "Mon",
          "value": 3
        },
        {
          "key": "Tue",
          "value": -7
        },
        {
          "key": "Wed",
          "value": -7
        },
        {
          "key": "Thu",
          "value": -8
        },
        {
          "key": "Fri",
          "value": 20
        },
        {
          "key": "Sat",
          "value": 0
        },
        {
          "key": "Sun",
          "value": 0.1
        }
      ]
    },
    {
      "name": "Dinner",
      "data": [
        {
          "key": "Mon",
          "value": 7
        },
        {
          "key": "Tue",
          "value": 0
        },
        {
          "key": "Wed",
          "value": -15
        },
        {
          "key": "Thu",
          "value": -12
        },
        {
          "key": "Fri",
          "value": 20
        },
        {
          "key": "Sat",
          "value": 5
        },
        {
          "key": "Sun",
          "value": 0.1
        }
      ]
    }
  ]

  const vizTheme = "Light"

  return (
    <Page>
      <TitleBar />
      <Layout>
        <Layout.Section fullWidth>
          <AlphaCard>
            <HorizontalStack align="space-between" blockAlign="start">
              <CardTitle title={t("Analytics.timeSeriesChartTitle")} linebreak />
              <Button size="slim" onClick={() => console.log(tsData)}> TEST </Button>
            </HorizontalStack>
            <LineChart data={tsData} theme={vizTheme} />
          </AlphaCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <AlphaCard>
            <CardTitle title={t("Analytics.funnelChartTitle")} />
            <FunnelChart data={data_funnel} theme={vizTheme} />
          </AlphaCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <AlphaCard>
            <CardTitle title={t("Analytics.donutChartTitle")} />
            <DonutChart data={data_donut} theme={vizTheme} />
          </AlphaCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <AlphaCard>
            <CardTitle title={t("Analytics.barChartTitle")} />
            <BarChart data={data_bar} theme={vizTheme} />
          </AlphaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
