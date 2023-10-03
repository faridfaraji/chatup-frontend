import { AlphaCard, Divider, Layout, Page } from "@shopify/polaris"
import { CardTitle } from "../components"
import { useTranslation } from "react-i18next"


export default function Dashboard() {
    const { t } = useTranslation();


    const scanCard = <AlphaCard>
        <CardTitle title={t("HomePage.scanTitle")} alignment="left" linebreak />
        <Divider/>
    </AlphaCard>

    const embedCard = <AlphaCard />

    const homePage = <Page narrowWidth>
        <Layout>
            <Layout.Section>
                {scanCard}
            </Layout.Section>
            <Layout.Section>
                {embedCard}
            </Layout.Section>
        </Layout>
    </Page>

    return (homePage)
}