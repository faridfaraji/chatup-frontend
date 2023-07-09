import { Button } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import cache from "../../cache";
import { StoreMinor } from '@shopify/polaris-icons';

export const EmbedButton = () => {
    const { t } = useTranslation();

    return (
        <Button
            primary
            icon={StoreMinor}
            url={cache.embed_url}>
            {t("Button.embed")}
        </Button>
    )
}