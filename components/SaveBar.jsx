import { Frame, ContextualSaveBar } from '@shopify/polaris';
import React from 'react';

export const SaveBar = () => {
    return (
        <div style={{ height: '75px' }}>
            <Frame
                logo={{
                    width: 51,
                    contextualSaveBarSource:
                        "https://awesoon.tech/wp-content/uploads/2023/04/cropped-awesoon-technologies-50.png",
                }}
            >
                <ContextualSaveBar
                    message="Unsaved changes"
                    saveAction={{
                        onAction: () => console.log('add form submit logic'),
                        // TODO: save action logic
                        loading: false,
                        disabled: false,
                    }}
                    discardAction={{
                        onAction: () => console.log('add clear form logic'),
                        // TODO discard action logic
                    }}
                />
            </Frame>
        </div>
    );
}