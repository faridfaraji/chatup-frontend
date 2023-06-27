import { Button, Modal, Text, VerticalStack } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { LoremIpsum } from './LoremIpsum';
import { scanShop } from '../utils/scanShop';
import cache from '../cache';
import { getShopInfo } from '../utils/shopInfo';
import { getScanInfo } from '../utils/scanInfo';

export const ScanButton = (props) => {
    const [active, setActive] = useState(false);
    const [scanDisabled, setScanDisabled] = useState(false);

    const modalMessage = <VerticalStack>
        <Text>{`Scan status: ${cache.latest_scan.status}`}</Text>
        <Text>{`Scan trigger: ${cache.latest_scan.trigger_type}`}</Text>
    </VerticalStack>


    // TODO:
    //  check shop info, 
    //  update modal content depending on scanned status incl. last date scanned and notify re changes
    const handleChange = useCallback(() => {
        getScanInfo()
        setActive(!active), [active]
    });

    const handleConfirm = useCallback(() => {
        // Uncomment this when we want to start scanning again
        scanShop()
        setActive(!active)
        // setScanDisabled(true)
        // handleScanStatus()
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
                {modalMessage}
                {/* <LoremIpsum padding="4" content={modalMessage}/> */}
            </Modal.Section>
        </Modal>
    );
}