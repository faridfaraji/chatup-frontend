import { AlphaCard, Button, Divider, HorizontalGrid, HorizontalStack, Icon, Layout, VerticalStack } from "@shopify/polaris"
import { PaddedCell } from "./misc"
import { CircleTickMinor } from '@shopify/polaris-icons';
import { useTranslation } from "react-i18next";
import { CardTitle } from "./CardTitle";
import constants from "../constants";
import { usePlanSetter } from "../hooks";
import { useNavigate } from "@shopify/app-bridge-react";

const ChoosePlanButton = ({ current, price, enterprise, plan_name }) => {
    const { t } = useTranslation();
    const choosePlan = usePlanSetter();
    const navigate = useNavigate();
    const handleChoice = () => {choosePlan(plan_name).then((data) => navigate(data?.confirmation_page_url))}
    const buttonCopy = current ? t("Billing.currentPlan") : enterprise ? t("Billing.pricePerMessage", {price: price}) : t("Billing.pricePerMonth", {price: price})
    const button = <Button id="plan-button" onClick={() => handleChoice()} fullWidth primary>{buttonCopy}</Button>
    return button
}

const PlanFeature = (props) => {
    const { name, include } = props
    return <PaddedCell padding={["0", "5", "0", "5"]}>
        <HorizontalStack align="space-between">
            <HorizontalStack gap="1">
                <div className={`plan-feature ${include ? "" : "not-included"}`}>
                    {include ? <div id="checkmark" /> : <div id="xmark"/>}
                    <p>
                        {name}
                    </p>
                </div>
            </HorizontalStack>
            <div />
        </HorizontalStack>
    </PaddedCell>
}

export const TallBillingCard = (props) => {
    const { t } = useTranslation()
    const { src, name, msgs, negKeys, languages, personality, insights, history, current, price, enterprise, plan_name } = props.props
    const msgsName = msgs ? t("Billing.messages", { n: msgs }) : t("Billing.enterpriseMessages")

    return (
        <AlphaCard>
            <VerticalStack gap="4">
                <div className="tall-img-container">
                    <img src={src} className="plan-img tall-img" />
                </div>
                <div className="plan-name">
                    <p>
                        {name}
                    </p>
                </div>
                <Divider />
                <PlanFeature name={msgsName} include={true} />
                <PlanFeature name={t("Billing.negKeys")} include={negKeys} />
                <PlanFeature name={t("Billing.languages")} include={languages} />
                <PlanFeature name={t("Billing.personality")} include={personality} />
                <PlanFeature name={t("Billing.insights")} include={insights} />
                <PlanFeature name={t("Billing.history")} include={history} />
                <ChoosePlanButton current={current} price={price} enterprise={enterprise} plan_name={plan_name} />
            </VerticalStack>
        </AlphaCard>
    )
}

export const WideBillingCard = (props) => {
    const { t } = useTranslation();
    const { src, name, msgs, negKeys, languages, personality, insights, history, current, price, enterprise, plan_name } = props.props
    const msgsName = msgs ? t("Billing.messages", { n: msgs }) : t("Billing.enterpriseMessages")

    return (
        <AlphaCard>
            <Layout>
                <Layout.Section oneThird>
                    <div className="wide-img-container">
                        <img src={src} className="plan-img wide-img" />
                    </div>
                </Layout.Section>
                <Layout.Section>
                    <CardTitle linebreak title={name} />
                    <Divider />
                    <br />
                    <VerticalStack gap="5">
                        <HorizontalGrid columns={2}>
                            <VerticalStack gap="4">
                                <PlanFeature name={msgsName} include={true} />
                                <PlanFeature name={t("Billing.negKeys")} include={negKeys} />
                                <PlanFeature name={t("Billing.languages")} include={languages} />
                            </VerticalStack>
                            <VerticalStack gap="4">
                                <PlanFeature name={t("Billing.personality")} include={personality} />
                                <PlanFeature name={t("Billing.insights")} include={insights} />
                                <PlanFeature name={t("Billing.history")} include={history} />
                            </VerticalStack>
                        </HorizontalGrid>
                        <div style={{ width: "75%", alignSelf: "center" }}>
                            <ChoosePlanButton current={current} price={price} enterprise={enterprise} plan_name={plan_name}/>
                        </div>
                    </VerticalStack>
                </Layout.Section>
            </Layout>
        </AlphaCard>
    )
}
