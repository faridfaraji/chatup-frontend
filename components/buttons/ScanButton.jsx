import { Box, Button, HorizontalStack, SkeletonDisplayText, Spinner } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useLatestScan, useScanner } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
import { PlayMinor, RefreshMinor, CircleTickMinor, DiamondAlertMinor } from '@shopify/polaris-icons';
import { getTimeSince, withUTC } from "../../utils/dateUtils";

export const ScanButton = () => {
    const { t } = useTranslation();
    const scanShop = useScanner();
    const getScan = useLatestScan();
    const [button, setButton] = useState(<Button disabled={true} />)

    const load = () => {
        getScan().then((scan) => refreshButton(scan))
    }

    useEffect(() => load(), [])

    const refreshButton = (scan) => {
        let tempButton = button
        const primaryScan = <Button fullwidth primary icon={PlayMinor} onClick={() => scanCallback()}>{t("Button.scan")}</Button>
        const errorScan = <Button fullwidth primary icon={DiamondAlertMinor} onClick={() => scanCallback()}>{t("Button.scanError")}</Button>
        const pendingScan = <Button fullwidth disabled><HorizontalStack gap="1" blockAlign="center"><Spinner size="small" />{t("Button.scanPending")}</HorizontalStack></Button>
        const doneScanned = <Button fullwidth disabled icon={CircleTickMinor}>{t("Button.scanned")}</Button>
        if (!scan?.status) tempButton = primaryScan
        else if (["PENDING", "IN_PROGRESS"].includes(scan.status)) {
            tempButton = pendingScan
            setTimeout(refreshButton, 2000)
        } else {
            const timeSince = getTimeSince(withUTC(scan.timestamp))
            if (["ERROR"].includes(scan.status)) tempButton = errorScan
            else if (timeSince < 12) tempButton = doneScanned
            else tempButton = primaryScan
        }

        setButton(tempButton)
    }

    const scanCallback = useCallback(() => {
        scanShop()
            .then((new_scan_id) => getScan(new_scan_id))
            .then((new_scan) => refreshButton(new_scan))
    })

    return button
}