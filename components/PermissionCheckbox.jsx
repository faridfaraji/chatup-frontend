import { Checkbox, AlphaCard } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export const PermissionCheckbox = () => {
// todo: initial value is obtained from server GET
// todo: on check/uncheck, update server

    const [checked, setChecked] = useState(true);
    const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

    return (
        <AlphaCard>
            <Checkbox
                label="You may rescind permission."
                checked={checked}
                onChange={handleChange}
            />
        </AlphaCard>
    );
}