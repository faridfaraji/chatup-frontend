import { HorizontalGrid, Box, VerticalStack, Text, AlphaCard } from "@shopify/polaris"

export const Setting = (props) => {
    const inputs = props.inputs.map((input) => {
        return (
            <VerticalStack gap="4">
                {input.component}
                <Text as="p" variant="bodyMd">
                    {input.copy}
                </Text>
            </VerticalStack>
        )
    })

    return (
        <HorizontalGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="4" alignItems="start">
            <Box
                as="section"
                paddingInlineStart={{ xs: 4, sm: 0 }}
                paddingInlineEnd={{ xs: 4, sm: 0 }}
            >
                <VerticalStack gap="4">
                    <Text as="h3" variant="headingMd">
                        {props.title}
                    </Text>
                    <Text as="p" variant="bodyMd">
                        {props.short}
                    </Text>
                </VerticalStack>
            </Box>
            <Box
                as="section"
                paddingInlineStart={{ xs: 4, sm: 0 }}
                paddingInlineEnd={{ xs: 4, sm: 0 }}
            >
                <AlphaCard roundedAbove="sm">
                    {inputs}
                </AlphaCard>
            </Box>
        </HorizontalGrid>
    )
}