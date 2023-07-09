import { Select } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useTemperature } from '../hooks/useTemperature';
import { useShop } from '../hooks';
import { tempString } from '../utils/dataUtils';
import { useTranslation } from 'react-i18next';


export const Temperature = (props) => {
    const {t} = useTranslation();
    const [selected, setSelected] = useState("");
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
        { label: t("Configuration.professional"), value: "0.00" },
        { label: t("Configuration.friendly"), value: "0.25" },
        { label: t("Configuration.informal"), value: "050" },
        { label: t("Configuration.engaging"), value: "0.75" },
        { label: t("Configuration.humorous"), value: "1.00" },
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
