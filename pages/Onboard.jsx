import { AlphaCard, Button, HorizontalGrid, HorizontalStack, Link, Page, Text, VerticalStack } from "@shopify/polaris";
import { Trans, useTranslation } from "react-i18next"
import { PlanImage } from "../components/images/PlanImage";
import { ExternalMinor, AnalyticsDonutMinor } from '@shopify/polaris-icons';
import cache from "../cache";
import { useNavigate } from "@shopify/app-bridge-react";
import { useSearchParams } from "react-router-dom";

export default function Onboard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const step = searchParams.get("step")
    const count = searchParams.get("count")
    const minStep = 1
    const maxStep = 3

    //=========================================================================
    // Handlers
    //=========================================================================

    const handleAction = () => {
        if (step < maxStep) {
            const intCount = parseInt(count)
            const intStep = parseInt(step)
            navigate(cache.embed_url, { target: "new" })
            navigate(`/Onboard?step=${intStep}&count=${intCount < intStep ? intStep : intCount}`)
        } else {
            navigate(cache.https_shop_url, { target: "new" })
        }
    }

    const handleBack = () => {
        const intStep = parseInt(step)
        if(step > 1) navigate(`/Onboard?step=${intStep - 1}&count=${count}`)
        else navigate("/")
    }

    const handleNext = () => {
        const intStep = parseInt(step)
        navigate(`/Onboard?step=${intStep + 1}&count=${count}`)
    }

    const handleSkip = () => {
        if (step < maxStep) {
            handleNext()
        } else {
            navigate("/Dashboard")
        }
    }

    //=========================================================================
    // Buttons
    //=========================================================================

    const actionButton = <Button
        primary
        icon={ExternalMinor}
        onClick={() => handleAction()}>
        {t(`Onboard.step${step}action`)}
    </Button>

    const backButton = <Button onClick={() => handleBack()}>
        {t("Onboard.back")}
    </Button>

    const nextButton = <Button
        onClick={() => handleNext()}
        disabled={count < step}
        primary={count >= step}
    >
        {t("Onboard.next")}
    </Button>

    const skipLink = <Link removeUnderline onClick={() => handleSkip()}>
        {t("Onboard.skip")}
    </Link>

    const dashButton = <Button
        primary
        icon={AnalyticsDonutMinor}
        onClick={() => navigate("/Dashboard")} >
        {t("Onboard.dashboard")}
    </Button>

    //=========================================================================
    // Page
    //=========================================================================

    const onboardPage = <Page title={t("Onboard.title")}>
        <AlphaCard>
            <VerticalStack>
                <HorizontalGrid
                    columns={{ xs: 1, sm: ["oneThird", "twoThirds"] }}
                    gap={{ xs: 0, sm: 5 }}
                >
                    <PlanImage plan={`onboard-step${step}`} />
                    <VerticalStack gap="4" inlineAlign="start">
                        <Text as="p" color="subdued" fontWeight="medium">
                            {t(`Onboard.step${step}`)}
                        </Text >
                        <Text variant="headingLg" as="h5">
                            {t(`Onboard.step${step}action`)}
                        </Text>
                        <Text variant="bodyLg" as="p">
                            <Trans
                                i18nKey={`Onboard.step${step}copy`}
                                components={[<strong />]}
                            />
                        </Text>
                        {actionButton}
                    </VerticalStack>
                </HorizontalGrid>
                <br />
                <HorizontalStack align="space-between">
                    {
                        <HorizontalStack gap="5">
                            {backButton}
                            {minStep < step && step < maxStep && skipLink}
                        </HorizontalStack>
                    }
                    {step < maxStep && nextButton}
                    {step == maxStep && dashButton}
                </HorizontalStack>
            </VerticalStack>
        </AlphaCard>
    </Page>

    return onboardPage
}