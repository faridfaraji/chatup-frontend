import { VerticalStack, SkeletonDisplayText, SkeletonBodyText } from "@shopify/polaris"

export const SkeletonSection = (props) => {
    return (
        <VerticalStack gap="4">
            <SkeletonDisplayText size={props.size} />
            <VerticalStack>
                <SkeletonBodyText lines={props.lines} />
            </VerticalStack>
        </VerticalStack>
    )
}
