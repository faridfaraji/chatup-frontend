import { Select } from '@shopify/polaris';
import { useState, useCallback } from 'react';


export const Temperature = () => {
    const [selected, setSelected] = useState("professional");
    const handleSelectChange = useCallback(
        (value) => {
            // todo: send new temperature to database
            setSelected(value)
        },
        [],
    );

    const options = [
        { label: "Professional", value: "0.0" },
        { label: "Friendly", value: "0.5" },
        { label: "Informal", value: "1.0" },
        { label: "Engaging", value: "1.5" },
        { label: "Humorous", value: "2.0" },
    ]

    return (
        <Select
            label="Personality"
            options={options}
            onChange={handleSelectChange}
            value={selected}
        />
    );
}
