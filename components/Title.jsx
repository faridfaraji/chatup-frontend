import { HorizontalStack, Layout, Text } from '@shopify/polaris';
import { SettingsPopover } from './SettingsPopover';
import { ScanButton } from './ScanButton';

export const Title = () => {
    return (
        <Layout>
            <Layout.Section oneThird>
                    <HorizontalStack align="start">
                        <Text variant="heading2xl" as="h3">
                            Chat Up
                        </Text>
                    </HorizontalStack>
            </Layout.Section>
            <Layout.Section>
                <HorizontalStack align="end" gap="1">
                    <SettingsPopover />
                    <ScanButton />
                </HorizontalStack >
            </Layout.Section>
        </Layout >
    );
}
