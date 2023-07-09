import { Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next"
import { useNavigate } from "@shopify/app-bridge-react";
import { SettingsMinor } from '@shopify/polaris-icons';

export const SettingsButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button
            icon={SettingsMinor}
            onClick={() => { navigate("/Configuration") }}>
            {t("Button.configuration")}
        </Button>
    )
}