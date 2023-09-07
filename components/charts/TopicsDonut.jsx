import { useEffect, useState } from "react";
import { useChatsFetch } from "../../hooks"
import { getTopics, makeTopicDonutData } from "../../utils";
import { SkeletonDonut } from "../closet";
import { useTranslation } from "react-i18next";
import { DonutChart } from "@shopify/polaris-viz";

export const TopicsDonut = ({ since, until }) => {
    const getChats = useChatsFetch()
    const [donut, setDonut] = useState(<SkeletonDonut />)
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
            topicData[topic] = 0
        }

        for (const topic of topicList) {
            topicData[topic]++;
        }

        return topicData
    }

    const load = () => {
        getChats(since, until)
            .then((data) => getTopics(data))
            .then((data) => translateTopics(data))
            .then((data) => makeTopicDonutData(data))
            .then((data) => setDonut(<DonutChart data={data} legendPosition="right" legendFullWidth={true} />))
    }

    useEffect(() => load(), [since, until])

    return donut
}