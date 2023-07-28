import { Layout, Page } from '@shopify/polaris';
import React from 'react';
import { Robot } from '../images';

export function SkeletonWelcome() {
    const lines = 11
    return (
        <Page title="Welcome to ChatUp" >
            <Layout>
                <Layout.Section fullWidth>
                    <Robot />
                </Layout.Section>
            </Layout >
        </Page>
    )
}
