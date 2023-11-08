import { AlphaCard, HorizontalGrid, Link, Spinner, Text, VerticalStack } from "@shopify/polaris"
import { useTranslation } from "react-i18next"
import { useNavigate } from "@shopify/app-bridge-react";
import { useState } from "react";
import { PlanFeature } from "./PlanFeature";
import { usePlanCanceller } from "../../hooks";
import { CardTitle, PaddedCell } from "../misc";

export const PlanFreeCard = ({ loading = true, onFree }) => {
    const { t } = useTranslation();
    const cancelPlan = usePlanCanceller();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    // Returning to Free Plan:
    const handleFreeWill = () => {
        setLoader(true)
        cancelPlan().then(() => navigate("/Dashboard"))
    }

    return (
        <AlphaCard>
            <div className="subdued">
                <VerticalStack align="space-between">
                    <PaddedCell padding={["0", "5", "0", "5"]}>
                        <div style={{ height: "1.3rem" }}>
                            {
                                !loading && onFree &&
                                <Text as="p">
                                    {t("Plan.currentPlan")}
                                </Text>
                            }
                        </div>
                        <CardTitle title={t("Plan.free")} linebreak />
                    </PaddedCell>
                    <HorizontalGrid columns="2" gap="4">
                        <PlanFeature name={t("Plan.freeCustomers")} />
                        <PlanFeature name={t("Plan.freeMessages")} />
                        <PlanFeature name={t("Plan.freeFeatures")} />
                        <PlanFeature name={t("Plan.freeSupport")} />
                    </HorizontalGrid>
                    {/* <div style={{ height: "3rem" }} /> */}
                    <div style={{ height: "1.5rem" }}>
                        {
                            !loading && !onFree &&
                            <PaddedCell padding={["0", "5", "0", "5"]}>
                                <div style={{ display: "flex", alignItems: "start" }}>
                                    <div style={{ flex: 1 }}>
                                        <Text as="p" truncate>
                                            <Link monochrome removeUnderline onClick={() => handleFreeWill()} >
                                                {t("Plan.freeWill")}
                                            </Link>
                                        </Text>
                                    </div>
                                    {loader && <Spinner size="small" />}
                                </div>
                            </PaddedCell>
                        }
                    </div>
                </VerticalStack>
            </div>
        </AlphaCard>
    )
}