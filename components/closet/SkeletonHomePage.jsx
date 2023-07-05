import { Layout, Page } from '@shopify/polaris';
import React from 'react';
import { SkeletonCard } from './SkeletonCard';

export function SkeletonHomePage() {
    const lines = 11
    return (
        <Page>
            <Layout>
                <Layout.Section oneThird><SkeletonCard size="small" lines={lines} /></Layout.Section>
                <Layout.Section oneThird><SkeletonCard size="small" lines={lines} /></Layout.Section>
                <Layout.Section oneThird><SkeletonCard size="small" lines={lines} /></Layout.Section>
            </Layout >
        </Page>
    )
}
