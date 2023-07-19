import { Button } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import cache from "../../cache";
import { StoreMinor } from '@shopify/polaris-icons';
import { useNavigate } from "@shopify/app-bridge-react";

export const EmbedButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleEmbed = () => navigate(cache.embed_url, {target: "new"})

    return (
        <Button
            primary
            icon={StoreMinor}
            onClick={() => handleEmbed()}>
            {t("Button.embed")}
        </Button>
    )
}