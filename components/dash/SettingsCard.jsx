import { useNavigate } from "@shopify/app-bridge-react"
import { AlphaCard, Badge, HorizontalStack, Link, Text, VerticalStack } from "@shopify/polaris"
import { Trans, useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import { useNegativeKeywordGetter, useShop } from "../../hooks";
import { tempString } from "../../utils";
import { CardTitle, PaddedCell } from "../misc";

export const SettingsCard = () => {
    const { t } = useTranslation();
    const settingsCall = <Trans i18nKey={"Dashboard.settingsCall"} />
    const navigate = useNavigate();
    const components = [<Link onClick={() => navigate("/Settings")} />]

    // Boundaries
    const boundaries = <Text variant="headingMd"><Trans i18nKey={"Boundaries.boundariesTitle"} /></Text>
    const boundariesCall = <Text as="p">
        <Trans i18nKey={"Boundaries.boundariesCall"} components={components} />
    </Text>

    const getKeys = useNegativeKeywordGetter();
    const [loadingKeys, setLoadingKeys] = useState(true);
    const [noKeys, setNoKeys] = useState(false);
    const [keys, setKeys] = useState([]);
    useEffect(() => {
        getKeys().then((data) => {
            setLoadingKeys(false)
            setNoKeys(!data.length)
            setKeys(data)
        })
    }, [])
    const boundaryMarkup = <HorizontalStack gap="1">
        {
            loadingKeys ? <Badge status="info">{t("Misc.loading")}</Badge> :
                noKeys ? <Badge status="attention">{t("Boundaries.noBoundaries")}</Badge> :
                    keys.map(key => <Badge>{key}</Badge>)
        }
    </HorizontalStack>

    // Personality
    const personality = <Text variant="headingMd"><Trans i18nKey={"Personality.personalityTitle"} /></Text>
    const personalityCall = <Text as="p">
        <Trans i18nKey={"Personality.personalityCall"} components={components} />
    </Text>

    const getShop = useShop();
    const [temp, setTemp] = useState("loading")

    const tempDict = {
        "0.00": "professional",
        "0.25": "friendly",
        "0.50": "informal",
        "0.75": "engaging",
        "1.00": "humorous",
    }

    useEffect(() => {
        getShop().then((data) => {
            setTemp(tempDict[data ? tempString(data.bot_temperature) : "0.00"])
        })
    }, [])

    const settingsCard = <AlphaCard>
        <CardTitle title={t("Dashboard.settingsTitle")} linebreak />
        <VerticalStack gap="4" >
            {settingsCall}
            {boundaries}
            <Trans i18nKey={"Boundaries.currentBoundaries"} />
            {boundaryMarkup}
            {boundariesCall}
            {personality}
            <Trans i18nKey={"Personality.currentPersonality"} />
            <Trans i18nKey={temp === "loading" ? `Misc.loading` : `Personality.${temp}`} />
            <PaddedCell padding={["0", "4", "0", "4"]}>
                <Text as="p">
                    <Trans i18nKey={`Personality.${temp}Desc`} />
                </Text>
            </PaddedCell>
            {personalityCall}
        </VerticalStack>
    </AlphaCard>

    return settingsCard
}
