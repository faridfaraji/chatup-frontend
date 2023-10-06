import { TopicsDonut } from "../charts";
import { Trans, useTranslation } from "react-i18next";
import { AlphaCard, Link, List, VerticalStack } from "@shopify/polaris";
import { useNavigate } from "@shopify/app-bridge-react";
import { localizeDatestamp } from "../../utils";
import { CardTitle } from "../misc";

export const TopicsCard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const topicsDonut = <TopicsDonut since={oneWeekAgo} until={today} />

    const localToday = localizeDatestamp(today)
    const localOneWeekAgo = localizeDatestamp(oneWeekAgo)
    const dataFrom = `${t("Dashboard.dataFrom", { x: localOneWeekAgo, y: localToday, })}`

    const messagesCall = <Trans
        i18nKey={`Dashboard.messagesCall`}
        components={[<Link onClick={() => navigate("/Messages")} />]}
    />
    const analyticsCall = <Trans
        i18nKey={`Dashboard.analyticsCall`}
        components={[<Link onClick={() => navigate("/Analytics")} />]}
    />

    const topicsCard = <AlphaCard>
        <CardTitle title={t("Dashboard.topicsTitle")} linebreak />
        <VerticalStack>
            {dataFrom}
            {topicsDonut}
            <List type="bullet">
                <List.Item>
                    {messagesCall}
                </List.Item>
                <List.Item>
                    {analyticsCall}
                </List.Item>
            </List>
        </VerticalStack>
    </AlphaCard>

    return topicsCard
}
