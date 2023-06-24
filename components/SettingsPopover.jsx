import { Popover, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { NegativeKeywords } from "./NegativeKeywords";

export const SettingsPopover = () => {
    const [popoverActive, setPopoverActive] = useState(false);
    const [tagValue, setTagValue] = useState('');

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const handleTagValueChange = useCallback(
        (value) => setTagValue(value),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            Settings
        </Button>
    );


    return (<Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        sectioned
        fluidContent={false}
    >
        {/* <FormLayout>  */}
        <NegativeKeywords />
        {/* <Select label="Show all customers where:" options={['Tagged with']} />
                    <TextField
                        label="Tags"
                        value={tagValue}
                        onChange={handleTagValueChange}
                        autoComplete="off"
                    />
                    <Button size="slim">Add filter</Button> */}

        {/* </FormLayout> */}
    </Popover>
    );
}