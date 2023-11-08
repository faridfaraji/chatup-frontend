import { AlphaCard, Button, Divider, HorizontalGrid, HorizontalStack, Link, Text } from "@shopify/polaris"
import { PlanImage } from "../images"
import { PlanFeature } from "./PlanFeature"
import { PlanButton } from "./PlanButton"
import { Trans, useTranslation } from "react-i18next"
import constants from "../../constants"
import { CardTitle } from "../misc"
import {
    ChevronLeftMinor,
    ChevronRightMinor
} from '@shopify/polaris-icons';

const PlanContent = ({ planId, activePlan, left, right }) => {
    const { t } = useTranslation();

    const handleLeft = () => {
        document.getElementById(`plan-${left}`).scrollIntoView({ block: "center", inline: "center" })
    }

    const handleRight = () => {
        document.getElementById(`plan-${right}`).scrollIntoView({ block: "center", inline: "center" })
    }

    const enterpriseTab = planId === "[8"
    const planIdMonthly = `${planId}0]`
    const planIdYearly = `${planId}5]`

    return (
        <div style={{ width: "100%" }} id={`plan-${planId}`}>

            <PlanImage plan={planId} />
            <HorizontalStack align="space-between" blockAlign="center">
                <Button disabled={!left} icon={left ? ChevronLeftMinor : false} onClick={() => handleLeft()}></Button>
                <CardTitle title={t(`Plan.${planId}`)} />
                <Button disabled={!right} icon={right ? ChevronRightMinor : false} onClick={() => handleRight()}></Button>
            </HorizontalStack>
            <br />
            <Divider />
            <br />
            <HorizontalGrid columns="2" gap="4">
                <PlanFeature name={t(`Plan.${planId}Messages`)} />
                <PlanFeature name={t(`Plan.${planId}Customers`)} />
                <PlanFeature name={t(`Plan.${planId}Features`)} />
                <PlanFeature name={t(`Plan.${planId}Support`)} />
            </HorizontalGrid>
            <br />
            <br />
            <CardTitle title={t("Plan.standard")} alignment="center" size="Md" />
            <Divider />
            <br />
            <HorizontalGrid columns="2" gap="4">
                <PlanFeature name={t(`Plan.paid1`)} />
                <PlanFeature name={t(`Plan.paid2`)} />
                <PlanFeature name={t(`Plan.paid3`)} />
                <PlanFeature name={t(`Plan.paid4`)} />
                <PlanFeature name={t(`Plan.paid5`)} />
                <PlanFeature name={t(`Plan.paid6`)} />
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
                    <div style={{height: "1.5rem"}} />
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
    const planCard = (
        <AlphaCard>
            <div className="slider">
                <div id="plan-carousel" className="plans">
                    <PlanContent planId={'[2'} activePlan={activePlan} right={"[4"} />
                    <PlanContent planId={'[4'} activePlan={activePlan} left={"[2"} right={"[6"} />
                    <PlanContent planId={'[6'} activePlan={activePlan} left={"[4"} right={"[8"} />
                    <PlanContent planId={'[8'} activePlan={activePlan} left={"[6"} />
                </div>
            </div>
        </AlphaCard>
    )

    return planCard
}