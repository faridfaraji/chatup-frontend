import {
    Layout,
    SkeletonPage,
} from '@shopify/polaris';
import React from 'react';
import { SkeletonCard } from './SkeletonCard';

export function SkeletonHomePage() {

    return (
        <SkeletonPage narrowWidth>
            <Layout>
                <Layout.Section>
                    <SkeletonCard size="small" lines="6" />
                </Layout.Section>
                <Layout.Section>
                    <SkeletonCard size="small" lines="5" />
                </Layout.Section>
                <Layout.Section>
                    <SkeletonCard size="small" lines="6" />
                </Layout.Section>
            </Layout >
        </SkeletonPage>
    )
}
