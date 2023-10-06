import { useEffect, useState } from "react"
import { MessageDonut } from "../charts";
import { Trans, useTranslation } from "react-i18next";
import { AlphaCard, Link, List, VerticalStack } from "@shopify/polaris";
import { useNavigate } from "@shopify/app-bridge-react";
import { useActivePlan, useShopValidator } from "../../hooks";
import { CardTitle } from "../misc";

export const DailyCard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const getActivePlan = useActivePlan();
    const validatePlan = useShopValidator()

    const [validation, setValidation] = useState({ current_usage: 0, message_limit: 0 });
    const usage = validation.current_usage
    const limit = validation.message_limit
    const remaining = limit - usage
    const xMessagesRemaining = limit === 0 ?
        t("Dashboard.loadingMessages") :
        remaining > 0 ?
            t("Dashboard.xMessagesRemaining", { x: remaining }) :
            t("Dashboard.outOfMessages")
    const messageDonut = <MessageDonut current_usage={usage} message_limit={limit} />

    const [plan, setPlan] = useState(false);
    const currentPlan = plan ?
        `${t("Dashboard.currentPlan", {
            x: plan.name === "[00]" ? t("Plan.[0") : plan?.name?.slice(5)
        })}` :
        t("Dashboard.loadingPlan")

    useEffect(() => getActivePlan().then(data => setPlan(data)), [])
    useEffect(() => validatePlan().then(data => setValidation(data)), [])

    const planCall = <Trans
        i18nKey={`Dashboard.planCall`}
        components={[<Link onClick={() => navigate("/Plan")} />]}
    />

    const dailyCard = <AlphaCard>
        <CardTitle title={t("Dashboard.dailyTitle")} linebreak />
        <VerticalStack gap="2">
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
