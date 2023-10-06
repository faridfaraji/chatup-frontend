import { Layout, Page } from "@shopify/polaris";
import { PlanCarousel, PlanFreeCard  } from "../components";
import { useActivePlan } from "../hooks";
import { useEffect, useState } from "react";

export default function Plan() {
    // Active plan data
    const getActivePlan = useActivePlan();
    const [activePlan, setActivePlan] = useState({ name: "...." });
    useEffect(() => getActivePlan().then((data) => { setActivePlan(data) }), [])

    const activeId = activePlan?.name?.slice(0, 4)
    const loading = activeId === "...."
    const onFree = activeId === "[00]"

    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <PlanCarousel activePlan={activePlan} />
                </Layout.Section>
                <Layout.Section oneThird>
                    <PlanFreeCard loading={loading} onFree={onFree} />
                </Layout.Section>
            </Layout >
        </Page >
    )
}
