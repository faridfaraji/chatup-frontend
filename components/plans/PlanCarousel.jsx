import { AlphaCard, Divider, HorizontalGrid, Link, Tabs, Text } from "@shopify/polaris"
import { PlanImage } from "../images"
import { PlanFeature } from "./PlanFeature"
import { PlanButton } from "./PlanButton"
import { Trans, useTranslation } from "react-i18next"
import { useState } from "react"
import constants from "../../constants"

const PlanContent = ({ planId, activePlan }) => {
    const { t } = useTranslation();

    const enterpriseTab = planId === "[8"
    const planIdMonthly = `${planId}0]`
    const planIdYearly = `${planId}5]`

    return (
        <div style={{ width: "100%" }}>
            <br />
            <PlanImage plan={planId} />
            <br />
            <Divider />
            <br />
            <HorizontalGrid columns="2" gap="4">
                <PlanFeature name={t(`Plan.${planId}Messages`)} />
                <PlanFeature name={t(`Plan.${planId}Customers`)} />
                <PlanFeature name={t("Plan.paid1")} />
                <PlanFeature name={t("Plan.paid2")} />
                <PlanFeature name={t("Plan.paid3")} />
                <PlanFeature name={t("Plan.paid4")} />
                <PlanFeature name={t("Plan.paid5")} />
                <PlanFeature name={t("Plan.paid6")} />
                {
                    !enterpriseTab &&
                    <>
                        <PlanButton
                            current={planIdMonthly === activePlan?.name?.slice(0, 4)}
                            priceInfo={constants.prices[planIdMonthly]}
                            plan={planIdMonthly}
                            name={t(`Plan.${planId}`)}
                        />
                        <PlanButton
                            current={planIdYearly === activePlan?.name?.slice(0, 4)}
                            priceInfo={constants.prices[planIdYearly]}
                            plan={planIdYearly}
                            name={t(`Plan.${planId}`)}
                        />
                    </>
                }
            </HorizontalGrid>
            {
                enterpriseTab &&
                <>
                    <br />
                    <Text as="p" color="subdued">
                        <Trans
                            i18nKey={"Plan.enterpriseContact"}
                            components={[<Link url={"mailto:care@awesoon.tech"} />]}
                        />
                    </Text>
                </>
            }
        </div>
    )
}

export const PlanCarousel = ({ activePlan }) => {
    const { t } = useTranslation();

    const [planTab, setPlanTab] = useState(0)
    const planTabs = [
        {
            id: 'emerging',
            content: t("Plan.[2"),
        },
        {
            id: 'expanding',
            content: t("Plan.[4"),
        },
        {
            id: 'established',
            content: t("Plan.[6"),
        },
        {
            id: 'enterprise',
            content: t("Plan.[8"),
        },
    ]

    const handleSelect = (index) => {
        setPlanTab(index)
        document.getElementById(`plan-${index}`).scrollIntoView()
    }

    const planCard = (
        <AlphaCard>
            <div className="slider">
                <Tabs fitted tabs={planTabs} selected={planTab} onSelect={index => handleSelect(index)} />
                <br />
                <div className="plans">
                    <div id="plan-0">
                        <PlanContent planId={'[2'} activePlan={activePlan} />
                    </div>
                    <div id="plan-1">
                        <PlanContent planId={'[4'} activePlan={activePlan} />
                    </div>
                    <div id="plan-2">
                        <PlanContent planId={'[6'} activePlan={activePlan} />
                    </div>
                    <div id="plan-3">
                        <PlanContent planId={'[8'} activePlan={activePlan} />
                    </div>
                </div>
            </div>
        </AlphaCard>
    )

    return planCard
}