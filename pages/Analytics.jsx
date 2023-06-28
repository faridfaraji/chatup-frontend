import { AlphaCard, Page, Layout, Text, HorizontalStack, Box } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart, DonutChart, FunnelChart, LineChart, SparkBarChart } from "@shopify/polaris-viz";

export default function Analytics() {
  const { t } = useTranslation();

  const theme = "Light"

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
          "key": "Monday",
          "value": 3
        },
        {
          "key": "Tuesday",
          "value": -7
        },
        {
          "key": "Wednesday",
          "value": -7
        },
        {
          "key": "Thursday",
          "value": -8
        },
        {
          "key": "Friday",
          "value": 50
        },
        {
          "key": "Saturday",
          "value": 0
        },
        {
          "key": "Sunday",
          "value": 0.1
        }
      ]
    },
    {
      "name": "Lunch",
      "data": [
        {
          "key": "Monday",
          "value": 4
        },
        {
          "key": "Tuesday",
          "value": 0
        },
        {
          "key": "Wednesday",
          "value": -10
        },
        {
          "key": "Thursday",
          "value": 15
        },
        {
          "key": "Friday",
          "value": 8
        },
        {
          "key": "Saturday",
          "value": 50
        },
        {
          "key": "Sunday",
          "value": 0.1
        }
      ]
    },
    {
      "name": "Dinner",
      "data": [
        {
          "key": "Monday",
          "value": 7
        },
        {
          "key": "Tuesday",
          "value": 0
        },
        {
          "key": "Wednesday",
          "value": -15
        },
        {
          "key": "Thursday",
          "value": -12
        },
        {
          "key": "Friday",
          "value": 50
        },
        {
          "key": "Saturday",
          "value": 5
        },
        {
          "key": "Sunday",
          "value": 0.1
        }
      ]
    }
  ]

  return (
    <Page>
      <TitleBar />
      {/* <TitleBar
        title={t("Analytics.title")}
        primaryAction={{
          content: t("Analytics.primaryAction"),
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: t("Analytics.secondaryAction"),
            onAction: () => console.log("Secondary action"),
          },
        ]}
      /> */}
      <Layout>
        <Layout.Section>
          <AlphaCard>
            <LineChart data={data_timeSeries} theme={theme} />
          </AlphaCard>
        </Layout.Section>
        <Layout.Section>
          <HorizontalStack align="space-between">
            <Box width="32%">
              <AlphaCard>
                <FunnelChart data={data_funnel} theme={theme} />
              </AlphaCard>
            </Box>
            <Box width="32%">
              <AlphaCard>
                <DonutChart data={data_donut} theme={theme} />
              </AlphaCard>
            </Box>
            <Box width="32%">
              <AlphaCard>
                <BarChart data={data_bar} theme={theme} />
              </AlphaCard>
            </Box>
          </HorizontalStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
