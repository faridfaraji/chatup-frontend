import { Select } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useTemperature } from '../hooks/useTemperature';
import { useShop } from '../hooks';
import { tempString } from '../utils/dataUtils';


export const Temperature = (props) => {
    const [selected, setSelected] = useState(null);
    const sendTemperature = useTemperature();
    const getShop = useShop();

    const load = () => {
        getShop()
            .then((shop) => {
                const value = shop ? tempString(shop.bot_temperature) : "0.0"
                setSelected(value)
            })
    }

    useEffect(() => load(), [])

    const handleSelectChange = useCallback(
        (value) => {
            sendTemperature(value)
            setSelected(value)
        },
        [],
    );

    const options = [
        { label: "", value: null},
        { label: "Professional", value: "0.0" },
        { label: "Friendly", value: "0.5" },
        { label: "Informal", value: "1.0" },
        { label: "Engaging", value: "1.5" },
        { label: "Humorous", value: "1.9" },
    ]

    return (
        <Select
            label={props.label}
            options={options}
            onChange={handleSelectChange}
            value={selected}
        />
    );
}
