import { Button } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import cache from "../../cache";

export const EmbedButton = () => {
    const { t } = useTranslation();
    const timestamp = cache.latest_scan.timestamp

    return (
        <Button
            primary={timestamp !== undefined}
            url={cache.embed_url}>
            {t("Button.embed")}
        </Button>
    )
}