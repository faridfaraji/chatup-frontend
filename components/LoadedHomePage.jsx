import { Page, Layout, Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@shopify/app-bridge-react";
import { WelcomeCard } from "./WelcomeCard";
import { useEffect, useState } from "react";
import { getScanInfo, getShopInfo } from "../utils/shopInfo";
import cache from "../cache";
import { useAuthenticatedFetch } from "../hooks";

export function LoadedHomePage(props) {
    const fetch = useAuthenticatedFetch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [timeScanned, setTimeScanned] = useState("")
    const [scanStatus, setScanStatus] = useState("")
    // const [scan, setScan] = useState(null)

    const getSetScan = () => {
        getShopInfo(null, fetch).then((resp) => {
            getScanInfo(resp, fetch).then((resp) => {
                setScanStatus(resp.status ? resp.status : "none")
                setTimeScanned(resp.timestamp ? resp.timestamp : "never")
            })
        })
    }

    useEffect(() => getSetScan(), [])


    const scan =
        <Button primary fullWidth onClick={() => { console.log("initiate scan")}}>
            {t("Button.scan")}
        </Button>

    const settings =
        <Button fullWidth onClick={() => { navigate("/Settings") }}>
            {t("Button.settings")}
        </Button>

    const embed =
        <Button fullWidth onClick={() => { console.log("embed link") }}>
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
