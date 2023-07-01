import {
    AlphaCard,
    Layout,
    SkeletonBodyText,
    SkeletonDisplayText,
} from '@shopify/polaris';
import React from 'react';

export function SkeletonHomePage() {

    return (
        <Layout>
            <Layout.Section>
                <AlphaCard>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines="3" />
                </AlphaCard>
            </Layout.Section>
            <Layout.Section>
                <AlphaCard>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines="3" />
                </AlphaCard>
            </Layout.Section>
            <Layout.Section>
                <AlphaCard>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines="3" />
                </AlphaCard>
            </Layout.Section>
            <Layout.Section>
                <AlphaCard>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines="3" />
                </AlphaCard>
            </Layout.Section>
        </Layout >
    )
}
