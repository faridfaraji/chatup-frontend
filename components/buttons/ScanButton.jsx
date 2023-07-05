import { Button, Toast } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import cache from "../../cache";
import { useLatestScan, useScanner } from "../../hooks";
import { useCallback, useEffect, useState } from "react";

export const ScanButton = () => {
    const { t } = useTranslation();
    const scanner = useScanner();
    const getLatestScan = useLatestScan();
    const [latestScan, setLatestScan] = useState({})
    const [pending, setPending] = useState(false)
    const [copy, setCopy] = useState("")
    const [diff, setDiff] = useState(0)

    const primary = ["ERROR", undefined].includes(latestScan.status)
    const disabled = pending || diff < 12

    const refresh = () => {
        getLatestScan()
            .then(setLatestScan(cache.latest_scan))
            .then((scan) => {
                console.log(scan)
                if (["PENDING", "IN_PROGRESS"].includes(scan.status)) {
                    setPending(true)
                    setTimeout(refresh, 1000)
                } else if (["ERROR", "COMPLETED"].includes(scan.status)) {
                    setPending(false)
                }
            })
    }

    useEffect(() => {
        updateCopy()
    }, [pending, latestScan])

    useEffect(() => {
        refresh()
    }, [])

    const scanCallback = useCallback(() => {
        setPending(true)
        scanner().then(() => refresh())
    })


    const updateCopy = () => {
        let tempCopy = t("Button.scan")

        if (pending) {
            tempCopy = `${t("Button.scanPending")}`
        } else if (latestScan.timestamp && ["COMPLETED"].includes(latestScan.status)) {
            const scan_time = new Date(`${latestScan.timestamp}+00:00`);
            const curr_time = new Date();
            const diffInMilliseconds = Math.abs(curr_time - scan_time);
            const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
            setDiff(Math.floor(diffInMinutes / 60))
            const duration = diff >= 1 ?
                diff + " hour" + (diff !== 1 ? "s" : "") :
                diffInMinutes + " minute" + (diffInMinutes !== 1 ? "s" : "")

            tempCopy = t("Button.scanned", { duration })
        } else if (["ERROR"].includes(latestScan.status)) {
            tempCopy = t("Button.scanError")
        }

        setCopy(tempCopy)
    }


    return (
        <Button
            primary={primary}
            disabled={disabled}
            onClick={() => {
                scanCallback()
                console.log(latestScan)
            }}
        >
            {copy}
        </Button>
    )
}