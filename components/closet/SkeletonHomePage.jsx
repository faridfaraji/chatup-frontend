import { AlphaCard, HorizontalGrid, Layout, Page } from '@shopify/polaris';
import React from 'react';
import { SkeletonCard } from './SkeletonCard';
import { DonutChart } from '@shopify/polaris-viz';
import { SkeletonSection } from './SkeletonSection';
import { Robot } from '../images';

export function SkeletonHomePage() {
    const lines = 11
    return (
        <Page>
            <Layout>
                <Layout.Section oneThird><SkeletonCard size="small" lines={lines} /></Layout.Section>
                <Layout.Section oneThird><SkeletonCard size="small" lines={lines} /></Layout.Section>
                <Layout.Section oneThird><SkeletonCard size="small" lines={lines} /></Layout.Section>
                <Layout.Section fullWidth>
                    <AlphaCard>
                        <HorizontalGrid columns={2}>
                            <DonutChart data={[]} legendPosition='right' />
                            <SkeletonSection size="small" lines={lines} />
                        </HorizontalGrid>
                    </AlphaCard>
                </Layout.Section>
            </Layout >
        </Page>
    )
}
