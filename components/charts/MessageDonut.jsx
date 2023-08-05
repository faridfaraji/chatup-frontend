import { Text } from "@shopify/polaris";
import { DonutChart } from "@shopify/polaris-viz";
import { useTranslation } from "react-i18next";
import { SkeletonDonut } from "../closet";


export const MessageDonut = ({ current_usage, message_limit }) => {
    const { t } = useTranslation();
    const donut = message_limit ?
        <DonutChart
            data={
                [
                    {
                        name: t("Insights.used"),
                        data: [{
                            key: t("Dates.today"),
                            value: current_usage
                        }],
                        color: "#d45ebd"
                    },
                    {
                        name: t("Insights.remaining"),
                        data: [{
                            key: t("Dates.today"),
                            value: message_limit > current_usage ? message_limit - current_usage : 0
                        }],
                        color: "#039fdb"
                    },
                ]
            }
            legendPosition="right"
            renderInnerValueContent={() => {
                return <div>
                    <Text variant="bodyLg" fontWeight="bold">
                        {`${current_usage}`}
                    </Text>
                    <Text variant="bodySm">
                        {`/ ${message_limit}`}
                    </Text>
                </div>
            }}
        />
        : <SkeletonDonut />

    return donut
}