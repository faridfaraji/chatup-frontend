import { HorizontalStack } from "@shopify/polaris"
import { PaddedCell } from "../misc"

export const PlanFeature = ({ name, include = true }) => {
    return <PaddedCell padding={["0", "5", "0", "5"]}>
        <HorizontalStack align="space-between">
            <HorizontalStack gap="1">
                <div className={`plan-feature${include ? "" : " not-included"}`}>
                    {!include ? <div id="xmark" /> : <div id="checkmark" />}
                    <p>
                        {name}
                    </p>
                </div>
            </HorizontalStack>
            <div />
        </HorizontalStack>
    </PaddedCell>
}