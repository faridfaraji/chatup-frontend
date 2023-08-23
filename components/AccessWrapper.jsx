import { useEffect, useState } from "react";
import { useActivePlan } from "../hooks";
import { BillingButton } from "./buttons";
import { AlphaCard, Button, HorizontalGrid } from "@shopify/polaris";
import { LoremIpsum } from "./LoremIpsum";
import { useTranslation } from "react-i18next";
import { KeyMajor } from '@shopify/polaris-icons';
import { freeTrialActive } from "../utils";

export const AccessWrapper = ({ minimum, copyDomain, fullpage, children }) => {
    const { t } = useTranslation();
    const getPlan = useActivePlan();
    // Access levels are integer
    const [accessLevel, setAccessLevel] = useState(100);
    const [free, setFree] = useState(false)
    const loadAccess = () => getPlan().then((data) => {
        setFree(freeTrialActive(data))
        const intLevel = parseInt(data.name.slice(1, 3))
        setAccessLevel(intLevel)
    })
    useEffect(() => loadAccess(), [])

    const unlockButton =
        <Button primary icon={KeyMajor} onClick={() => setAccessLevel(100)}>
            {t(`${copyDomain}.freeTrialButton`)}
        </Button>


    return accessLevel >= minimum ? children :
        // If the user doesn't have access, display the grayed-out blocker and the message.
        // If free trial (accessLevel === 0) then display the unblock button
        <div className={`${fullpage ? "" : "blocked-wrapper"}`}>
            <div className={`blocked-overlay ${fullpage ? "fullpage-overlay" : ""}`} />
            <div className={`blocked-message ${fullpage ? "fullpage-message" : ""}`}>
                <AlphaCard bg="--p-color-bg-inverse-active">
                    <HorizontalGrid columns={{ xs: "1fr", md: (fullpage ? "2fr 1fr" : "5fr 2fr") }} gap="4" alignItems="center">
                        <LoremIpsum content={free ? t(`${copyDomain}.freeTrialCopy`) : t(`${copyDomain}.upgrade`)} />
                        {free ? unlockButton : <BillingButton />}
                    </HorizontalGrid>
                </AlphaCard>
            </div>
            <div className="blocked-child">{children}</div>
        </div>
};

