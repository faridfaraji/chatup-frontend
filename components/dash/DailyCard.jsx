import { useState } from "react"
import { MessageDonut } from "../charts";
import { Trans, useTranslation } from "react-i18next";
import { AlphaCard, Link, List, VerticalStack } from "@shopify/polaris";
import { useNavigate } from "@shopify/app-bridge-react";
import { CardTitle } from "../CardTitle";

export const DailyCard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [usage, setUsage] = useState(6);
    const [limit, setLimit] = useState(9);
    const remaining = limit - usage
    const xMessagesRemaining = remaining > 0 ?
        t("Dashboard.xMessagesRemaining", { x: remaining }) :
        t("Dashboard.outOfMessages")
    const messageDonut = <MessageDonut current_usage={usage} message_limit={limit} />


    const [plan, setPlan] = useState("Free");
    const currentPlan = `${t("Dashboard.currentPlan", { x: plan })}`

    const planCall = <Trans
        i18nKey={`Dashboard.planCall`}
        components={[<Link onClick={() => navigate("/Plan")} />]}
    />

    const dailyCard = <AlphaCard>
        <CardTitle title={t("Dashboard.dailyTitle")} linebreak />
        <VerticalStack>
            {xMessagesRemaining}
            {messageDonut}
            <List type="bullet">
                <List.Item>
                    {currentPlan}
                </List.Item>
                <List.Item>
                    {planCall}
                </List.Item>
            </List>
        </VerticalStack>
    </AlphaCard>

    return dailyCard
}
