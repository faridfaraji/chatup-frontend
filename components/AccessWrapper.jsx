import { useEffect, useState } from "react";
import { useActivePlan } from "../hooks";
import { BillingButton } from "./buttons";
import { AlphaCard, Button, HorizontalGrid } from "@shopify/polaris";
import { LoremIpsum } from "./LoremIpsum";

export const AccessWrapper = ({ minimum, copy, fullpage, children }) => {
    const getPlan = useActivePlan();
    const [accessLevel, setAccessLevel] = useState(100);
    const loadAccess = () => getPlan().then((data) => {
        const intLevel = parseInt(data.name.slice(1,3))
        setAccessLevel(intLevel === 0 ? 3 : intLevel)
    })
    useEffect(() => loadAccess(), [])

    if (accessLevel >= minimum) {
        return children
    } else {
        // If the user doesn't have access, display the grayed-out blocker and the message.
        return (
            <div className={`${fullpage ? "" : "blocked-wrapper"}`}>
                <div className={`blocked-overlay ${fullpage ? "fullpage-overlay" : ""}`} />
                <div className={`blocked-message ${fullpage ? "fullpage-message" : ""}`}>
                    <AlphaCard bg="--p-color-bg-inverse-active">
                        <HorizontalGrid columns={{ xs: "1fr", md: (fullpage ? "2fr 1fr" : "5fr 2fr") }} gap="4" alignItems="center">
                            <LoremIpsum content={copy} />
                            <BillingButton />
                        </HorizontalGrid>
                    </AlphaCard>
                </div>
                <div className="blocked-child">{children}</div>
            </div>
        );
    }
};

