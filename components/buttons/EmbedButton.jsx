import { Button } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import cache from "../../cache";

export const EmbedButton = () => {
    const { t } = useTranslation();
    const timestamp = cache.latest_scan.timestamp

    return (
        <Button
            primary={timestamp !== undefined}
            onClick={() => { console.log("embed button") }}>
            {t("Button.embed")}
        </Button>
    )
}