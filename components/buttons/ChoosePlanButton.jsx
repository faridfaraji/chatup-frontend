import { Button, HorizontalStack, Spinner } from "@shopify/polaris"
import { useTranslation } from "react-i18next";
import { useNavigate } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import { usePlanSetter } from "../../hooks";

export const ChoosePlanButton = ({ current, priceInfo, plan, name }) => {
    const { t } = useTranslation();
    const choosePlan = usePlanSetter();
    const navigate = useNavigate();
    const [button, setButton] = useState(<Button disabled={true} />);

    const buttonCopy = current ? t("Plan.currentPlan") : t(`Plan.pricePer${priceInfo.duration}`, { x: priceInfo.price })

    const activeButton =
        <Button id="plan-button" onClick={() => handleChoice()} fullWidth primary disabled={current}>
            {buttonCopy}
        </Button>

    const errorButton =
        <Button id="plan-button" onClick={() => handleChoice()} fullWidth primary>
            {t("Button.fetchError")}
        </Button>

    const fetchingButton =
        <Button id="plan-button" disabled fullWidth>
            <HorizontalStack gap="1" blockAlign="center">
                <Spinner size="small" />
                {t("Plan.redirecting")}
            </HorizontalStack>
        </Button>

    const handleChoice = () => {
        setButton(fetchingButton)
        choosePlan(plan, name).then((data) => {
            const url = data?.confirmation_page_url
            if (url) {
                navigate(url)
            } else {
                setButton(errorButton)
                setTimeout(() => setButton(activeButton), 5000)
            }

        })
    }
    const activateButton = () => { setButton(activeButton) }
    useEffect(() => activateButton(), [current])

    return button
}