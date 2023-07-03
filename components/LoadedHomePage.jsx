import { Page, Layout, Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { WelcomeCard } from "./WelcomeCard";
import { useEffect, useState } from "react";
import { getScanInfo, getShopInfo } from "../utils/shopInfo";
import cache from "../cache";


export function LoadedHomePage() {
    // const afetch = useAuthenticatedFetch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [timeScanned, setTimeScanned] = useState("")
    const [scanStatus, setScanStatus] = useState("")
    // const [scan, setScan] = useState(null)

    const getSetScan = () => {
        getShopInfo(
            // fetch=afetch
            ).then((resp) => {
            getScanInfo(resp,
                //  afetch
                 ).then((resp) => {
                console.log(cache)
                console.log(resp)
                setScanStatus(resp.status ? resp.status : "none")
                setTimeScanned(resp.timestamp ? resp.timestamp : "never")
            })
        })
    }

    useEffect(() => getSetScan(), [])

    const scan =
        <Button primary fullWidth onClick={() => {
            console.log(timeScanned)
            console.log(scanStatus)
            getSetScan()
        }}>
            Tester
        </Button>

    // useEffect(() => {
    //     const enabled = timeScanned === "" || scanStatus === "ERROR"
    //     const copy = timeScanned === "" ?
    //         { t("Button.scan") } :

    //     || scanStatus === "ERROR" ?
    //         scanStatus === "COMPLETED" ?
    //         { t("Button.scanned", { timeScanned: timeScanned }) } :
    //         { t() } : b

    //     const button = timeScanned === "" ?
    //         <Button primary fullWidth onClick={() => { console.log("initiate scan") }}>
    //             {t("Button.scan")}
    //         </Button> :
    //         <Button disabled fullWidth>
    //             {t("Button.scanned", { timeScanned: timeScanned })}
    //         </Button>

    //     setScan(button)
    // }, [timeScanned])

    const settings =
        <Button fullWidth primary={timeScanned != ""} onClick={() => { navigate("/Settings") }}>
            {t("Button.settings")}
        </Button>

    const embed =
        <Button fullWidth primary={timeScanned != ""} onClick={() => { console.log("embed link") }}>
            {t("Button.embed")}
        </Button>

    const commonMinHeight = "200px"

    return (
        <Page>
            <Layout>
                <Layout.Section oneThird>
                    <WelcomeCard
                        minHeight={commonMinHeight}
                        title={t("HomePage.scanTitle")}
                        content={t("HomePage.scanCopy")}
                        button={scan}
                    />
                </Layout.Section>
                <Layout.Section oneThird>
                    <WelcomeCard
                        minHeight={commonMinHeight}
                        title={t("HomePage.settingsTitle")}
                        content={t("HomePage.settingsCopy")}
                        button={settings}
                    />
                </Layout.Section>
                <Layout.Section oneThird>
                    <WelcomeCard
                        minHeight={commonMinHeight}
                        title={t("HomePage.embedTitle")}
                        content={t("HomePage.embedCopy")}
                        button={embed}
                    />
                </Layout.Section>
            </Layout>
        </Page >
    )
}
