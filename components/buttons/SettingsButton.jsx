import { Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next"
import { useNavigate } from "@shopify/app-bridge-react";

export const SettingsButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => { navigate("/Configuration") }}>
            {t("Button.configuration")}
        </Button>
    )
}