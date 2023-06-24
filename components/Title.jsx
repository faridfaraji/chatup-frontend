import { HorizontalStack, Layout, Text } from '@shopify/polaris';
import { SettingsPopover } from './SettingsPopover';
import { AnalyzeButton } from './AnalyzeButton';

export const Title = () => {
    return (
        <Layout>
            <Layout.Section oneThird>
                    <HorizontalStack align="start">
                        <Text fill variant="heading2xl" as="h3">
                            Chat Up
                        </Text>
                    </HorizontalStack>
            </Layout.Section>
            <Layout.Section>
                <HorizontalStack align="end" gap="1">
                    <SettingsPopover />
                    <AnalyzeButton />
                </HorizontalStack >
            </Layout.Section>
        </Layout >
    );
}
