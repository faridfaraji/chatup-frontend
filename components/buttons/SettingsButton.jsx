import { Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next"
import { useNavigate } from "@shopify/app-bridge-react";
import cache from "../../cache";

export const SettingsButton = () => {
    const { t } = useTranslation();
    const timestamp = cache.latest_scan.timestamp
    const navigate = useNavigate();

    return (
        <Button
            primary={timestamp !== undefined} 
            onClick={() => { navigate("/Settings") }}>
            {t("Button.settings")}
        </Button>
    )
}