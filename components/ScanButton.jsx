import { Button, Modal, TextContainer } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { LoremIpsum } from './LoremIpsum';
import { scanShop } from '../utils/scanShop';

export const ScanButton = (props) => {
    const [active, setActive] = useState(false);
    const [scanDisabled, setScanDisabled] = useState(false);

    // TODO:
    //  check shop info, 
    //  update modal content depending on scanned status incl. last date scanned and notify re changes
    const handleChange = useCallback(() => {
        setActive(!active), [active]
    });

    const handleConfirm = useCallback(() => {
        // Uncomment this when we want to start scanning again
        // scanShop()
        setActive(!active)
        setScanDisabled(true)
    }, [active])

    const activator = <Button primary fullWidth={props.fullWidth} onClick={handleChange}>Scan Shop</Button>;

    return (
        <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title="Scan title"
            primaryAction={{
                content: 'Confirm Scan',
                onAction: handleConfirm,
                disabled: scanDisabled
            }}
            secondaryActions={[
                {
                    content: 'Content 2',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section>
                <LoremIpsum />
            </Modal.Section>
        </Modal>
    );
}