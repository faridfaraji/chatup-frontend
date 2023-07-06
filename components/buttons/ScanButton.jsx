import { Box, Button, SkeletonDisplayText } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import cache from "../../cache";
import { useLatestScan, useScanner, useShop } from "../../hooks";
import { useCallback, useEffect, useState } from "react";



export const ScanButton = () => {
    const { t } = useTranslation();
    const scanShop = useScanner();
    const getShop = useShop();
    const getScan = useLatestScan();
    const [button, setButton] = useState(<Button disabled={true} />)

    const load = () => {
        getShop()
            .then((shop) => getScan(shop.latest_scan_id))
            .then((scan) => refreshButton(scan))
    }

    useEffect(() => load(), [])

    const refreshButton = (scan) => {
        let tempButton = button
        console.log(scan)
        if (!scan) {
            tempButton = <Button primary onClick={() => scanCallback()}>{t("Button.scan")}</Button>
        } else if (["PENDING", "IN_PROGRESS"].includes(scan.status)) {
            tempButton = <Button disabled>{t("Button.scanPending")}</Button>
            setTimeout(() => load(), 1000);
        } else {
            const timeSince = getTimeSince(`${scan.timestamp}+00:00`)
            if (["ERROR"].includes(scan.status)) tempButton = <Button primary onClick={() => scanCallback()}>{t("Button.scanError")}</Button>
            else if (timeSince === 0) tempButton = <Button disabled>{t("Button.scannedZero")}</Button>
            else if (timeSince === 1) tempButton = <Button disabled>{t("Button.scannedOne")}</Button>
            else if (timeSince < 12) tempButton = <Button disabled>{t("Button.scanned", { timeSince: timeSince })}</Button>
            else tempButton = <Button onClick={() => scanCallback()}>{t("Button.scanned", { timeSince: timeSince })}</Button>
        }

        setButton(tempButton)
    }

    const scanCallback = useCallback(() => {
        scanShop()
            .then((new_scan_id) => getScan(new_scan_id))
            .then((new_scan) => refreshButton(new_scan))
    })

    const getTimeSince = (time) => {
        const since_time = new Date(time)
        const curr_time = new Date();
        const diffInMilliseconds = Math.abs(curr_time - since_time);
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60)

        return diffInHours
    }

    return button
}