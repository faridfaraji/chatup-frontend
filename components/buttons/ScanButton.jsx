import { Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import cache from "../../cache";
import { useAuthenticatedFetch } from "../../hooks";
import { scanShop } from "../../utils/scanShop";

export const ScanButton = () => {
    fetch = useAuthenticatedFetch();
    const { t } = useTranslation();
    const timestamp = cache.latest_scan.timestamp;
    let copy = t("Button.scan")

    if (timestamp) {
        const scan_time = new Date(timestamp);
        const curr_time = new Date();
        const diffInMilliseconds = Math.abs(curr_time - scan_time);
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const duration = diffInHours >= 1 ?
            diffInHours + " hour" + (diffInHours !== 1 ? "s" : "") :
            diffInMinutes + " minute" + (diffInMinutes !== 1 ? "s" : "")

        copy = t("Button.scanned", { duration })
    }

    return (
        <Button
            primary={timestamp === undefined}
            disabled={timestamp !== undefined}
            onClick={() => scanShop(fetch)}
        >
            {copy}
        </Button>
    )
}