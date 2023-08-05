import { formatChatDataForBar } from "../../utils";
import { BarChart } from "@shopify/polaris-viz";

export const MessageDensity = ({ data }) => {
    return <BarChart
        data={formatChatDataForBar(data)}
        xAxisOptions={{ "hide": true }}
    />
}
