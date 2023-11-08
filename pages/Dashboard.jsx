import { Layout, Page, VerticalStack, useBreakpoints } from "@shopify/polaris"
import { CustomizeCard, DailyCard, FreeModal, SettingsCard, TopicsCard } from "../components"

export default function Dashboard() {
    const bp = useBreakpoints();
    
    return (
        <Page>
            <Layout>
                <Layout.Section oneHalf>
                    <VerticalStack gap={{ xs: 2, sm: 4 }}>
                        {/* <DailyCard /> */}
                        {bp.mdUp ? <TopicsCard /> : <CustomizeCard />}
                    </VerticalStack>
                </Layout.Section>
                <Layout.Section oneHalf>
                    <VerticalStack gap={{ xs: 2, sm: 4 }}>
                        {bp.mdUp ? <CustomizeCard /> : <TopicsCard />}
                        <SettingsCard />
                    </VerticalStack>
                </Layout.Section>
            </Layout>
            <FreeModal />
        </Page>
    )
}