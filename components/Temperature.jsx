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
        { label: "Professional", value: "professional" },
        { label: "Friendly", value: "friendly" },
        { label: "Informal", value: "informal" },
        { label: "Engaging", value: "engaging" },
        { label: "Humorous", value: "humorous" },
        { label: "Empathetic", value: "empathetic" },
        { label: "Energetic", value: "energetic" },
        { label: "Laid-back", value: "laidback" },
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
