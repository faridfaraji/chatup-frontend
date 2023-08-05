import { formatChatDataForTS } from "../../utils";
import { LineChart } from "@shopify/polaris-viz";

export const MessageTimeSeries = ({ data }) => {
    return <LineChart data={formatChatDataForTS(data)} />
}
