import { Button, HorizontalStack, Spinner } from "@shopify/polaris"
import { useTranslation } from "react-i18next";
import { useNavigate } from "@shopify/app-bridge-react";
import { useState } from "react";
import { usePlanSetter } from "../../hooks";

export const PlanButton = ({ current, priceInfo, plan, name }) => {
    const { t } = useTranslation();
    const choosePlan = usePlanSetter();
    const navigate = useNavigate();
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);
    const normal = !(current || fetching || error)

    const handleChoice = () => {
        setFetching(true)
        choosePlan(plan, name).then((data) => {
            const url = data?.confirmation_page_url
            if (url) {
                navigate(url)
            } else {
                setError(true)
                setFetching(false)
                setTimeout(() => setError(false), 5000)
            }
        })
    }

    const button =
        <Button
            id="plan-button"
            disabled={current || fetching}
            primary={error || normal}
            onClick={() => handleChoice()}
        >
            <div style={{ minHeight: "1.5rem", display: "flex", alignItems: "center" }}>
                {
                    normal &&
                    t(`Plan.pricePer${priceInfo.duration}`, { x: priceInfo.price })
                }
                {
                    current &&
                    t("Plan.currentPlan")
                }
                {
                    fetching &&
                    <HorizontalStack gap="1" blockAlign="center">
                        <Spinner size="small" />
                        {t("Plan.redirecting")}
                    </HorizontalStack>
                }
                {
                    error && !fetching &&
                    t("Button.fetchError")
                }
            </div>
        </Button>

    return button
}