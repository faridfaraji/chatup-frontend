import {
    Page,
    Layout,
    Text,
    AlphaCard,
    VerticalStack,
    Button
} from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";

import { useNavigate } from "@shopify/app-bridge-react";

import {
    NegativeKeywords,
    ScanCard,
    LoremIpsum,
    Temperature,
} from ".";
import Settings from "../pages/Settings";

export function LoadedHomePage() {
    const navigate = useNavigate();
    const settingsButton = () => {

    }
    const { t } = useTranslation();
    const cardTitle = "headingLg"
    const commonPadding = ["4", "0", "2", "0"]

    return (
        <Page narrowWidth>
            <Layout>
                <Layout.Section
                // oneThird
                >
                    <ScanCard />
                </Layout.Section>
                <Layout.Section
                // oneThird
                >
                    <AlphaCard>
                        <VerticalStack gap="4">

                            <Text variant={cardTitle}>
                                {t("HomePage.settingsTitle")}
                            </Text>
                            <LoremIpsum padding={commonPadding} content={t("HomePage.settingsCopy")} />
                            <Text>
                                <Button
                                    plain
                                    onClick={() => { navigate("/Settings") }}
                                >
                                    to settings
                                </Button>
                                <a href="/Settings"> other link</a>

                            </Text>
                        </VerticalStack>
                    </AlphaCard>
                </Layout.Section>
                <Layout.Section
                // oneThird
                >
                    <AlphaCard>
                        <Text variant={cardTitle}>
                            {t("HomePage.embedTitle")}
                        </Text>
                        <LoremIpsum padding={commonPadding} content={t("HomePage.embedCopy")} />
                    </AlphaCard>
                </Layout.Section>
            </Layout>
        </Page>

    )
}
//  <Layout.Section>
//                 <AlphaCard>
//                     <Text variant={cardTitle}>
//                         {t("HomePage.negKeysTitle")}
//                     </Text>
//                     <LoremIpsum padding={commonPadding} content={t("HomePage.negKeysCopy")} />
//                     <NegativeKeywords />
//                 </AlphaCard>
//             </Layout.Section>
//             <Layout.Section>
//                 <AlphaCard>
//                     <Text variant={cardTitle}>
//                         {t("HomePage.tempTitle")}
//                     </Text>
//                     <LoremIpsum padding={commonPadding} content={t("HomePage.tempCopy")} />
//                     <Temperature />
//                 </AlphaCard>
//             </Layout.Section>