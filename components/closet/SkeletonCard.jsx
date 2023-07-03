import { AlphaCard } from "@shopify/polaris"
import { SkeletonSection } from "./SkeletonSection"

export const SkeletonCard = (props) => {
    return (
        <AlphaCard>
            <SkeletonSection size={props.size} lines={props.lines} />
        </AlphaCard>
    )
}