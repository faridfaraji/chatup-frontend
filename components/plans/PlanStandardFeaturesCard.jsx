import { AlphaCard, VerticalStack } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import { PlanFeature } from "./PlanFeature";
import { CardTitle, PaddedCell } from "../misc";

export const PlanStandardFeaturesCard = () => {
    const { t } = useTranslation();

    return (
        <AlphaCard>
                <VerticalStack align="space-between">
                    <PaddedCell padding={["0", "5", "0", "5"]}>
                        <CardTitle title={t("Plan.standard")} linebreak />
                    </PaddedCell>
                    <VerticalStack gap="4">
                        <PlanFeature name={t("Plan.paid1")} />
                        <PlanFeature name={t("Plan.paid2")} />
                        <PlanFeature name={t("Plan.paid3")} />
                        <PlanFeature name={t("Plan.paid4")} />
                        <PlanFeature name={t("Plan.paid5")} />
                        <PlanFeature name={t("Plan.paid6")} />
                    </VerticalStack>
                </VerticalStack>
        </AlphaCard>
    )
}
