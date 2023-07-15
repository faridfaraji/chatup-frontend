import { Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next"
import { useNavigate } from "@shopify/app-bridge-react";
import { SelectMinor } from '@shopify/polaris-icons';

export const BillingButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button
            primary
            icon={SelectMinor}
            onClick={() => { navigate("/Billing") }}>
            {t("Button.billing")}
        </Button>
    )
}