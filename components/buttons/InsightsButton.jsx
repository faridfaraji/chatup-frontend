import { Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next"
import { useNavigate } from "@shopify/app-bridge-react";
import { AnalyticsMinor } from '@shopify/polaris-icons';
export const InsightsButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button
            primary
            icon={AnalyticsMinor}
            onClick={() => { navigate("/Insights") }}>
            {t("Button.insights")}
        </Button>
    )
}