import {
    Layout,
    Text,
    AlphaCard,
    VerticalStack
} from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";

import {
    NegativeKeywords,
    ScanButton,
    LoremIpsum,
} from ".";

export function LoadedHomePage() {
    const { t } = useTranslation();
    const cardTitle = "headingLg"
    const commonPadding = "4"

    return (
        <Layout>
            <Layout.Section>
                <div id="scan" />
                <AlphaCard >
                    <Text variant={cardTitle}>
                        {t("HomePage.scanTitle")}
                    </Text>
                    <VerticalStack>
                        <LoremIpsum padding={commonPadding} content={t("HomePage.scanCopy")} />
                        <ScanButton fullWidth={true} />
                    </VerticalStack>
                </AlphaCard>
            </Layout.Section>
            <Layout.Section>
                <AlphaCard>
                    <Text variant={cardTitle}>
                        {t("HomePage.negKeysTitle")}
                    </Text>
                    <NegativeKeywords padding={commonPadding} content={t("HomePage.negKeysCopy")} />
                </AlphaCard>
            </Layout.Section>
            <Layout.Section>
                <AlphaCard>
                    <Text variant={cardTitle}>
                        {t("HomePage.tempTitle")}
                    </Text>
                    <LoremIpsum padding={commonPadding} content={t("HomePage.tempCopy")} />
                </AlphaCard>
            </Layout.Section>
            <Layout.Section>
                <AlphaCard>
                    <Text variant={cardTitle}>
                        {t("HomePage.embedTitle")}
                    </Text>
                    <LoremIpsum padding={commonPadding} content={t("HomePage.embedCopy")} />
                </AlphaCard>
            </Layout.Section>
        </Layout>
    )
}
