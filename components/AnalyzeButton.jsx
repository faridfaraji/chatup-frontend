import { Button, Modal, TextContainer } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export const AnalyzeButton = () => {
    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => setActive(!active), [active]);

    const activator = <Button primary onClick={handleChange}>Analyze Shop</Button>;

    return (
        // <div style={{height: '500px'}}>
        <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title="Analysis title"
            primaryAction={{
                content: 'Content 1',
                onAction: handleChange,
            }}
            secondaryActions={[
                {
                    content: 'Content 2',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section>
                <TextContainer>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                    </p>
                </TextContainer>
            </Modal.Section>
        </Modal>
        // </div>
    );
}