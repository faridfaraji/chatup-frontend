import { Button } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import cache from "../../cache";

export const EmbedButton = () => {
    const { t } = useTranslation();

    return (
        <Button
            primary
            url={cache.embed_url}>
            {t("Button.embed")}
        </Button>
    )
}