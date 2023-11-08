import { Page } from "@shopify/polaris";
import { PlanCarousel } from "../components";
import { useActivePlan } from "../hooks";
import { useEffect, useState } from "react";

export default function Plan() {
    // Active plan data
    const getActivePlan = useActivePlan();
    const [activePlan, setActivePlan] = useState({ name: "...." });
    useEffect(() => getActivePlan().then((data) => { setActivePlan(data) }), [])

    return (
        <Page narrowWidth>
            <PlanCarousel activePlan={activePlan} />
        </Page >
    )
}
