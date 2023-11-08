import { Modal, Text } from "@shopify/polaris"
import { useActivePlan, usePlanSetter } from "../../hooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@shopify/app-bridge-react";

export const FreeModal = () => {
    const { t } = useTranslation();
    const getActivePlan = useActivePlan();
    const choosePlan = usePlanSetter();
    const navigate = useNavigate();
    const [active, setActive] = useState(false);

    useEffect(() => {
        getActivePlan().then(data => {
            setActive(data.name === "[00]")
        })
    }, [])

    const handleChoice = () => {
        choosePlan("[20]", t("Plan.[2")).then((data) => {
            const url = data?.confirmation_page_url
            if (url) {
                navigate(url)
            } else {
                navigate("/Plan")
            }
        })
    }

    return (
        <Modal
            open={active}
            onClose={() => navigate("/Plan")}
            title={t("Misc.freeTitle")}
            primaryAction={{
                content: t("Button.upgrade"),
                onAction: handleChoice
            }}
            secondaryActions={[
                {
                    content: t("Button.plans"),
                    onAction: () => navigate("/Plan")
                }
            ]}
        >
            <Modal.Section>
                <Text as="p" fontWeight="medium">
                    {t("Misc.freeCall")}
                </Text >
            </Modal.Section>
        </Modal>
    )
}
