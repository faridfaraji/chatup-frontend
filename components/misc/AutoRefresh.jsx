import { Box, Checkbox, HorizontalStack, Icon, Tooltip } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next"
import { QuestionMarkInverseMinor } from '@shopify/polaris-icons';

export const AutoRefresh = ({ checked, setChecked, invalidText, valid }) => {
    const { t } = useTranslation();

    const handleChange = useCallback(
        (newChecked) => setChecked(newChecked),
        [],
    );

    const tip =
        <Tooltip content={valid ? t("Button.validRefresh") : invalidText}>
            <Icon source={QuestionMarkInverseMinor} />
        </Tooltip>
    const check = <Checkbox
        disabled={!valid}
        label={t("Button.autoRefresh")}
        checked={checked && valid}
        onChange={handleChange}
    />

    return (
        <Box>
            <HorizontalStack gap="1">
                {check}
                {tip}
            </HorizontalStack>
        </Box>
    )

}