import { Select } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useTemperature } from '../hooks/useTemperature';
import { useShop } from '../hooks';
import { tempString } from '../utils/dataUtils';


export const Temperature = (props) => {
    const [selected, setSelected] = useState("0.0");
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
        { label: "Professional", value: "0.00" },
        { label: "Friendly", value: "0.25" },
        { label: "Informal", value: "050" },
        { label: "Engaging", value: "0.75" },
        { label: "Humorous", value: "1.00" },
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
